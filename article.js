import { newsData } from "./newsData.js";

// --- Get Article ID from URL ---
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

// --- Find Article ---
const article = newsData.find(a => a.id === articleId);

// --- Get DOM Elements ---
const titleEl = document.getElementById("articleTitle");
const textEl = document.getElementById("articleText");
const metaEl = document.getElementById("articleMeta");
const siteTitle = document.getElementById("siteTitle");

// --- Render Article ---
if (article) {
  titleEl.textContent = article.title;
  textEl.textContent = article.text;
  metaEl.textContent = `Category: ${article.category} | Author: ${article.writer} | Date: ${article.date}`;

  // Update navbar site title with category
  siteTitle.textContent = `Modern Hírek : ${article.category}`;
  siteTitle.dataset.category = article.category;
} else {
  titleEl.textContent = "Article not found";
  textEl.textContent = "";
  metaEl.textContent = "";
  siteTitle.textContent = "Modern Hírek";
  siteTitle.dataset.category = "all";
}

// --- Navbar Functionality ---
const navbarItems = document.querySelectorAll(".navbar-right li");

// Navigate to category on click
navbarItems.forEach(li => {
  li.addEventListener("click", () => {
    const category = li.dataset.category;
    window.location.href = `meow.html?category=${encodeURIComponent(category)}`;
  });
});

// Navigate home or category when clicking site title
siteTitle.addEventListener("click", () => {
  const category = siteTitle.dataset.category || "all";
  const url = category === "all"
    ? "meow.html"
    : `meow.html?category=${encodeURIComponent(category)}`;
  window.location.href = url;
});
