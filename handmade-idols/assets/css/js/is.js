
//toggle
(function () {

    function initMobileMenu() {

        const menuToggle = document.getElementById("menuToggle");
        const navigation = document.getElementById("mainNavigation");

        if (!menuToggle || !navigation) {
            console.error("Menu button or navigation not found!");
            return;
        }

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';

        });

        document.addEventListener("click", function (event) {

            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="bi bi-list"></i>';
            }

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = '<i class="bi bi-list"></i>';
            });

        });

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMobileMenu);
    } else {
        initMobileMenu();
    }

})();

/* =========================================
   ISHAKALA STUDIO - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".isha-menu-toggle");
    const navigation = document.querySelector(".isha-navigation");
    const navLinks = document.querySelectorAll(".isha-navigation a");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =====================================
       2. HERO SLIDER
    ===================================== */

    const slides = document.querySelectorAll(".isha-slide");
    const nextButton = document.querySelector(".isha-slider-next");
    const prevButton = document.querySelector(".isha-slider-prev");
    const dotsContainer = document.querySelector(".isha-slider-dots");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        if (!slides.length) return;

        slides.forEach(function (slide, i) {
            slide.classList.remove("active");
            slide.setAttribute("aria-hidden", "true");

            if (i === index) {
                slide.classList.add("active");
                slide.setAttribute("aria-hidden", "false");
            }
        });

        currentSlide = index;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll("button");

            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentSlide);
                dot.setAttribute(
                    "aria-current",
                    i === currentSlide ? "true" : "false"
                );
            });
        }
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex =
            (currentSlide - 1 + slides.length) % slides.length;

        showSlide(prevIndex);
    }

    if (slides.length > 0) {

        // Create slider dots automatically
        if (dotsContainer) {
            dotsContainer.innerHTML = "";

            slides.forEach(function (_, index) {
                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "isha-slider-dot";
                dot.setAttribute("aria-label", "Go to slide " + (index + 1));

                dot.addEventListener("click", function () {
                    showSlide(index);
                    restartSlider();
                });

                dotsContainer.appendChild(dot);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                nextSlide();
                restartSlider();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                prevSlide();
                restartSlider();
            });
        }

        function startSlider() {
            if (slides.length > 1) {
                sliderInterval = setInterval(nextSlide, 3000);
            }
        }

        function stopSlider() {
            clearInterval(sliderInterval);
        }

        function restartSlider() {
            stopSlider();
            startSlider();
        }

        const hero = document.querySelector(".isha-hero");

        if (hero) {
            hero.addEventListener("mouseenter", stopSlider);
            hero.addEventListener("mouseleave", startSlider);
        }

        showSlide(0);
        startSlider();
    }


    /* =====================================
       3. SCROLL REVEAL ANIMATION
    ===================================== */

    const revealElements = document.querySelectorAll(".isha-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =====================================
       4. SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================
       5. HEADER SCROLL EFFECT
    ===================================== */

    const header = document.querySelector(".isha-header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================
       6. CURRENT YEAR
    ===================================== */

    const yearElements = document.querySelectorAll(".isha-current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       7. BACK TO TOP
    ===================================== */

    const backToTop = document.querySelector(".isha-back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {
            backToTop.classList.toggle("show", window.scrollY > 400);
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

    }

});

// gallery 

/* =========================================
   ISHAKALA GALLERY LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(
        ".gallery-v2-item img"
    );

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("galleryLightboxImage");

    if (!galleryItems.length || !lightbox || !lightboxImage) return;

    const images = Array.from(galleryItems);
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    images.forEach(function (image, index) {
        image.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    lightbox.querySelector(".gallery-v2-close")
        .addEventListener("click", closeLightbox);

    lightbox.querySelector(".gallery-v2-prev")
        .addEventListener("click", function () {
            showImage(currentIndex - 1);
        });

    lightbox.querySelector(".gallery-v2-next")
        .addEventListener("click", function () {
            showImage(currentIndex + 1);
        });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);

    });

});
// product add to cart

/* =========================================
   ISHAKALA ADD TO CART - FIXED VERSION
========================================= */

(function () {

    function initIshakalaCart() {

        const cart = {};

        const cartItems = document.getElementById("cartItems");
        const cartCount = document.getElementById("cartCount");
        const cartTotal = document.getElementById("cartTotal");

        const whatsappButton = document.getElementById("whatsappEnquiry");
        const emailButton = document.getElementById("emailEnquiry");

        const addButtons = document.querySelectorAll(".services-v2-cart-btn");

        console.log("Ishakala Cart Initialized");
        console.log("Add buttons found:", addButtons.length);

        if (!cartItems || !cartCount || !cartTotal) {
            console.error("Cart HTML elements not found!");
            return;
        }

        if (!addButtons.length) {
            console.error("Add to Cart buttons not found!");
            return;
        }


        function updateCart() {

            cartItems.innerHTML = "";

            let total = 0;
            let quantityTotal = 0;

            Object.keys(cart).forEach(function (name) {

                const item = cart[name];
                const subtotal = item.price * item.quantity;

                total += subtotal;
                quantityTotal += item.quantity;

                const row = document.createElement("div");
                row.className = "services-v2-cart-row";

                const nameElement = document.createElement("div");
                nameElement.className = "services-v2-cart-name";
                nameElement.textContent = name;

                const priceElement = document.createElement("div");
                priceElement.className = "services-v2-cart-price";
                priceElement.textContent = "₹" + subtotal;

                const quantityElement = document.createElement("div");
                quantityElement.className = "services-v2-quantity";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.textContent = "−";

                const quantity = document.createElement("span");
                quantity.textContent = item.quantity;

                const plus = document.createElement("button");
                plus.type = "button";
                plus.textContent = "+";

                minus.addEventListener("click", function () {
                    item.quantity--;

                    if (item.quantity <= 0) {
                        delete cart[name];
                    }

                    updateCart();
                });

                plus.addEventListener("click", function () {
                    item.quantity++;
                    updateCart();
                });

                quantityElement.append(minus, quantity, plus);

                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "services-v2-remove";
                remove.textContent = "Remove";

                remove.addEventListener("click", function () {
                    delete cart[name];
                    updateCart();
                });

                row.append(
                    nameElement,
                    priceElement,
                    quantityElement,
                    remove
                );

                cartItems.appendChild(row);

            });


            if (quantityTotal === 0) {
                cartItems.innerHTML =
                    '<p class="services-v2-empty">Your cart is empty. Add a service to get started!</p>';
            }

            cartCount.textContent = quantityTotal;
            cartTotal.textContent = "₹" + total;

            if (whatsappButton) {
                whatsappButton.disabled = quantityTotal === 0;
            }

            if (emailButton) {
                emailButton.disabled = quantityTotal === 0;
            }

        }


        // ADD TO CART

        addButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const name = button.getAttribute("data-service");
                const price = Number(button.getAttribute("data-price"));

                if (!name || !Number.isFinite(price)) {
                    console.error("Invalid service details", name, price);
                    return;
                }

                if (cart[name]) {
                    cart[name].quantity++;
                } else {
                    cart[name] = {
                        price: price,
                        quantity: 1
                    };
                }

                updateCart();

                button.textContent = "✓ Added to Cart";

                setTimeout(function () {
                    button.innerHTML = "<span>+</span> Add to Cart";
                }, 1000);

            });

        });


        // CREATE MESSAGE

        function createMessage() {

            let message = "Hello Ishakala Studio,\n\nI would like to enquire about these services:\n\n";
            let total = 0;

            Object.keys(cart).forEach(function (name, index) {

                const item = cart[name];
                const subtotal = item.price * item.quantity;

                total += subtotal;

                message += (index + 1) + ". " + name + "\n";
                message += "Quantity: " + item.quantity + "\n";
                message += "Price: ₹" + item.price + "\n";
                message += "Subtotal: ₹" + subtotal + "\n\n";

            });

            message += "Total Amount: ₹" + total;
            message += "\n\nPlease share more details. Thank you!";

            return message;

        }


        // WHATSAPP

        if (whatsappButton) {

            whatsappButton.addEventListener("click", function () {

                if (Object.keys(cart).length === 0) return;

                const url = "https://wa.me/917972432946?text=" +
                    encodeURIComponent(createMessage());

                window.open(url, "_blank");

            });

        }


        // EMAIL

        if (emailButton) {

            emailButton.addEventListener("click", function () {

                if (Object.keys(cart).length === 0) return;

                const url = "mailto:ishakalastudio@gmail.com" +
                    "?subject=" + encodeURIComponent("Service Enquiry - Ishakala Studio") +
                    "&body=" + encodeURIComponent(createMessage());

                window.location.href = url;

            });

        }


        updateCart();

    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initIshakalaCart);
    } else {
        initIshakalaCart();
    }

})();


