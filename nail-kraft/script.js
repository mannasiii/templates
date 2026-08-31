
/* =========================================
   NAVBAR SCROLL
========================================= */

const navbar = document.getElementById("mainNavbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);


/* Observe animation elements */

document.querySelectorAll(
    ".reveal, .service-card, .review-card, .gallery-box, .why-item"
).forEach((element) => {

    observer.observe(element);

});


/* =========================================
   GALLERY FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        /* Add active class */

        button.classList.add("active");

        const filter = button.dataset.filter;


        galleryItems.forEach((item) => {

            if (
                filter === "all" ||
                item.classList.contains(filter)
            ) {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 50);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(0.9)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================================
   MOBILE NAVBAR CLOSE
========================================= */

const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.getElementById("navbarNav");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navbarCollapse.classList.contains("show")) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {
                bsCollapse.hide();
            }

        }

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   HERO LOAD ANIMATION
========================================= */

window.addEventListener("load", () => {

    document
        .querySelectorAll(".hero .reveal")
        .forEach((element, index) => {

            setTimeout(() => {
                element.classList.add("show");
            }, 300 + index * 180);

        });

});

