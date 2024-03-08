const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "none",
  },
  gender: {
    type: String,
    default: "not specified",
  },
  phone: {
    type: Number,
    length: 10,
  },
  dob: {
    type: Date,
  },
  profileImgUrl: {
    type: String,
    default: "/images/defaultProfilePhoto.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  socialMediaLinks: {
    facebook: {
      type: String,
      default: "https://www.facebook.com/",
    },
    twitter: { type: String, default: "https://www.twitter.com/" },
    instagram: {
      type: String,
      default: "https://www.instagram.com/",
    },
  },
});
userSchema.virtual("fullName").get(() => `${this.firstName} ${this.lastName}`);

const User = mongoose.model("User", userSchema);
module.exports = User;