// another ui : add to cart col wise : test.html

(function () {

  function initServicesCart() {

    const cart = {};

    const trigger = document.getElementById("servicesCartTrigger");
    const drawer = document.getElementById("servicesCartDrawer");
    const overlay = document.getElementById("servicesCartOverlay");
    const close = document.getElementById("servicesCartClose");

    const cartItems = document.getElementById("servicesCartItems");
    const cartCount = document.getElementById("servicesCartCount");
    const cartTotal = document.getElementById("servicesCartTotal");

    const whatsapp = document.getElementById("servicesWhatsApp");
    const email = document.getElementById("servicesEmail");

    if (!trigger || !drawer || !overlay || !cartItems) {
      return;
    }

    function openCart() {
      drawer.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeCart() {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    trigger.addEventListener("click", openCart);
    close.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCart();
    });

    document.querySelectorAll(".services-ui-add").forEach(function (btn) {

      btn.addEventListener("click", function () {

        const name = this.dataset.service;
        const price = Number(this.dataset.price);

        if (!name || !Number.isFinite(price)) return;

        if (cart[name]) {
          cart[name].quantity++;
        } else {
          cart[name] = {
            price: price,
            quantity: 1
          };
        }

        renderCart();
        openCart();

      });

    });

    function renderCart() {

      cartItems.innerHTML = "";

      let count = 0;
      let total = 0;

      Object.keys(cart).forEach(function (name) {

        const item = cart[name];

        count += item.quantity;
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "services-ui-cart-row";

        const info = document.createElement("div");
        info.className = "services-ui-cart-name";

        const title = document.createElement("div");
        title.textContent = name;

        const price = document.createElement("div");
        price.className = "services-ui-cart-price";
        price.textContent = "₹" + item.price;

        info.append(title, price);

        const quantity = document.createElement("div");
        quantity.className = "services-ui-quantity";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Decrease quantity");

        const number = document.createElement("span");
        number.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Increase quantity");

        minus.addEventListener("click", function () {
          item.quantity--;

          if (item.quantity <= 0) {
            delete cart[name];
          }

          renderCart();
        });

        plus.addEventListener("click", function () {
          item.quantity++;
          renderCart();
        });

        quantity.append(minus, number, plus);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "services-ui-remove";
        remove.textContent = "Remove";

        remove.addEventListener("click", function () {
          delete cart[name];
          renderCart();
        });

        row.append(info, quantity, remove);
        cartItems.appendChild(row);

      });

      if (count === 0) {
        const empty = document.createElement("div");
        empty.className = "services-ui-empty";

        const icon = document.createElement("i");
        icon.className = "fa fa-shopping-bag";

        const message = document.createElement("p");
        message.textContent = "Your cart is empty.";

        const sub = document.createElement("span");
        sub.textContent = "Add a service to get started.";

        empty.append(icon, message, sub);
        cartItems.appendChild(empty);
      }

      cartCount.textContent = count;
      cartTotal.textContent = "₹" + total;

    }

    function getEnquiryMessage() {

      const names = Object.keys(cart);

      if (!names.length) {
        alert("Please add a service to your cart first.");
        return null;
      }

      let message = "Hello Ishakala Studio,%0A%0AI would like to enquire about:%0A";

      let total = 0;

      names.forEach(function (name) {

        const item = cart[name];
        const subtotal = item.price * item.quantity;

        total += subtotal;

        message += "%0A" + encodeURIComponent(name) +
          " x " + item.quantity +
          " = Rs. " + subtotal;

      });

      message += "%0A%0ATotal: Rs. " + total;
      message += "%0A%0APlease share further details.";

      return message;
    }

    whatsapp.addEventListener("click", function () {

      const message = getEnquiryMessage();

      if (!message) return;

      window.open(
        "https://wa.me/917972432946?text=" + message,
        "_blank"
      );

    });

    email.addEventListener("click", function () {

      const message = getEnquiryMessage();

      if (!message) return;

      const body = decodeURIComponent(message.replace(/%0A/g, "\n"));

      const subject = encodeURIComponent("Ishakala Studio Service Enquiry");

      window.location.href =
        "mailto:ishakalastudio@gmail.com?subject=" +
        subject + "&body=" + encodeURIComponent(body);

    });

    renderCart();

    console.log("Ishakala Services Cart initialized.");

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServicesCart);
  } else {
    initServicesCart();
  }

})();

