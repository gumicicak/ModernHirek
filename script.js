// Import news data
import { newsData } from "./newsData.js";

// --- DOM Elements ---
const newsGrid = document.getElementById("newsGrid");
const siteTitle = document.getElementById("siteTitle");
const navbarItems = document.querySelectorAll(".navbar-right li");

// --- Render Functions ---

// Render exclusive news (first section)
function renderExclusive(data) {
  const exclusiveContainer = document.getElementById("exclusiveNews");
  exclusiveContainer.innerHTML = "";
  if (data.length === 0) return;

  // Pick a random article
  const item = data[Math.floor(Math.random() * data.length)];

  const div = document.createElement("div");
  div.classList.add("exclusive-article");
  div.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.text.substring(0, 150)}...</p>
  `;

  // Clickable: open article page
  div.addEventListener("click", () => {
    window.location.href = `article.html?id=${item.id}`;
  });

  exclusiveContainer.appendChild(div);
}

// Render popular news (sidebar)
function renderPopular(data) {
  const popularContainer = document.getElementById("popularNews");
  popularContainer.innerHTML = "";

  const shuffled = [...data].sort(() => 0.5 - Math.random());
  const popularItems = shuffled.slice(0, 4);

  popularItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;

    // Clickable: open article page
    li.addEventListener("click", () => {
      window.location.href = `article.html?id=${item.id}`;
    });

    popularContainer.appendChild(li);
  });
}

// Render news grid (main articles)
function renderGrid(data) {
  newsGrid.innerHTML = "";

  data.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("news-column");
    column.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.text.substring(0, 120)}...</p>
    `;

    // Clickable: open article page
    column.addEventListener("click", () => {
      window.location.href = `article.html?id=${item.id}`;
    });

    newsGrid.appendChild(column);
  });
}

// --- Utility Functions ---

// Update site title based on category
function updateTitle(category) {
  siteTitle.textContent =
    category === "all" ? "Modern Hírek" : `Modern Hírek : ${category}`;
}

// --- Main Render Function ---
function renderAll(category = "all") {
  const data =
    category === "all"
      ? newsData
      : newsData.filter(item => item.category === category);

  // Toggle grid layout
  newsGrid.classList.toggle("home-grid", category === "all");
  newsGrid.classList.toggle("category-grid", category !== "all");

  // Show/hide first section and divider
  document.querySelector(".exclusive-news-section").style.display =
    category === "all" ? "flex" : "none";
  document.querySelector(".divider").style.display =
    category === "all" ? "block" : "none";

  renderExclusive(data);
  renderPopular(data);
  renderGrid(data);
  updateTitle(category);
}

// --- Navbar Event Listeners ---
navbarItems.forEach(li => {
  li.addEventListener("click", () => {
    renderAll(li.dataset.category);
  });
});

// Clicking site title returns to home
siteTitle.addEventListener("click", () => renderAll("all"));

// --- Initial Render ---
const urlParams = new URLSearchParams(window.location.search);
const initialCategory = urlParams.get("category") || "all";
renderAll(initialCategory);
