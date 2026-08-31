/* =====================================================
   NAVBAR BACKGROUND ON SCROLL
===================================================== */

const header = document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(0,0,0,.96)";

    } else {

        header.style.background = "transparent";

    }

});



/* =====================================================
   MOBILE MENU CLOSE
===================================================== */

const navLinks =
    document.querySelectorAll(".navbar .nav-link");

const navbarCollapse =
    document.querySelector(".navbar-collapse");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (
            navbarCollapse.classList.contains("show")
        ) {

            const collapse =
                bootstrap.Collapse.getInstance(
                    navbarCollapse
                );

            if (collapse) {

                collapse.hide();

            }

        }

    });

});



/* =====================================================
   SIMPLE SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".feature-item, .occasion-card, .package-card, .benefit, .contact-box"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});