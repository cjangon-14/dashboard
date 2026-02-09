const doc = document;

// 1. The Router Map
const routes = {
  "/": "home-view",
  "/main": "main-view",
};

// Initialize isLoggedIn from localStorage so refresh doesn't log you out
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// 2. The Rendering Function
const navigate = (path, replace = false) => {
  // PROTECTION: If logged in, don't let them go to the login page
  if (isLoggedIn && path === "/") {
    path = "/main";
    replace = true;
  }
  
  if (replace) {
    window.history.replaceState({}, path, window.location.origin + path);
  } else {
    window.history.pushState({}, path, window.location.origin + path);
  }
  
  const templateId = routes[path] || "home-view";
  const template = document.getElementById(templateId);
  
  if (template) {
    const app = document.getElementById("app");
    const clone = template.content.cloneNode(true);
    app.innerHTML = "";
    app.appendChild(clone);
  }
};

// ---- API HANDLING ------
async function fetchData() {
  const url = "http://192.168.122.80:8000/api/admin/v1/login";

  // Select elements INSIDE the function because they are dynamic in SPA
  const logInEmail = document.getElementById("login-email");
  const logInPassword = document.getElementById("login-password");
  const errorMessage = document.getElementById("error-message");
  const errorContainer = document.getElementById("error-container");
  const submitBtn = document.getElementById("__login-btn");

  if (!logInEmail || !logInPassword) return;

  const userCredentials = {
    email: logInEmail.value.trim(),
    password: logInPassword.value,
  };

  try {
    if (submitBtn) submitBtn.value = "Loading...";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    if (!response.ok) {
      let message = "Login failed";
      try {
        const errResult = await response.json();
        message = errResult.errors?.details || message;
      } catch (jsonErr) {
        message = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(message);
    }

    const result = await response.json();
    console.log("Server Message:", result.message);
    console.log("Full Response:", result);
    console.log("User Token", result.data.access_token)

    // Save token if your API provides one
    if (result.data.access_token) localStorage.setItem("userToken", result.data.access_token);

    // Success State
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");

    // Hide Errors & Reset Styles (Requirement)
    if (errorMessage) errorMessage.style.display = "none";
    if (errorContainer) errorContainer.style.display = "none";
    logInEmail.style.borderColor = "#cccccc";
    logInPassword.style.borderColor = "#cccccc";

    navigate("/main", true);
  } catch (error) {
    // Show Errors & Apply Red Styles (Requirement)
    if (errorMessage) {
      errorMessage.style.display = "block";
      errorMessage.textContent = error.message;
    }
    if (errorContainer) errorContainer.style.display = "block";

    if (logInEmail) logInEmail.style.borderColor = "red";
    if (logInPassword) logInPassword.style.borderColor = "red";

    console.error("Login Error:", error);
  } finally {
    if (submitBtn) submitBtn.value = "Submit";
  }
}

// 3. Central Click Listener
document.addEventListener("click", (e) => {
  if (e.target.id === "logout-btn") {
    e.preventDefault();
    handleLogout();
  }

  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("data-link"));
  }

  // Slider Logic
  const signupLabel = e.target.closest("label.signup");
  if (signupLabel) {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".title-text .login");
    if (loginForm && loginText) {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    }
  }

  const loginLabel = e.target.closest("label.login");
  if (loginLabel) {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".title-text .login");
    if (loginForm && loginText) {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    }
  }
});

// 4. History Handling
window.onpopstate = () => navigate(window.location.pathname);

// 5. Submit Handling
document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.id === "signup-form") {
    const signUpEmail = document.getElementById("signup-email");
    const signUpPassword = document.getElementById("signup-password");
    const signUpConfirm = document.getElementById("signup-confirm");

    if (signUpPassword.value !== signUpConfirm.value) {
      alert("Passwords do not match");
      return;
    }
    // ... rest of your local signup logic ...
    alert("Signup Successful!");
  }

  if (e.target.id === "login-form") {
    fetchData();
  }
});

const handleLogout = () => {
  isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userToken");
  alert("You have been logged out.");
  navigate("/", true);
};

// Initial Load
navigate(window.location.pathname);