// // json file 
// async function loadServices() {
//   try {
//     const response = await fetch("services.json");

//     if (!response.ok) {
//       throw new Error("Unable to load services");
//     }

//     const services = await response.json();

//     const container = document.getElementById("servicesList");

//     container.innerHTML = "";

//     services.filter(service => service.active).forEach(service => {

//       const card = document.createElement("article");
//       card.className = "services-ui-card";

//       card.innerHTML = `
//         <div class="services-ui-number">
//           ${String(service.id).padStart(2, "0")}
//         </div>

//         <img src="${service.image}" alt="${service.name}">

//         <div class="services-ui-info">
//           <h3>${service.name}</h3>
//           <p>${service.description}</p>
//           <strong>₹${service.price}</strong>
//         </div>

//         <button class="services-ui-add"
//           data-service="${service.name}"
//           data-price="${service.price}">
//           + Add to Cart
//         </button>
//       `;

//       container.appendChild(card);
//     });

//   } catch (error) {
//     console.error("Services loading error:", error);
//   }
// }

async function loadServices() {
    const response = await fetch("services.json");

    if (!response.ok) {
        throw new Error("Services JSON could not load");
    }

    const services = await response.json();
    const container = document.getElementById("servicesList");

    container.innerHTML = "";

    services.filter(service => service.active).forEach(service => {
        const card = document.createElement("article");
        card.className = "services-ui-card";

        card.innerHTML = `
            <div class="services-ui-number">
                ${String(service.id).padStart(2, "0")}
            </div>
            <img src="${service.image}" alt="">
            <div class="services-ui-info">
                <h3></h3>
                <p></p>
                <strong></strong>
            </div>
            <button class="services-ui-add"
                data-service="${service.id}"
                data-price="${service.price}">
                + Add to Cart
            </button>
        `;

        card.querySelector("h3").textContent = service.name;
        card.querySelector("p").textContent = service.description;
        card.querySelector("strong").textContent = "₹" + service.price;

        container.appendChild(card);
    });

    // Initialize cart only after cards are loaded
    initServicesCart();
}

