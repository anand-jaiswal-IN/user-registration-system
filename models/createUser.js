const mongoose = require("mongoose");
const User = require("./User");
const uri = process.env.DB_URI;

async function createUser(userObj) {
  await mongoose.connect(uri);

  const newUser = new User(userObj);
  const user = await newUser.save();

  mongoose.disconnect();

  return user;
}

module.exports = createUser;
