// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 700);
});


// NAVBAR
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// MOBILE MENU
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("mobile-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("mobile-open");
  });
});


// SCROLL REVEAL
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});


// MENU FILTER
const filterButtons = document.querySelectorAll(".menu-tabs button");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    menuItems.forEach(item => {

      if (
        filter === "all" ||
        item.dataset.category === filter
      ) {
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }

    });

  });

});


// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});