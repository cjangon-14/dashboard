//************API METHOD*************

// import { loginRequest } from "./api.js";
// import { navigate } from "./router.js";

// export async function handleLogin() {
//   const emailInput = document.getElementById("login-email");
//   const passwordInput = document.getElementById("login-password");
//   const submitBtn = document.getElementById("__login-btn");

//   try {
//     submitBtn.value = "Loading...";
//     const result = await loginRequest({
//       email: emailInput.value.trim(),
//       password: passwordInput.value,
//     });

//     console.log("User data:", result.data);
//     localStorage.setItem("userData", JSON.stringify(result.data));
//     // localStorage.setItem("userToken", result.data.access_token);
//     localStorage.setItem("isLoggedIn", "true");

//     navigate("/main", true);
//   } catch (error) {
//     // Your error styling requirements
//     const errorMessage = document.getElementById("error-message");
//     const errorContainer = document.getElementById("error-container");

//     if (errorContainer) errorContainer.style.display = "block";
//     errorMessage.style.display = "block";
//     errorMessage.textContent = error.message;
//     emailInput.style.borderColor = "red";
//     passwordInput.style.borderColor = "red";
//   } finally {
//     submitBtn.value = "Submit";
//   }
// }

// export function handleLogout() {
//   localStorage.removeItem("isLoggedIn");
//   localStorage.removeItem("userData");
//   navigate("/", true);
// }

//*****************MOCK METHOD*****************
import { navigate } from "./router.js";

// Mock user database
const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  },
  {
    id: 2,
    username: "john",
    email: "john@example.com",
    password: "john123",
  },
];

export async function handleLogin() {
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const submitBtn = document.getElementById("__login-btn");

  try {
    submitBtn.value = "Loading...";

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Find user in mock database
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Mock user data
    const userData = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/main", true);
  } catch (error) {
    const errorMessage = document.getElementById("error-message");
    const errorContainer = document.getElementById("error-container");

    if (errorContainer) errorContainer.style.display = "block";
    errorMessage.style.display = "block";
    errorMessage.textContent = error.message;
    emailInput.style.borderColor = "red";
    passwordInput.style.borderColor = "red";
  } finally {
    submitBtn.value = "Submit";
  }
}

export function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userData");
  navigate("/", true);
}