// fecth
/* =========================================
   ISHAKALA STUDIO - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.querySelector(".isha-menu-toggle");
    const navigation = document.querySelector(".isha-navigation");
    const navLinks = document.querySelectorAll(".isha-navigation a");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =====================================
       2. HERO SLIDER
    ===================================== */

    const slides = document.querySelectorAll(".isha-slide");
    const nextButton = document.querySelector(".isha-slider-next");
    const prevButton = document.querySelector(".isha-slider-prev");
    const dotsContainer = document.querySelector(".isha-slider-dots");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        if (!slides.length) return;

        slides.forEach(function (slide, i) {
            slide.classList.remove("active");
            slide.setAttribute("aria-hidden", "true");

            if (i === index) {
                slide.classList.add("active");
                slide.setAttribute("aria-hidden", "false");
            }
        });

        currentSlide = index;

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll("button");

            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentSlide);
                dot.setAttribute(
                    "aria-current",
                    i === currentSlide ? "true" : "false"
                );
            });
        }
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex =
            (currentSlide - 1 + slides.length) % slides.length;

        showSlide(prevIndex);
    }

    if (slides.length > 0) {

        // Create slider dots automatically
        if (dotsContainer) {
            dotsContainer.innerHTML = "";

            slides.forEach(function (_, index) {
                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "isha-slider-dot";
                dot.setAttribute("aria-label", "Go to slide " + (index + 1));

                dot.addEventListener("click", function () {
                    showSlide(index);
                    restartSlider();
                });

                dotsContainer.appendChild(dot);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                nextSlide();
                restartSlider();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                prevSlide();
                restartSlider();
            });
        }

        function startSlider() {
            if (slides.length > 1) {
                sliderInterval = setInterval(nextSlide, 3000);
            }
        }

        function stopSlider() {
            clearInterval(sliderInterval);
        }

        function restartSlider() {
            stopSlider();
            startSlider();
        }

        const hero = document.querySelector(".isha-hero");

        if (hero) {
            hero.addEventListener("mouseenter", stopSlider);
            hero.addEventListener("mouseleave", startSlider);
        }

        showSlide(0);
        startSlider();
    }


    /* =====================================
       3. SCROLL REVEAL ANIMATION
    ===================================== */

    const revealElements = document.querySelectorAll(".isha-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =====================================
       4. SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================
       5. HEADER SCROLL EFFECT
    ===================================== */

    const header = document.querySelector(".isha-header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* =====================================
       6. CURRENT YEAR
    ===================================== */

    const yearElements = document.querySelectorAll(".isha-current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================
       7. BACK TO TOP
    ===================================== */

    const backToTop = document.querySelector(".isha-back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {
            backToTop.classList.toggle("show", window.scrollY > 400);
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

    }

});

// gallery 

/* =========================================
   ISHAKALA GALLERY LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(
        ".gallery-v2-item img"
    );

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("galleryLightboxImage");

    if (!galleryItems.length || !lightbox || !lightboxImage) return;

    const images = Array.from(galleryItems);
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    images.forEach(function (image, index) {
        image.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    lightbox.querySelector(".gallery-v2-close")
        .addEventListener("click", closeLightbox);

    lightbox.querySelector(".gallery-v2-prev")
        .addEventListener("click", function () {
            showImage(currentIndex - 1);
        });

    lightbox.querySelector(".gallery-v2-next")
        .addEventListener("click", function () {
            showImage(currentIndex + 1);
        });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);

    });

});
// product add to cart

/* =========================================
   ISHAKALA ADD TO CART - FIXED VERSION
========================================= */

(function () {

    function initIshakalaCart() {

        const cart = {};

        const cartItems = document.getElementById("cartItems");
        const cartCount = document.getElementById("cartCount");
        const cartTotal = document.getElementById("cartTotal");

        const whatsappButton = document.getElementById("whatsappEnquiry");
        const emailButton = document.getElementById("emailEnquiry");

        const addButtons = document.querySelectorAll(".services-v2-cart-btn");

        console.log("Ishakala Cart Initialized");
        console.log("Add buttons found:", addButtons.length);

        if (!cartItems || !cartCount || !cartTotal) {
            console.error("Cart HTML elements not found!");
            return;
        }

        if (!addButtons.length) {
            console.error("Add to Cart buttons not found!");
            return;
        }


        function updateCart() {

            cartItems.innerHTML = "";

            let total = 0;
            let quantityTotal = 0;

            Object.keys(cart).forEach(function (name) {

                const item = cart[name];
                const subtotal = item.price * item.quantity;

                total += subtotal;
                quantityTotal += item.quantity;

                const row = document.createElement("div");
                row.className = "services-v2-cart-row";

                const nameElement = document.createElement("div");
                nameElement.className = "services-v2-cart-name";
                nameElement.textContent = name;

                const priceElement = document.createElement("div");
                priceElement.className = "services-v2-cart-price";
                priceElement.textContent = "₹" + subtotal;

                const quantityElement = document.createElement("div");
                quantityElement.className = "services-v2-quantity";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.textContent = "−";

                const quantity = document.createElement("span");
                quantity.textContent = item.quantity;

                const plus = document.createElement("button");
                plus.type = "button";
                plus.textContent = "+";

                minus.addEventListener("click", function () {
                    item.quantity--;

                    if (item.quantity <= 0) {
                        delete cart[name];
                    }

                    updateCart();
                });

                plus.addEventListener("click", function () {
                    item.quantity++;
                    updateCart();
                });

                quantityElement.append(minus, quantity, plus);

                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "services-v2-remove";
                remove.textContent = "Remove";

                remove.addEventListener("click", function () {
                    delete cart[name];
                    updateCart();
                });

                row.append(
                    nameElement,
                    priceElement,
                    quantityElement,
                    remove
                );

                cartItems.appendChild(row);

            });


            if (quantityTotal === 0) {
                cartItems.innerHTML =
                    '<p class="services-v2-empty">Your cart is empty. Add a service to get started!</p>';
            }

            cartCount.textContent = quantityTotal;
            cartTotal.textContent = "₹" + total;

            if (whatsappButton) {
                whatsappButton.disabled = quantityTotal === 0;
            }

            if (emailButton) {
                emailButton.disabled = quantityTotal === 0;
            }

        }


        // ADD TO CART

        addButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const name = button.getAttribute("data-service");
                const price = Number(button.getAttribute("data-price"));

                if (!name || !Number.isFinite(price)) {
                    console.error("Invalid service details", name, price);
                    return;
                }

                if (cart[name]) {
                    cart[name].quantity++;
                } else {
                    cart[name] = {
                        price: price,
                        quantity: 1
                    };
                }

                updateCart();

                button.textContent = "✓ Added to Cart";

                setTimeout(function () {
                    button.innerHTML = "<span>+</span> Add to Cart";
                }, 1000);

            });

        });


        // CREATE MESSAGE

        function createMessage() {

            let message = "Hello Ishakala Studio,\n\nI would like to enquire about these services:\n\n";
            let total = 0;

            Object.keys(cart).forEach(function (name, index) {

                const item = cart[name];
                const subtotal = item.price * item.quantity;

                total += subtotal;

                message += (index + 1) + ". " + name + "\n";
                message += "Quantity: " + item.quantity + "\n";
                message += "Price: ₹" + item.price + "\n";
                message += "Subtotal: ₹" + subtotal + "\n\n";

            });

            message += "Total Amount: ₹" + total;
            message += "\n\nPlease share more details. Thank you!";

            return message;

        }


        // WHATSAPP

        if (whatsappButton) {

            whatsappButton.addEventListener("click", function () {

                if (Object.keys(cart).length === 0) return;

                const url = "https://wa.me/917972432946?text=" +
                    encodeURIComponent(createMessage());

                window.open(url, "_blank");

            });

        }


        // EMAIL

        if (emailButton) {

            emailButton.addEventListener("click", function () {

                if (Object.keys(cart).length === 0) return;

                const url = "mailto:ishakalastudio@gmail.com" +
                    "?subject=" + encodeURIComponent("Service Enquiry - Ishakala Studio") +
                    "&body=" + encodeURIComponent(createMessage());

                window.location.href = url;

            });

        }


        updateCart();

    }


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initIshakalaCart);
    } else {
        initIshakalaCart();
    }

})();


