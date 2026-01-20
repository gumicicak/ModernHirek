import { newsData } from "./newsData.js";

const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
const article = newsData.find(a => a.id === articleId);

const titleEl = document.getElementById("articleTitle");
const textEl = document.getElementById("articleText");
const metaEl = document.getElementById("articleMeta");
const siteTitle = document.getElementById("siteTitle");

if (article) {
  let displayText = article.text;
  
  // Simple split at the dash
  if (article.text.includes("-")) {
    const parts = article.text.split("-");
    const imageName = parts[0].trim();
    displayText = parts.slice(1).join("-").trim();

    // Create the image element
    const img = document.createElement("img");
    img.src = `images/${imageName}`;
    img.style.width = "100%";
    img.style.marginBottom = "20px";
    img.style.borderRadius = "8px";
    
    // Put the image before the text
    textEl.parentNode.insertBefore(img, textEl);
  }

  titleEl.textContent = article.title;
  textEl.textContent = displayText;
  metaEl.textContent = `Category: ${article.category} | Author: ${article.writer} | Date: ${article.date}`;
  siteTitle.textContent = `Modern Hírek : ${article.category}`;
  siteTitle.dataset.category = article.category;
}

// Navbar Functionality (No changes needed)
const navbarItems = document.querySelectorAll(".navbar-right li");
navbarItems.forEach(li => {
  li.addEventListener("click", () => {
    window.location.href = `index.html?category=${encodeURIComponent(li.dataset.category)}`;
  });
});

siteTitle.addEventListener("click", () => {
  const category = siteTitle.dataset.category || "all";
  window.location.href = category !== "all" ? `index.html?category=${category}` : "index.html";
});
