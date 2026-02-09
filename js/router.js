export const routes = {
  "/": "auth-view",
  "/main": "main-view",
};

async function loadTemplates() {
  const templateFiles = {
    "auth-view": "index.html",
    "main-view": "templates/main.html",
  };

  for (const [id, file] of Object.entries(templateFiles)) {
    try {
      const response = await fetch(file);
      const html = await response.text();
      const template = document.createElement("template");
      template.id = id;
      template.innerHTML = html;
      document.body.appendChild(template);
    } catch (error) {
      console.error(`Failed to load template ${file}:`, error);
    }
  }
}

// Render function for views and body class
function renderView(templateId) {
  const app = document.getElementById("app");
  const template = document.getElementById(templateId);

  // Check if both exist
  if (!app || !template) {
    console.error(
      `Missing app or template: app=${!!app}, template=${!!template}`,
    );
    return;
  }

  app.innerHTML = "";
  app.appendChild(template.content.cloneNode(true));

  // Set a specific class on the body
  if (templateId === "auth-view") {
    document.body.className = "view-auth";
  } else if (templateId === "main-view") {
    document.body.className = "view-main";
  }
}

export async function navigate(path, replace = false) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // 1. Guard Clause
  if (isLoggedIn && path === "/") {
    path = "/main";
    replace = true;
  }

  if (!isLoggedIn && path === "/main") {
    path = "/";
    replace = true;
  }

  // 2. Update History
  if (replace) {
    window.history.replaceState({}, path, window.location.origin + path);
  } else {
    window.history.pushState({}, path, window.location.origin + path);
  }

  // 3. Render Template & Set Body Class
  renderView(routes[path] || "auth-view");

  // 4. After Navigation Actions
  const storedData = localStorage.getItem("userData");
  const userName = storedData ? JSON.parse(storedData)?.user?.username : null;
  const userInfoSpan = document.getElementById("user-info");
  const userPfp = document.getElementById("user-pfp");

  // Only run if the element actually exists on the current page
  if (userInfoSpan && storedData) {
    try {
      const userData = JSON.parse(storedData);
      userInfoSpan.textContent = userData?.user?.username || "User";
      if (userPfp) {
        userPfp.src =
          `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}` ||
          "imgs/placeholder_avatar.svg";
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
    }
  }
}

export { loadTemplates };
