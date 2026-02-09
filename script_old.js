const loginText = document.querySelector(".title-text .login");

const loginForm = document.querySelector("form.login");

const loginBtn = document.querySelector("label.login");

const signupBtn = document.querySelector("label.signup");

const signupLink = document.querySelector("form .signup-link a");

const doc = document;

const app = document.getElementById("app");

// 1. The Router Map (Path -> Template ID)

const routes = {
  "/": "home-view",

  "/main": "main-view", // Reusing for demo
};

// 2. The Rendering Function

const navigate = (path) => {
  // Update URL

  window.history.pushState({}, path, window.location.origin + path);

  // Get template

  const templateId = routes[path] || "home-view";

  const template = document.getElementById(templateId);

  // Swap content

  const clone = template.content.cloneNode(true);

  app.innerHTML = "";

  app.appendChild(clone);
};

// 3. Intercept Clicks

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();

    navigate(e.target.getAttribute("data-link"));
  }
});

// 4. Handle Back/Forward buttons

window.onpopstate = () => navigate(window.location.pathname);

// Initial Load

navigate(window.location.pathname);


signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";

  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";

  loginText.style.marginLeft = "0%";
};

// signupLink.onclick = () => {

//   signupBtn.click();

//   return false;

// };

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUser(user) {
  const users = getUsers();

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
}

function findUserByEmail(email) {
  return getUsers().find((user) => user.email === email);
}

const signUpForm = document.getElementById("signup-form");

const signUpEmail = document.getElementById("signup-email");

const signUpPassword = document.getElementById("signup-password");

const signUpConfirm = document.getElementById("signup-confirm");

signUpForm.addEventListener("submit", (e) => {
  // e.preventDefault();

  if (signUpPassword.value !== signUpConfirm.value) {
    alert("Passwords do not match");

    return;
  }

  if (findUserByEmail(signUpEmail.value.trim())) {
    alert("Email already registered");

    signUpEmail.value = "";

    signUpPassword.value = "";

    signUpConfirm.value = "";

    return;
  }

  const newUser = {
    email: signUpEmail.value.trim(),

    password: signUpPassword.value,
  };

  saveUser(newUser);

  alert("Signup Successful!");

  signUpForm.reset();
});

// async function getData() {

//   const url = "https://example.org/products.json";

//   try {

//     const response = await fetch(url);

//     if (!response.ok) {

//       throw new Error(`Response status: ${response.status}`);

//     }

//     const result = await response.json();

//     console.log(result);

//   } catch (error) {

//     console.error(error.message);

//   }

// }

// Example JavaScript syntax to fetch data using credentials

// async function fetchData() {

//   const url = "http://192.168.122.80:8000/api/admin/v1/login";

//   const errorMessage = document.getElementById("error-message");

//   const errorContainer = document.getElementById("error-container");

//   const userCredentials = {

//     email: logInEmail.value.trim(),

//     password: logInPassword.value,

//     // email: "bluesky.superadmin@gmail.com",

//     // password: "ssss",

//   };

//   const submitBtn = doc.getElementById("__login-btn");

//   try {

//     submitBtn.value = "Loading";

//     //losdibgf state = true

//     const response = await fetch(url, {

//       method: "POST",

//       headers: {

//         "Content-Type": "application/json",

//         Accept: "application/json",

//       },

//       body: JSON.stringify(userCredentials), // Sending credentials in body [4]

//     });

//     if (!response.ok) {

//       let message = "Login failed";

//       try {

//         const errResult = await response.json();

//         message = errResult.errors?.details || message;

//       } catch (jsonErr) {

//         // Fallback if response isn't JSON (e.g., 502 Bad Gateway HTML)

//         message = `Error ${response.status}: ${response.statusText}`;

//       }

//       throw new Error(message);

//       // // console.log("Response not ok:", response);

//       // const errResult = await response.json();

//       // throw new Error(errResult.errors.details);

//     }

//     const result = await response.json(); // Parsing the JSON response [1, 7]

//     console.log(result.message);

//     // SUCCESS! Redirect the user to the dashboard

//     navigate("/dashboard");

//     errorMessage.style.display = "none";

//     errorContainer.style.display = "none";

//     logInEmail.style.borderColor = "#cccccc";

//     logInPassword.style.borderColor = "#cccccc";

//   } catch (error) {

//     errorMessage.style.display = "block";

//     errorContainer.style.display = "block";

//     logInEmail.style.borderColor = "red";

//     logInPassword.style.borderColor = "red";

//     errorMessage.textContent = error.message;

//     console.log(error);

//     // console.error("Error:", error);

//   } finally {

//     submitBtn.value = "Submit";

//   }

//   //finaly //losdibgf state = false

// }

// function addElement() {

//   // create a new div element

//   const newDiv = document.createElement("div");

//   // and give it some content

//   const newContent = document.createTextNode("Hi there and greetings!");

//   // add the text node to the newly created div

//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM

//   const currentDiv = document.getElementById("div1");

//   document.body.insertBefore(newDiv, currentDiv);

// }

const logInForm = document.getElementById("login-form");

document.addEventListener("submit", async (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const logInEmail = document.getElementById("login-email");

    const logInPassword = document.getElementById("login-password");

    // await fetchData();

    const user = findUserByEmail(logInEmail.value.trim());

    if (!user) {
      alert("User not found");

      return;
    }

    if (user.password !== logInPassword.value) {
      alert("Incorrect password");

      return;
    }

    alert("Login successful!");

    logInForm.reset();

    // SUCCESS! Redirect the user to the main

    navigate("/main");
  }
});

// 2. The Global Listener (The "Hijacker")

document.addEventListener("click", async (e) => {
  // We check for the ID here

  if (e.target.id === "__login-btn") {
    e.preventDefault(); // Stop the form from refreshing the page

    // // Fire off your async logic

    // await handleLogin();
  }
});
