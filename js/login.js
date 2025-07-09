var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var btnMain = document.getElementById("main-btn");
var messageValidationName = document.getElementById("messageValidationName");
var messageValidationEmail = document.getElementById("messageValidationEmail");
var messageValidationPassword = document.getElementById(
  "messageValidationPassword"
);
var errorAlert = document.getElementById("errorValidation");

var nameRegExp = /^[A-Z][a-zA-Z]{2,}( +[a-zA-Z]+)*$/;
var emailRegExp = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

var usersArr = [];
if (localStorage.getItem("users") != null) {
  usersArr = JSON.parse(localStorage.getItem("users"));
}

// ====  Sign Up ====
if (document.body.getAttribute("data-page") === "sign-up") {
  if (nameInput) {
    nameInput.addEventListener("input", function () {
      toggleValidation(nameInput, nameRegExp, messageValidationName);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      toggleValidation(emailInput, emailRegExp, messageValidationEmail);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      toggleValidation(
        passwordInput,
        passwordRegExp,
        messageValidationPassword
      );
    });
  }

  if (btnMain) {
    btnMain.addEventListener("click", function () {
      const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      if (isValidDataSignUp(user) && !isEmailExists(user.email)) {
        usersArr.push(user);
        localStorage.setItem("users", JSON.stringify(usersArr));
        clearInputs();
        window.location.href = "login.html";
      } else {
        if (isEmailExists(user.email)) {
          messageValidationEmail.innerText = "Email is already registered";
          messageValidationEmail.classList.remove("d-none");
        }
        displayInvalidInputs();
      }
    });
  }
}

// ====  Login ====
if (document.body.getAttribute("data-page") === "login") {
  if (btnMain) {
    btnMain.addEventListener("click", function () {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const foundUser = usersArr.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("loggedInUser", foundUser.email);
        window.location.href = "index.html";
        if (errorAlert) errorAlert.classList.add("d-none");
      } else {
        if (errorAlert) {
          errorAlert.innerHTML = "Invalid Email or Password";
          errorAlert.classList.remove("d-none");
        }
      }
    });
  }
}

function toggleValidation(input, pattern, messageElement) {
  if (pattern.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    messageElement.classList.add("d-none");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    messageElement.classList.remove("d-none");
  }
}

function isValidDataSignUp(user) {
  return (
    user.name !== "" &&
    user.email !== "" &&
    user.password !== "" &&
    nameRegExp.test(user.name) &&
    emailRegExp.test(user.email) &&
    passwordRegExp.test(user.password)
  );
}

function isEmailExists(email) {
  return usersArr.some((user) => user.email === email);
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

function displayInvalidInputs() {
  nameInput.classList.add("is-invalid");
  messageValidationName.classList.remove("d-none");

  emailInput.classList.add("is-invalid");
  messageValidationEmail.classList.remove("d-none");

  passwordInput.classList.add("is-invalid");
  messageValidationPassword.classList.remove("d-none");
}



