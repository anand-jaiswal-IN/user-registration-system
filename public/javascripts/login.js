const loginForm = document.forms["loginForm"];

function checkUsername(name) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(name);
}
function checkEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const [username, email, password] = [
    loginForm.username,
    loginForm.email,
    loginForm.password,
  ];

  const [errorEmailOrPassword, errorPassword] = [
    document.querySelector(".errorEmailOrPassword"),
    document.querySelector(".errorPassword"),
  ];

  let proceedSubmit = false;

  if (username.value.length == 0 && email.value.length == 0) {
    errorEmailOrPassword.innerHTML = "*Enter Username or Password";
    proceedSubmit = false;
  } else {
    if (username.value.length > 0) {
      if (!checkUsername(username.value)) {
        errorEmailOrPassword.innerHTML = "*Invalid Username";
        proceedSubmit = false;
      } else {
        proceedSubmit = true;
        errorEmailOrPassword.innerHTML = "";
      }
    } else {
      if (!checkEmail(email.value)) {
        errorEmailOrPassword.innerHTML = "*Invalid E-mail";
        proceedSubmit = false;
      } else {
        proceedSubmit = true;
        errorEmailOrPassword.innerHTML = "";
      }
    }
  }

  if (password.value.length < 8) {
    errorPassword.innerHTML = "*Password is too short";
    proceedSubmit = false;
  } else {
    proceedSubmit = true;
    errorPassword.innerHTML = "";
  }

  if (proceedSubmit) loginForm.submit();
});