// another ui : add to cart col wise : test.html

// (function () {

//   function initServicesCart() {

//     const cart = {};

//     const trigger = document.getElementById("servicesCartTrigger");
//     const drawer = document.getElementById("servicesCartDrawer");
//     const overlay = document.getElementById("servicesCartOverlay");
//     const close = document.getElementById("servicesCartClose");

//     const cartItems = document.getElementById("servicesCartItems");
//     const cartCount = document.getElementById("servicesCartCount");
//     const cartTotal = document.getElementById("servicesCartTotal");

//     const whatsapp = document.getElementById("servicesWhatsApp");
//     const email = document.getElementById("servicesEmail");

//     if (!trigger || !drawer || !overlay || !cartItems) {
//       return;
//     }

//     function openCart() {
//       drawer.classList.add("active");
//       overlay.classList.add("active");
//       document.body.style.overflow = "hidden";
//     }

//     function closeCart() {
//       drawer.classList.remove("active");
//       overlay.classList.remove("active");
//       document.body.style.overflow = "";
//     }

//     trigger.addEventListener("click", openCart);
//     close.addEventListener("click", closeCart);
//     overlay.addEventListener("click", closeCart);

//     document.addEventListener("keydown", function (e) {
//       if (e.key === "Escape") closeCart();
//     });

//     document.querySelectorAll(".services-ui-add").forEach(function (btn) {

