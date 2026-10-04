/* =====================================================
   VIVA ENGAGEMENT WEBSITE
===================================================== */


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader")
            .classList.add("loaded");

    }, 1200);

});


/* =====================================================
   LOCK SCROLL INITIALLY
===================================================== */

document.body.classList.add("locked");


/* =====================================================
   OPEN INVITATION
===================================================== */

const openInvitation =
    document.getElementById("openInvitation");

const intro =
    document.getElementById("intro");

openInvitation.addEventListener("click", () => {

    intro.classList.add("opened");

    document.body.classList.remove("locked");

    setTimeout(() => {

        intro.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 1900);

    startMusic();

});


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("bgMusic");

const musicToggle =
    document.getElementById("musicToggle");

let musicPlaying = false;


function startMusic() {

    music.volume = 0.35;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicToggle.classList.add("playing");

        })
        .catch(() => {

            musicPlaying = false;

        });

}


musicToggle.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicToggle.classList.remove("playing");

    } else {

        startMusic();

    }

});


/* =====================================================
   HERO 3D PARALLAX
===================================================== */

const hero =
    document.querySelector(".hero");

const heroPhoto =
    document.querySelector(".hero-photo");

const heroImage =
    document.querySelector(".hero-photo img");


function movePhoto(x, y) {

    if (!heroPhoto) return;

    const rect =
        hero.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;

    const rotateX =
        ((y - centerY) / rect.height) * -5;

    const rotateY =
        ((x - centerX) / rect.width) * 5;

    heroPhoto.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    heroImage.style.transform =
        `scale(1.05) translate(${rotateY * .8}px, ${rotateX * -.8}px)`;

}


if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

    document.addEventListener("pointermove", (e) => {

        if (!hero || !heroPhoto) return;
        movePhoto(e.clientX, e.clientY);

    }, { passive: true });

}

// Keep touch devices stable while scrolling.
// A subtle CSS hover/scale effect is used instead of fighting the user's swipe.
if (heroPhoto) {
    heroPhoto.addEventListener("pointerleave", () => {
        heroPhoto.style.transform = "rotateX(0deg) rotateY(0deg)";
        if (heroImage) heroImage.style.transform = "scale(1.05)";
    });
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .15
        }

    );


revealElements.forEach(el => {

    revealObserver.observe(el);

});


/* =====================================================
   VIVA MORPH
===================================================== */

const morphText =
    document.getElementById("morphText");

const morphSection =
    document.querySelector(".viva-morph");


const morphStages = [
    "VIVA",
    "V & V",
    "VAIBHAV",
    "VAIBHAVI",
    "VIVA"
];


let lastStage = -1;


function updateMorph() {

    if (!morphSection) return;

    const rect =
        morphSection.getBoundingClientRect();

    const sectionHeight =
        morphSection.offsetHeight;

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                (window.innerHeight - rect.top) /
                (sectionHeight + window.innerHeight)
            )
        );

    const index =
        Math.min(
            morphStages.length - 1,
            Math.floor(progress * morphStages.length)
        );

    if (index !== lastStage) {

        lastStage = index;

        morphText.style.opacity = "0";

        morphText.style.transform =
            "translateY(15px) scale(.96)";

        setTimeout(() => {

            morphText.textContent =
                morphStages[index];

            morphText.style.opacity = "1";

            morphText.style.transform =
                "translateY(0) scale(1)";

        }, 150);

    }

}


window.addEventListener(
    "scroll",
    updateMorph,
    { passive: true }
);

updateMorph();


/* =====================================================
   COUNTDOWN
===================================================== */

/*
    Exact engagement time is not known yet.

    When you know the exact time, change this to:

    new Date("November 1, 2026 18:00:00")
*/

const targetDate =
    new Date("November 1, 2026 00:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        targetDate - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   SHARE
===================================================== */

const shareBtn =
    document.getElementById("shareBtn");


shareBtn.addEventListener("click", async () => {

    const shareData = {

        title:
            "Vaibhav & Vaibhavi — VIVA",

        text:
            "Join us to celebrate Vaibhav & Vaibhavi's engagement on 1 November 2026 ❤️",

        url:
            window.location.href

    };


    if (
        navigator.share &&
        typeof navigator.share === "function"
    ) {

        try {

            await navigator.share(shareData);

        } catch (error) {

            // User cancelled share

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            const original =
                shareBtn.innerHTML;

            shareBtn.innerHTML =
                "Link Copied ✓";

            setTimeout(() => {

                shareBtn.innerHTML =
                    original;

            }, 2000);

        } catch (error) {

            alert(
                "Copy this page URL to share the invitation."
            );

        }

    }

});


/* =====================================================
   PETAL GENERATOR
===================================================== */

const petalsContainer =
    document.getElementById("petals");


function createPetal() {

    if (!petalsContainer) return;

    const petal =
        document.createElement("span");

    petal.className = "petal";

    const left =
        Math.random() * 100;

    const duration =
        5 + Math.random() * 6;

    const delay =
        Math.random() * 4;

    const size =
        5 + Math.random() * 7;


    petal.style.left =
        `${left}%`;

    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.5}px`;

    petal.style.animationDuration =
        `${duration}s`;

    petal.style.animationDelay =
        `${delay}s`;

    petalsContainer.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, (duration + delay) * 1000);

}


function startPetals() {

    for (let i = 0; i < 35; i++) {

        createPetal();

    }

}


const finalSection =
    document.querySelector(".final-section");


const finalObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startPetals();

                    finalObserver.unobserve(
                        finalSection
                    );

                }

            });

        },

        {
            threshold: .2
        }

    );


finalObserver.observe(finalSection);


/* =====================================================
   FILM STRIP PAUSE ON TOUCH
===================================================== */

const filmStrip =
    document.querySelector(".film-strip");


filmStrip.addEventListener("touchstart", () => {

    filmStrip.style.animationPlayState =
        "paused";

});


filmStrip.addEventListener("touchend", () => {

    filmStrip.style.animationPlayState =
        "running";

});


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document.querySelectorAll("img")
    .forEach(img => {

        img.addEventListener("error", () => {

            img.style.background =
                "linear-gradient(135deg, #321d31, #211522)";

            img.style.minHeight = "200px";

        });

    });


    // 
    