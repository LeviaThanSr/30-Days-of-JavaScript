const Tabs = document.querySelector(".tabs");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

function handleTabs(e) {
  const id = e.target.dataset.id;
  if (id) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");
    articles.forEach((article) => {
      article.classList.remove("active");
    });

    const tab = document.getElementById(id);
    tab.classList.add("active");
  }
}

Tabs.addEventListener("click", handleTabs);