//       btn.addEventListener("click", function () {

//         const name = this.dataset.service;
//         const price = Number(this.dataset.price);

//         if (!name || !Number.isFinite(price)) return;

//         if (cart[name]) {
//           cart[name].quantity++;
//         } else {
//           cart[name] = {
//             price: price,
//             quantity: 1
//           };
//         }

//         renderCart();
//         openCart();

//       });

//     });

//     function renderCart() {

//       cartItems.innerHTML = "";

//       let count = 0;
//       let total = 0;

//       Object.keys(cart).forEach(function (name) {

//         const item = cart[name];

//         count += item.quantity;
//         total += item.price * item.quantity;

//         const row = document.createElement("div");
//         row.className = "services-ui-cart-row";

//         const info = document.createElement("div");
//         info.className = "services-ui-cart-name";

//         const title = document.createElement("div");
//         title.textContent = name;

//         const price = document.createElement("div");
//         price.className = "services-ui-cart-price";
//         price.textContent = "₹" + item.price;

//         info.append(title, price);

//         const quantity = document.createElement("div");
//         quantity.className = "services-ui-quantity";

//         const minus = document.createElement("button");
//         minus.type = "button";
//         minus.textContent = "−";
//         minus.setAttribute("aria-label", "Decrease quantity");

//         const number = document.createElement("span");
//         number.textContent = item.quantity;

//         const plus = document.createElement("button");
//         plus.type = "button";
//         plus.textContent = "+";
//         plus.setAttribute("aria-label", "Increase quantity");

//         minus.addEventListener("click", function () {
//           item.quantity--;

//           if (item.quantity <= 0) {
//             delete cart[name];
//           }

//           renderCart();
//         });

//         plus.addEventListener("click", function () {
//           item.quantity++;
//           renderCart();
//         });

//         quantity.append(minus, number, plus);

//         const remove = document.createElement("button");
//         remove.type = "button";
//         remove.className = "services-ui-remove";
//         remove.textContent = "Remove";

//         remove.addEventListener("click", function () {
//           delete cart[name];
//           renderCart();
//         });

//         row.append(info, quantity, remove);
//         cartItems.appendChild(row);

//       });

//       if (count === 0) {
//         const empty = document.createElement("div");
//         empty.className = "services-ui-empty";

//         const icon = document.createElement("i");
//         icon.className = "fa fa-shopping-bag";

//         const message = document.createElement("p");
//         message.textContent = "Your cart is empty.";

//         const sub = document.createElement("span");
//         sub.textContent = "Add a service to get started.";

//         empty.append(icon, message, sub);
//         cartItems.appendChild(empty);
//       }

//       cartCount.textContent = count;
//       cartTotal.textContent = "₹" + total;

//     }

//     function getEnquiryMessage() {

//       const names = Object.keys(cart);

//       if (!names.length) {
//         alert("Please add a service to your cart first.");
//         return null;
//       }

//       let message = "Hello Ishakala Studio,%0A%0AI would like to enquire about:%0A";

//       let total = 0;

//       names.forEach(function (name) {

//         const item = cart[name];
//         const subtotal = item.price * item.quantity;

//         total += subtotal;

//         message += "%0A" + encodeURIComponent(name) +
//           " x " + item.quantity +
//           " = Rs. " + subtotal;

//       });

//       message += "%0A%0ATotal: Rs. " + total;
//       message += "%0A%0APlease share further details.";

//       return message;
//     }

//     whatsapp.addEventListener("click", function () {

//       const message = getEnquiryMessage();

//       if (!message) return;

//       window.open(
//         "https://wa.me/917972432946?text=" + message,
//         "_blank"
//       );

//     });

//     email.addEventListener("click", function () {

//       const message = getEnquiryMessage();

//       if (!message) return;

//       const body = decodeURIComponent(message.replace(/%0A/g, "\n"));

//       const subject = encodeURIComponent("Ishakala Studio Service Enquiry");

//       window.location.href =
//         "mailto:ishakalastudio@gmail.com?subject=" +
//         subject + "&body=" + encodeURIComponent(body);

//     });

//     renderCart();

//     console.log("Ishakala Services Cart initialized.");

//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", initServicesCart);
//   } else {
//     initServicesCart();
//   }

// })();

// // // json file 
// // async function loadServices() {
// //   try {
// //     const response = await fetch("services.json");

// //     if (!response.ok) {
// //       throw new Error("Unable to load services");
// //     }

// //     const services = await response.json();

// //     const container = document.getElementById("servicesList");

// //     container.innerHTML = "";

// //     services.filter(service => service.active).forEach(service => {

// //       const card = document.createElement("article");
// //       card.className = "services-ui-card";

// //       card.innerHTML = `
// //         <div class="services-ui-number">
// //           ${String(service.id).padStart(2, "0")}
// //         </div>

// //         <img src="${service.image}" alt="${service.name}">

// //         <div class="services-ui-info">
// //           <h3>${service.name}</h3>
// //           <p>${service.description}</p>
// //           <strong>₹${service.price}</strong>
// //         </div>

