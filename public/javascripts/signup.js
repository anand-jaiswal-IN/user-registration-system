const signupForm = document.forms["signupForm"];

function checkName(name) {
  name = name.trim();
  if (name.length > 0) return true;
  else return false;
}
function checkUsername(name) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(name);
}
function checkEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if (passwordRegex.test(password)) {
    return true;
  } else return false;
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = signupForm.firstName;
  const lastName = signupForm.lastName;
  const username = signupForm.username;
  const email = signupForm.email;
  const password = signupForm.password;
  const confirmPassword = signupForm.confirmPassword;

  const [
    errorFirstName,
    errorLastName,
    errorUsername,
    errorEmail,
    errorPassword,
    errorConfimPassword,
  ] = [
    document.querySelector(".errorFirstName"),
    document.querySelector(".errorLastName"),
    document.querySelector(".errorUsername"),
    document.querySelector(".errorEmail"),
    document.querySelector(".errorPassword"),
    document.querySelector(".errorConfimPassword"),
  ];

  let proceedSubmit = false;

  if (!checkName(firstName.value)) {
    errorFirstName.innerHTML = "*First name should not be empty";
    proceedSubmit = false;
  } else {
    errorFirstName.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkName(lastName.value)) {
    errorLastName.innerHTML = "*Last name should not be empty";
    proceedSubmit = false;
  } else {
    errorLastName.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkUsername(username.value)) {
    errorUsername.innerHTML = "*Invalid Username. Try another one";
    proceedSubmit = false;
  } else {
    errorUsername.innerHTML = "";
    proceedSubmit = true;
  }

  if (!checkEmail(email.value)) {
    errorEmail.innerHTML = "*Invalid E-mail";
    proceedSubmit = false;
  } else {
    errorEmail.innerHTML = "";
    proceedSubmit = true;
  }

  if (password.value.length < 8) {
    errorPassword.innerHTML = "*Password must be at least 8 characters long.";
    proceedSubmit = false;
  } else {
    if (!checkPassword(password.value)) {
      errorPassword.innerHTML =
        "*Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
      proceedSubmit = false;
    } else {
      errorPassword.innerHTML = "";
      proceedSubmit = true;

      if (password.value != confirmPassword.value) {
        errorConfimPassword.innerHTML = "*Password does not match";
        proceedSubmit = false;
      } else {
        errorConfimPassword.innerHTML = "";
        proceedSubmit = true;
      }
    }
  }

  if (proceedSubmit) signupForm.submit();
});
