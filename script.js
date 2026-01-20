// Import news data
import { newsData } from "./newsData.js";

// --- DOM Elements ---
const newsGrid = document.getElementById("newsGrid");
const siteTitle = document.getElementById("siteTitle");
const navbarItems = document.querySelectorAll(".navbar-right li");

// --- Simplified Helper ---
function getArticleDetails(item) {
  // If the text contains a '-', split it. 
  // Part 1: "heli.png ", Part 2: " The iconic Szechenyi..."
  if (item.text.includes("-")) {
    const parts = item.text.split("-");
    const imageName = parts[0].trim(); // "heli.png"
    const cleanText = parts.slice(1).join("-").trim(); // Everything after the first dash
    
    return {
      imagePath: `./images/${imageName}`,
      text: cleanText
    };
  }
  
  // Default if no dash is found
  return {
    imagePath: null,
    text: item.text
  };
}

// --- Render Functions ---

function renderExclusive(data) {
  const exclusiveContainer = document.getElementById("exclusiveNews");
  exclusiveContainer.innerHTML = "";
  if (data.length === 0) return;

  const rawItem = data[Math.floor(Math.random() * data.length)];
  const details = getArticleDetails(rawItem);

  const div = document.createElement("div");
  div.classList.add("exclusive-article");
  
  const imgHtml = details.imagePath 
    ? `<img src="${details.imagePath}" style="width:100%; max-height:400px; object-fit:cover; margin-bottom:15px;">` 
    : "";

  div.innerHTML = `
    ${imgHtml}
    <h2>${rawItem.title}</h2>
    
  `;//<p>${details.text.substring(0, 150)}...</p> -- feljebb kell vinni eggyel

  div.addEventListener("click", () => {
    window.location.href = `article.html?id=${rawItem.id}`;
  });

  exclusiveContainer.appendChild(div);
}

function renderGrid(data) {
  newsGrid.innerHTML = "";

  data.forEach(rawItem => {
    const details = getArticleDetails(rawItem);
    const column = document.createElement("div");
    column.classList.add("news-column");

    const imgHtml = details.imagePath 
      ? `<img src="${details.imagePath}" alt="${rawItem.title}">` 
      : "";

    // We wrap the H3 and P in a 'text-content' div for better layout control
    column.innerHTML = `
      ${imgHtml}
      <div class="text-content">
        <h3>${rawItem.title}</h3>
        <p>${details.text.substring(0, 120)}...</p>
      </div>
    `;

    column.addEventListener("click", () => {
      window.location.href = `article.html?id=${rawItem.id}`;
    });

    newsGrid.appendChild(column);
  });
}

// --- Render Popular (No changes needed) ---
function renderPopular(data) {
  const popularContainer = document.getElementById("popularNews");
  popularContainer.innerHTML = "";

  const shuffled = [...data].sort(() => 0.5 - Math.random());
  const popularItems = shuffled.slice(0, 4);

  popularItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.addEventListener("click", () => {
      window.location.href = `article.html?id=${item.id}`;
    });
    popularContainer.appendChild(li);
  });
}

// --- Logic/Utility ---
function updateTitle(category) {
  siteTitle.textContent = category === "all" ? "Modern Hírek" : `Modern Hírek : ${category}`;
}

function renderAll(category = "all") {
  const data = category === "all" ? newsData : newsData.filter(item => item.category === category);

  newsGrid.classList.toggle("home-grid", category === "all");
  newsGrid.classList.toggle("category-grid", category !== "all");

  document.querySelector(".exclusive-news-section").style.display = category === "all" ? "flex" : "none";
  document.querySelector(".divider").style.display = category === "all" ? "block" : "none";

  renderExclusive(data);
  renderPopular(data);
  renderGrid(data);
  updateTitle(category);
}

navbarItems.forEach(li => {
  li.addEventListener("click", () => renderAll(li.dataset.category));
});

siteTitle.addEventListener("click", () => {
  window.history.pushState({}, '', window.location.pathname);
  renderAll("all");
});

const urlParams = new URLSearchParams(window.location.search);
const initialCategory = urlParams.get("category") || "all";
renderAll(initialCategory);
