const bcrypt = require("bcrypt");

const getHashedPassword = async pass => {
  const salt = await bcrypt.genSalt(5);
  let hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

getHashedPassword("12345678").then(res => console.log(res));
