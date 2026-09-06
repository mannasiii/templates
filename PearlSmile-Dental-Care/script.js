

    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        document.getElementById("header");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        document.body.classList.toggle(
            "menu-open"
        );


        if (
            navLinks.classList.contains("active")
        ) {

            menuBtn.innerHTML = "×";

        } else {

            menuBtn.innerHTML = "☰";

        }

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                menuBtn.innerHTML = "☰";

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(e) {

                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );

                    if (!target) return;

                    e.preventDefault();

                    const headerHeight =
                        header.offsetHeight;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        headerHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });
    /* =====================================================
       APPOINTMENT FORM
    ===================================================== */

    const appointmentForm =
        document.getElementById("appointmentForm");

    const appointmentSuccess =
        document.getElementById("appointmentSuccess");


    appointmentForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const date =
            document.getElementById("date").value;

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value;


        console.log({
            name,
            phone,
            date,
            service,
            message
        });


        /* Hide form */

        appointmentForm.style.display = "none";


        /* Show success */

        appointmentSuccess.classList.add("active");

    });


    function resetAppointment() {

        appointmentForm.reset();

        appointmentForm.style.display = "flex";

        appointmentSuccess.classList.remove("active");

    }

