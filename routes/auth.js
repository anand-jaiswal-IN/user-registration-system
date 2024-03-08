const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uploadProfileImage = require("../utils/cloudinary");
const fs = require("fs");

router.use((req, res, next) => {
  if (req.session && req.session.user) next();
  else res.redirect("/users/login");
});

router.get("/logout", function (req, res, next) {
  req.session.destroy((err) => {
    res.redirect(`/?message=Logged Out successfully`);
    if (err)
      res
        .status(500)
        .redirect(`/?message=Internal Server error, does not logged out`);
  });
});

router.get("/profile", function (req, res, next) {
  res.render("auth/profile", { title: "Your Profile", user: req.session.user });
});

router.get("/editProfile", function (req, res, next) {
  res.render("auth/editProfile", {
    title: "Edit Your Profile",
    user: req.session.user,
    message: req.query.message,
  });
});

router.post("/updateProfilePhoto", (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect("/auth/editProfile?message=File%20not%20found");
  }
  let profilePhoto = req.files.profilePhoto;

  profilePhoto.name =
    Date.now() +
    req.session.user.username +
    profilePhoto.name.slice(profilePhoto.name.indexOf("."));
  let uploadPath = path.join(
    path.dirname(__dirname),
    "/uploads/profilePhotos",
    profilePhoto.name
  );

  profilePhoto.mv(uploadPath, async (err) => {
    if (err) {
      console.log(err);
      res.redirect("/auth/editProfile?message=File%20not%20uploaded");
    } else {
      try {
        const urlFromCloudinary = await uploadProfileImage(uploadPath); // upload file to cloud
        fs.unlinkSync(uploadPath); // delete file from uploads
        await mongoose.connect(process.env.DB_URI);
        let user = await User.findOneAndUpdate(
          { username: req.session.user.username },
          { $set: { profileImgUrl: urlFromCloudinary } },
          { new: true }
        );
        await user.save();
        mongoose.disconnect();
        req.session.user = user;
        res.redirect(
          "/auth/editProfile?message=profile%20photo%20update%20done"
        );
      } catch (err) {
        console.log(err);
        res.redirect("/auth/editProfile?message=something%20went%20wrong");
      }
    }
  });
});

router.post("/editProfile", async (req, res, next) => {
  let [
    firstName,
    lastName,
    bio,
    gender,
    dob,
    facebookLink,
    twitterLink,
    instagramLink,
    password,
  ] = [
    req.body.firstName,
    req.body.lastName,
    req.body.bio,
    req.body.gender,
    req.body.dob,
    req.body.facebookLink,
    req.body.twitterLink,
    req.body.instagramLink,
    req.body.password,
  ];
  try {
    await mongoose.connect(process.env.DB_URI);
    let user = await User.findOne({ username: req.session.user.username });

    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      user = await User.findOneAndUpdate(
        { username: req.session.user.username },
        {
          $set: {
            firstName,
            lastName,
            bio,
            gender,
            dob: Date(dob),
            "socialMediaLinks.facebook": facebookLink,
            "socialMediaLinks.twitter": twitterLink,
            "socialMediaLinks.instagram": instagramLink,
          },
        },
        { new: true }
      );
      await user.save();
      mongoose.disconnect();
      req.session.user = user;
      res.redirect("/auth/editProfile?message=Yeah! Update done.");
    } else {
      res.redirect("/auth/editProfile?message=Password%20is%20incorrect");
    }
  } catch (err) {
    res.redirect("/auth/editProfile?message=Something%20went%20wrong");
  }
});
module.exports = router;