// //         <button class="services-ui-add"
// //           data-service="${service.name}"
// //           data-price="${service.price}">
// //           + Add to Cart
// //         </button>
// //       `;

// //       container.appendChild(card);
// //     });

// //   } catch (error) {
// //     console.error("Services loading error:", error);
// //   }
// // }

// async function loadServices() {
//     const response = await fetch("services.json");

//     if (!response.ok) {
//         throw new Error("Services JSON could not load");
//     }

//     const services = await response.json();
//     const container = document.getElementById("servicesList");

//     container.innerHTML = "";

//     services.filter(service => service.active).forEach(service => {
//         const card = document.createElement("article");
//         card.className = "services-ui-card";

//         card.innerHTML = `
//             <div class="services-ui-number">
//                 ${String(service.id).padStart(2, "0")}
//             </div>
//             <img src="${service.image}" alt="">
//             <div class="services-ui-info">
//                 <h3></h3>
//                 <p></p>
//                 <strong></strong>
//             </div>
//             <button class="services-ui-add"
//                 data-service="${service.id}"
//                 data-price="${service.price}">
//                 + Add to Cart
//             </button>
//         `;

//         card.querySelector("h3").textContent = service.name;
//         card.querySelector("p").textContent = service.description;
//         card.querySelector("strong").textContent = "₹" + service.price;

//         container.appendChild(card);
//     });

//     // Initialize cart only after cards are loaded
//     initServicesCart();
// }

// // fecth
// async function loadServices() {
//     const container = document.getElementById("servicesList");

//     try {
//         const response = await fetch("./services.json");

//         if (!response.ok) {
//             throw new Error("JSON file not found: " + response.status);
//         }

//         const services = await response.json();

//         container.innerHTML = "";

//         services
//             .filter(service => service.active)
//             .forEach((service, index) => {

//                 const card = document.createElement("article");
//                 card.className = "services-ui-card";

//                 card.innerHTML = `
//                     <div class="services-ui-number">
//                         ${String(index + 1).padStart(2, "0")}
//                     </div>

//                     <img src="${service.image}" alt="">

//                     <div class="services-ui-info">
//                         <h3></h3>
//                         <p></p>
//                         <strong></strong>
//                     </div>

//                     <button class="services-ui-add"
//                         data-service="${service.id}"
//                         data-price="${service.price}">
//                         + Add to Cart
//                     </button>
//                 `;

//                 card.querySelector("h3").textContent = service.name;
//                 card.querySelector("p").textContent = service.description;
//                 card.querySelector("strong").textContent = "₹" + service.price;

//                 container.appendChild(card);
//             });

//         initServicesCart();
// } catch (error) {
//     console.error("Services fetch error:", error);
//     console.error("Error details:", error.message);

//     container.textContent = "Unable to load services.";
// }
// }

// if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", loadServices);
// } else {
//     loadServices();
// }


