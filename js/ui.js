// js/ui.js
export function toggleSlider(isSignup) {
  const loginForm = document.querySelector("form.login");
  const sliderTab = document.querySelector(".slider-tab");
  const loginLabel = document.querySelector("label.login");
  const signupLabel = document.querySelector("label.signup");

  if (!loginForm || !sliderTab) return;

  // 1. Move the Form
  loginForm.style.marginLeft = isSignup ? "-50%" : "0%";

  // 2. Move the Tab
  sliderTab.style.left = isSignup ? "50%" : "2px";

  // 3. Update active states (The "Values")
  if (isSignup) {
    signupLabel.classList.add("active");
    loginLabel.classList.remove("active");
    // Explicitly check the radio button in the background for accessibility
    document.getElementById("signup").checked = true;
  } else {
    loginLabel.classList.add("active");
    signupLabel.classList.remove("active");
    document.getElementById("login").checked = true;
  }
}

