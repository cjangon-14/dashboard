import { loadTemplates, navigate } from "./router.js";
import { handleLogin, handleLogout } from "./auth.js";
import { toggleSlider } from "./ui.js";

// Central Click Listener
document.addEventListener("click", (e) => {
  if (e.target.id === "logout-btn") handleLogout();

  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("data-link"));
  }

  if (e.target.closest("label.signup")) toggleSlider(true);
  if (e.target.closest("label.login")) toggleSlider(false);
});

// Central Submit Listener
document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "login-form") handleLogin();
});

window.onpopstate = () => navigate(window.location.pathname);

await loadTemplates();
navigate(window.location.pathname);

