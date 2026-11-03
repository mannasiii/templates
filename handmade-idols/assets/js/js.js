
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
