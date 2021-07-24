const axios = require("axios");
const Instance = require("./models/instances");
const Server = require("./models/servers");

const POLLING_DURATION = 15000;

let serversInfo = [];

// Function to update process instance info, if it exists, else creates a new instance
const processExists = async process => {
  const instance = await Instance.exists({
    osId: process.pid,
    serverId: process.serverId,
  });
  if (instance) {
    let currStatus = process.status;
    if (currStatus !== "In Progress") {
      let endTime = process.endTime;
      let startTime = instance.startTime;
      let updatedInstance = await Instance.updateOne(
        {
          status: "In Progress",
          serverId: process.serverId,
          osId: process.pid,
        },
        {
          status: currStatus,
          endTime: endTime,
        }
      );
    }
    return;
  }
  if (process.pid === null) return;
  let p = {
    osId: process.pid,
    processName: process.processName,
    serverId: process.serverId,
    status: "In Progress",
    startTime: process.startTime,
    endTime: process.endTime,
  };
  await Instance.create(p);
};

const getServerInfo = () => {
  // fetch server names from database
  Server.find({}, (err, data) => {
    // update the serversInfo
    serversInfo = data;
  });
};

const getStatus = async () => {
  // read servers list
  serversInfo.forEach(server => {
    let ip = server.ipAddress;
    let port = server.port;
    axios
      .get(`http://${ip}/api/internal/processes/status`)
      .then(response => {
        if (response.data !== "undefined") {
          let processList = response.data;
          processList.forEach(process => {
            process["serverId"] = server._id;
            processExists(process);
          });
          console.log(processList);
        }
      })
      .catch(error => {
        console.log(`${port} is down`);
      });
  });
};

// Function to verify the authentication token sent
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

// Function to poll processes from the process servers
const polling = () => {
  getServerInfo();
  setInterval(getStatus, POLLING_DURATION);
};

module.exports = { polling, verifyToken };
