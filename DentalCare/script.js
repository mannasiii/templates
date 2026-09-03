/* =========================================================
   SAI DENTAL
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const saiMobileToggle =
    document.getElementById("saiMobileToggle");

const saiMobileMenu =
    document.getElementById("saiMobileMenu");


if (saiMobileToggle && saiMobileMenu) {

    saiMobileToggle.addEventListener("click", function () {

        saiMobileMenu.classList.toggle(
            "sai-menu-open"
        );


        const icon =
            saiMobileToggle.querySelector("i");


        if (
            saiMobileMenu.classList.contains(
                "sai-menu-open"
            )
        ) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });


    const saiMobileLinks =
        saiMobileMenu.querySelectorAll("a");


    saiMobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            saiMobileMenu.classList.remove(
                "sai-menu-open"
            );


            const icon =
                saiMobileToggle.querySelector("i");


            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        });

    });

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const saiRevealElements =
    document.querySelectorAll(
        ".sai-reveal"
    );


if ("IntersectionObserver" in window) {


    const saiObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "sai-visible"
                        );


                        saiObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    saiRevealElements.forEach(
        function (element) {

            saiObserver.observe(element);

        }
    );


} else {


    saiRevealElements.forEach(
        function (element) {

            element.classList.add(
                "sai-visible"
            );

        }
    );

}



/* =========================================================
   APPOINTMENT FORM
========================================================= */

const saiAppointmentForm =
    document.getElementById(
        "saiAppointmentForm"
    );


const saiFormSuccess =
    document.getElementById(
        "saiFormSuccess"
    );


if (
    saiAppointmentForm &&
    saiFormSuccess
) {


    saiAppointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM VALUES
            --------------------------------------------- */

            const saiName =
                document.getElementById(
                    "saiName"
                ).value.trim();


            const saiPhone =
                document.getElementById(
                    "saiPhone"
                ).value.trim();


            const saiDate =
                document.getElementById(
                    "saiDate"
                ).value;


            const saiTreatment =
                document.getElementById(
                    "saiTreatment"
                ).value;


            const saiMessage =
                document.getElementById(
                    "saiMessage"
                ).value.trim();



            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (
                !saiName ||
                !saiPhone ||
                !saiDate ||
                !saiTreatment
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }



            /* ---------------------------------------------
               FORMAT DATE
            --------------------------------------------- */

            let formattedDate =
                saiDate;


            if (saiDate) {

                const dateObject =
                    new Date(
                        saiDate + "T00:00:00"
                    );


                formattedDate =
                    dateObject.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }



            /* ---------------------------------------------
               WHATSAPP MESSAGE
            --------------------------------------------- */

            const saiWhatsappNumber =
                "919869507342";


            const saiWhatsappMessage =

                "Hello Sai Dental Clinic,%0A%0A" +

                "*Appointment Request*%0A%0A" +

                "*Name:* " +
                encodeURIComponent(
                    saiName
                ) +

                "%0A" +

                "*Phone:* " +
                encodeURIComponent(
                    saiPhone
                ) +

                "%0A" +

                "*Preferred Date:* " +
                encodeURIComponent(
                    formattedDate
                ) +

                "%0A" +

                "*Treatment:* " +
                encodeURIComponent(
                    saiTreatment
                ) +

                "%0A" +

                "*Message:* " +
                encodeURIComponent(
                    saiMessage ||
                    "No additional message"
                );



            /* ---------------------------------------------
               WHATSAPP URL
            --------------------------------------------- */

            const saiWhatsappURL =
                "https://wa.me/" +
                saiWhatsappNumber +
                "?text=" +
                saiWhatsappMessage;



            /* ---------------------------------------------
               SHOW SUCCESS
            --------------------------------------------- */

            saiAppointmentForm.style.display =
                "none";


            saiFormSuccess.classList.add(
                "sai-show"
            );



            /* ---------------------------------------------
               OPEN WHATSAPP
            --------------------------------------------- */

            setTimeout(function () {

                window.open(
                    saiWhatsappURL,
                    "_blank"
                );

            }, 700);

        }
    );

}



/* =========================================================
   PREVENT PAST APPOINTMENT DATES
========================================================= */

const saiDateInput =
    document.getElementById(
        "saiDate"
    );


if (saiDateInput) {


    const saiToday =
        new Date();


    const saiYear =
        saiToday.getFullYear();


    const saiMonth =
        String(
            saiToday.getMonth() + 1
        ).padStart(2, "0");


    const saiDay =
        String(
            saiToday.getDate()
        ).padStart(2, "0");


    const saiMinimumDate =
        saiYear +
        "-" +
        saiMonth +
        "-" +
        saiDay;


    saiDateInput.min =
        saiMinimumDate;

}



/* =========================================================
   NAVBAR SHADOW ON SCROLL
========================================================= */

const saiNavbar =
    document.querySelector(
        ".sai-navbar"
    );


if (saiNavbar) {


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 20
            ) {

                saiNavbar.style.boxShadow =
                    "0 10px 35px rgba(18,52,61,.07)";

            } else {

                saiNavbar.style.boxShadow =
                    "none";

            }

        }
    );

}