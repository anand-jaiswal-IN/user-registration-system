const updateProfileImageDiv = document.getElementById("updateProfileImage");

const updateProfileImageBtn = document.getElementById("updateProfileImageBtn");
updateProfileImageBtn.addEventListener("click", (e) => {
  e.preventDefault();

  updateProfileImageDiv.style.display = "block";
});

const closeUpdateProfileImage = document.getElementById(
  "closeUpdateProfileImage"
);
closeUpdateProfileImage.addEventListener("click", (e) => {
  e.preventDefault();
  updateProfileImageDiv.style.display = "none";
});

function checkName(name) {
  name = name.trim();
  if (name.length > 0) return true;
  else return false;
}
function checkAdultness(dob) {
  // dob = yyyy-mm-dd
  let todayDate = Date.now();
  [year, month, day] = dob.split("-");
  let dateOfBirth = new Date(year, month, day);
  let difference = todayDate - dateOfBirth;
  let yearsDifference = difference / (1000 * 3600 * 24 * 30 * 12);
  if (yearsDifference >= 18) return true;
  else return false;
}
function checkUrl(url) {
  let urlLinkRegex =
    /^((https?):\/\/)?([a-z0-9-]+\.)+[a-z]{2,63}(\.[a-z]{2,63})?(:[0-9]{1,5})?(\/\S*)?/;
  return urlLinkRegex.test(url);
}
const userProfileUpdateForm = document.forms["userProfileUpdateForm"];
const userProfilePhotoUpdateForm = document.forms["userProfilePhotoUpdateForm"];

// userProfileUpdateForm.dob.value = "2023-09-09";

//handling submission of userProfileUpdateForm
userProfileUpdateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [
    firstName,
    lastName,
    dob,
    facebookLink,
    twitterLink,
    instagramLink,
    password,
  ] = [
    userProfileUpdateForm.firstName,
    userProfileUpdateForm.lastName,
    userProfileUpdateForm.dob,
    userProfileUpdateForm.facebookLink,
    userProfileUpdateForm.twitterLink,
    userProfileUpdateForm.instagramLink,
    userProfileUpdateForm.password,
  ];
  const [
    errorFirstName,
    errorLastName,
    errorDob,
    errorFacebookLink,
    errorTwitterLink,
    errorInstagramLink,
    errorPassword,
  ] = [
    document.querySelector(".errorFirstName"),
    document.querySelector(".errorLastName"),
    document.querySelector(".errorDob"),
    document.querySelector(".errorFacebookLink"),
    document.querySelector(".errorTwitterLink"),
    document.querySelector(".errorInstagramLink"),
    document.querySelector(".errorPassword"),
  ];
  let proceedSubmit = false;

  if (!checkName(firstName.value)) {
    errorFirstName.innerHTML = "Invalid first name";
    proceedSubmit = false;
  } else {
    errorFirstName.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkName(lastName.value)) {
    errorLastName.innerHTML = "Invalid last name";
    proceedSubmit = false;
  } else {
    errorLastName.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkAdultness(dob.value)) {
    errorDob.innerHTML = "Oops, You are under 18. Be Adult!";
    proceedSubmit = false;
  } else {
    errorDob.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkUrl(facebookLink.value)) {
    errorFacebookLink.innerHTML = "Invalid link! Enter proper url link";
    proceedSubmit = false;
  } else {
    errorFacebookLink.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkUrl(twitterLink.value)) {
    errorTwitterLink.innerHTML = "Invalid link! Enter proper url link";
    proceedSubmit = false;
  } else {
    errorTwitterLink.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkUrl(instagramLink.value)) {
    errorInstagramLink.innerHTML = "Invalid link! Enter proper url link";
    proceedSubmit = false;
  } else {
    errorInstagramLink.innerHTML = "";
    proceedSubmit = true;
  }

  if (password.value.length < 8) {
    errorPassword.innerHTML = "Password is to short";
    proceedSubmit = false;
  } else {
    errorPassword.innerHTML = "";
    proceedSubmit = true;
  }

  if (proceedSubmit) userProfileUpdateForm.submit();
});

// handling profile photo input, when clicked or changed what would happen
const profilePhotoInput = userProfilePhotoUpdateForm.profilePhoto;
profilePhotoInput.addEventListener("change", (e) => {
  let errorProfilePhoto = document.querySelector(".errorProfilePhoto");
  if (profilePhotoInput.files[0].size / 1000 >= 100) {
    // file should be less or equal to 100 kb
    errorProfilePhoto.innerHTML = "File size should be less or equal to 100 kb";
  } else {
    errorProfilePhoto.innerHTML = "";
  }
});

//handling submission of userProfilePhotoUpdateForm
userProfilePhotoUpdateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (profilePhotoInput.files[0].size / 1000 <= 100)
    userProfilePhotoUpdateForm.submit();
});
