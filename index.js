const express = require("express");
const mongoose = require("mongoose");
const { polling } = require("./helper");
const cors = require("cors");
const app = express();

// Setting CORS options
const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

app.use(cors(corsOptions));

// Setting port and database URL
const PORT = process.env.PORT || 8080;
const MONGO_DB_URL =
  process.env.MONGO_DB_URL ||
  "mongodb://admin:admin@10.128.0.207:27017/projectDB";

mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("mongodb connection failed", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

polling();

app.use("/api/server", require("./routes/api/server"));
app.listen(PORT, () => console.log(`Main Server running on port ${PORT}`));
