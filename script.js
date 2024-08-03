// Toggle navbar visibility on small screens
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Highlight active section in the navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const activeLink = document.querySelector(`header nav a[href*=${id}]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      });
    }
  });
};

// Dark mode toggle functionality
const darkModeToggle = document.querySelector("#darkmode-toggle");
const body = document.querySelector("body");
const icon = document.querySelector(".btn__icon");

let isDarkMode = localStorage.getItem("darkmode") === "true"; // Load dark mode state from local storage

const toggleDarkMode = () => {
  document.documentElement.style.setProperty(
    "--bg-color",
    isDarkMode ? "#080808" : "#f0f0f0"
  );
  document.documentElement.style.setProperty(
    "--second-bg-color",
    isDarkMode ? "#131313" : "#e0e0e0"
  );
  document.documentElement.style.setProperty(
    "--text-color",
    isDarkMode ? "white" : "#333"
  );
  document.documentElement.style.setProperty(
    "--main-color",
    isDarkMode ? "#00ffee" : "#fa8128"
  );
  body.classList.toggle("darkmode", isDarkMode);
  updateIcon();
};

darkModeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  store(isDarkMode);
  toggleDarkMode();
});

function store(value) {
  localStorage.setItem("darkmode", value);
}

function updateIcon() {
  icon.classList.add("animated");
  if (isDarkMode) {
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
  } else {
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun");
  }
  setTimeout(() => {
    icon.classList.remove("animated");
  }, 500); // Remove the animation class after it completes
}

// Initialize dark mode on page load
toggleDarkMode();