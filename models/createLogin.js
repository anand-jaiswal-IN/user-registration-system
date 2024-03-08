const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Login = require("./Login");
const User = require("./User");
const uri = process.env.DB_URI;

async function createLogin(userObj) {
  await mongoose.connect(uri);
  try {
    const user = await User.findOne({
      $or: [{ username: userObj.username }, { email: userObj.email }],
    });
    if (user == null) throw Error("username or email is incorrect");
    let isCorrectPassword = await bcrypt.compare(
      userObj.password,
      user.password
    );

    if (isCorrectPassword) {
      // check if someone's login or not

      const logins = await Login.find({
        $and: [{ loginBy: user }, { loggedOut: false }],
      });

      if (logins.length > 0) {
        await Login.updateMany(
          { $and: [{ loginBy: user }, { loggedOut: false }] },
          { $set: { loggedOut: true } }
        );
      }

      const login = new Login({
        loginBy: user,
        loginUsername: user.username,
      });
      await login.save();
      return user;
    } else throw Error("Password is wrong, Try again");
  } catch (error) {
    mongoose.disconnect();
    throw error;
  }
}

module.exports = createLogin;