(function () {

    const cart = {};

    function initServicesCart() {
        const trigger = document.getElementById("servicesCartTrigger");
        const drawer = document.getElementById("servicesCartDrawer");
        const overlay = document.getElementById("servicesCartOverlay");
        const close = document.getElementById("servicesCartClose");

        const cartItems = document.getElementById("servicesCartItems");
        const cartCount = document.getElementById("servicesCartCount");
        const cartTotal = document.getElementById("servicesCartTotal");

        const whatsapp = document.getElementById("servicesWhatsApp");
        const email = document.getElementById("servicesEmail");

        if (!trigger || !drawer || !overlay || !cartItems ||
            !cartCount || !cartTotal || !close || !whatsapp || !email) {
            console.error("Cart HTML elements missing.");
            return;
        }

        function openCart() {
            drawer.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeCart() {
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }

        trigger.addEventListener("click", openCart);
        close.addEventListener("click", closeCart);
        overlay.addEventListener("click", closeCart);

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeCart();
        });

        // Event delegation: dynamically loaded cards also work
        const servicesList = document.getElementById("servicesList");

        servicesList.addEventListener("click", function (e) {
            const btn = e.target.closest(".services-ui-add");
            if (!btn) return;

            const name = btn.dataset.service;
            const price = Number(btn.dataset.price);

            if (!name || !Number.isFinite(price)) return;

            if (cart[name]) {
                cart[name].quantity++;
            } else {
                cart[name] = { price, quantity: 1 };
            }

            renderCart();
            openCart();
        });

        function renderCart() {
            cartItems.innerHTML = "";

            let count = 0;
            let total = 0;

            Object.keys(cart).forEach(function (name) {
                const item = cart[name];

                count += item.quantity;
                total += item.price * item.quantity;

                const row = document.createElement("div");
                row.className = "services-ui-cart-row";

                const info = document.createElement("div");
                info.className = "services-ui-cart-name";

                const title = document.createElement("div");
                title.textContent = name;

                const price = document.createElement("div");
                price.className = "services-ui-cart-price";
                price.textContent = "₹" + item.price;

                info.append(title, price);

                const quantity = document.createElement("div");
                quantity.className = "services-ui-quantity";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.textContent = "−";

                const number = document.createElement("span");
                number.textContent = item.quantity;

                const plus = document.createElement("button");
                plus.type = "button";
                plus.textContent = "+";

                minus.addEventListener("click", function () {
                    item.quantity--;
                    if (item.quantity <= 0) delete cart[name];
                    renderCart();
                });

                plus.addEventListener("click", function () {
                    item.quantity++;
                    renderCart();
                });

                quantity.append(minus, number, plus);

                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "services-ui-remove";
                remove.textContent = "Remove";

                remove.addEventListener("click", function () {
                    delete cart[name];
                    renderCart();
                });

                row.append(info, quantity, remove);
                cartItems.appendChild(row);
            });

            if (count === 0) {
                const empty = document.createElement("div");
                empty.className = "services-ui-empty";
                empty.textContent = "Your cart is empty. Add a service to get started.";
                cartItems.appendChild(empty);
            }

            cartCount.textContent = count;
            cartTotal.textContent = "₹" + total;
        }

        function getEnquiryMessage() {
            const names = Object.keys(cart);

            if (!names.length) {
                alert("Please add a service to your cart first.");
                return null;
            }

            let message = "Hello Ishakala Studio,\n\nI would like to enquire about:\n";
            let total = 0;

            names.forEach(function (name) {
                const item = cart[name];
                const subtotal = item.price * item.quantity;
                total += subtotal;

                message += "\n" + name + " x " + item.quantity +
                    " = Rs. " + subtotal;
            });

            message += "\n\nTotal: Rs. " + total;
            message += "\n\nPlease share further details.";

            return message;
        }

        whatsapp.addEventListener("click", function () {
            const message = getEnquiryMessage();
            if (!message) return;

            window.open(
                "https://wa.me/917972432946?text=" + encodeURIComponent(message),
                "_blank"
            );
        });

        email.addEventListener("click", function () {
            const message = getEnquiryMessage();
            if (!message) return;

            window.location.href =
                "mailto:ishakalastudio@gmail.com?subject=" +
                encodeURIComponent("Ishakala Studio Service Enquiry") +
                "&body=" + encodeURIComponent(message);
        });

        renderCart();
        console.log("Ishakala Cart initialized.");
    }

    async function loadServices() {
        const container = document.getElementById("servicesList");

        if (!container) {
            console.error("servicesList element not found.");
            return;
        }

        try {
            const response = await fetch("./services.json");

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const services = await response.json();

            if (!Array.isArray(services)) {
                throw new Error("services.json must contain an array.");
            }

            container.innerHTML = "";

            services.filter(service => service.active).forEach(function (service, index) {
                const card = document.createElement("article");
                card.className = "services-ui-card";

                const number = document.createElement("div");
                number.className = "services-ui-number";
                number.textContent = String(index + 1).padStart(2, "0");

                const img = document.createElement("img");
                img.src = service.image;
                img.alt = service.name || "Ishakala service";

                const info = document.createElement("div");
                info.className = "services-ui-info";

                const heading = document.createElement("h3");
                heading.textContent = service.name;

                const description = document.createElement("p");
                description.textContent = service.description;

                const price = document.createElement("strong");
                price.textContent = "₹" + service.price;

                info.append(heading, description, price);

                const button = document.createElement("button");
                button.type = "button";
                button.className = "services-ui-add";
                button.dataset.service = service.name;
                button.dataset.price = service.price;
                button.textContent = "+ Add to Cart";

                card.append(number, img, info, button);
                container.appendChild(card);
            });

            if (!container.children.length) {
                container.textContent = "No services available.";
            }

            initServicesCart();

            console.log("Services loaded:", services.length);

        } catch (error) {
            console.error("Services loading error:", error);
            container.textContent = "Unable to load services. Please try again.";
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadServices);
    } else {
        loadServices();
    }

})();


// 

document.addEventListener("DOMContentLoaded", function () {

    // LOAD HEADER
    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Header not found");
            }
            return response.text();
        })
        .then(data => {

            const headerPlaceholder = document.getElementById("header-placeholder");

            if (!headerPlaceholder) return;

            headerPlaceholder.innerHTML = data;

            // MOBILE MENU
            const menuToggle = document.getElementById("menuToggle");
            const navigation = document.getElementById("mainNavigation");

            if (menuToggle && navigation) {

                menuToggle.addEventListener("click", function () {

                    const isOpen = navigation.classList.toggle("open");

                    menuToggle.setAttribute("aria-expanded", isOpen);

                });

                navigation.querySelectorAll("a").forEach(link => {
                    link.addEventListener("click", function () {
                        navigation.classList.remove("open");
                        menuToggle.setAttribute("aria-expanded", "false");
                    });
                });
            }

        })
        .catch(error => console.error("Header Error:", error));


    // LOAD FOOTER
    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer not found");
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById("footer-placeholder");

            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error("Footer Error:", error));

});

// toggle
