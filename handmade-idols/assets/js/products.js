
document.addEventListener("DOMContentLoaded", function () {

    const productsList = document.getElementById("productsList");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const whatsappBtn = document.getElementById("whatsappEnquiry");
    const emailBtn = document.getElementById("emailEnquiry");

    const cart = {};

    // LOAD PRODUCTS FROM JSON
    async function loadProducts() {

        try {

            const response = await fetch("./products.json");

            if (!response.ok) {
                throw new Error("Products JSON not found: " + response.status);
            }

            const products = await response.json();

            if (!Array.isArray(products)) {
                throw new Error("Invalid products JSON format.");
            }

            productsList.innerHTML = "";

            products.filter(product => product.active).forEach(function (product) {

                const card = document.createElement("div");
                card.className = "services-v2-card";

                const imageWrap = document.createElement("div");
                imageWrap.className = "services-v2-image";

                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.name;
                image.loading = "lazy";

                imageWrap.appendChild(image);

                const content = document.createElement("div");
                content.className = "services-v2-content";

                const title = document.createElement("h3");
                title.textContent = product.name;

                const description = document.createElement("p");
                description.textContent = product.description;

                const price = document.createElement("div");
                price.className = "services-v2-price";
                price.textContent = "₹" + product.price;

                const addButton = document.createElement("button");
                addButton.type = "button";
                addButton.className = "services-v2-cart-btn";
                addButton.dataset.id = product.id;
                addButton.textContent = "+ Add to Cart";

                content.append(title, description, price, addButton);

                if (product.formLink) {

                    const registerLink = document.createElement("a");

                    registerLink.className = "services-v2-extra-link";
                    registerLink.href = product.formLink;
                    registerLink.target = "_blank";
                    registerLink.rel = "noopener";
                    registerLink.textContent = "Register for Classes";

                    content.appendChild(registerLink);
                }

                card.append(imageWrap, content);

                productsList.appendChild(card);

            });

            renderCart();

            console.log("Products loaded successfully.");

        } catch (error) {

            console.error("Products loading error:", error);

            productsList.textContent =
                "Unable to load products. Please try again.";

        }

    }


    // ADD TO CART
    productsList.addEventListener("click", function (event) {

        const button = event.target.closest(".services-v2-cart-btn");

        if (!button) return;

        const productId = button.dataset.id;

        const product = productsCache.find(
            item => String(item.id) === productId
        );

        if (!product) return;

        if (cart[productId]) {

            cart[productId].quantity++;

        } else {

            cart[productId] = {
                name: product.name,
                price: Number(product.price),
                quantity: 1
            };

        }

        renderCart();

    });


    let productsCache = [];


    // RENDER CART
    function renderCart() {

        cartItems.innerHTML = "";

        let count = 0;
        let total = 0;

        Object.keys(cart).forEach(function (id) {

            const item = cart[id];

            count += item.quantity;
            total += item.price * item.quantity;

            const row = document.createElement("div");
            row.className = "services-v2-cart-row";

            const info = document.createElement("div");
            info.textContent =
                item.name + " - ₹" + item.price;

            const quantity = document.createElement("div");
            quantity.className = "services-v2-quantity";

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

                if (item.quantity <= 0) {
                    delete cart[id];
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
            remove.className = "services-v2-remove";
            remove.textContent = "Remove";

            remove.addEventListener("click", function () {

                delete cart[id];

                renderCart();

            });

            row.append(info, quantity, remove);

            cartItems.appendChild(row);

        });


        if (count === 0) {

            const empty = document.createElement("p");

            empty.className = "services-v2-empty";
            empty.textContent =
                "Your cart is empty. Add a product to get started!";

            cartItems.appendChild(empty);

        }

        cartCount.textContent = count;
        cartTotal.textContent = "₹" + total;

        whatsappBtn.disabled = count === 0;
        emailBtn.disabled = count === 0;

    }


    // ENQUIRY MESSAGE
    function getEnquiryMessage() {

        const names = Object.keys(cart);

        if (names.length === 0) {
            alert("Please add a product to your cart first.");
            return null;
        }

        let message =
            "Hello Ishakala Studio,\n\nI would like to enquire about:\n";

        let total = 0;

        names.forEach(function (id) {

            const item = cart[id];

            const subtotal = item.price * item.quantity;

            total += subtotal;

            message +=
                "\n" + item.name +
                " x " + item.quantity +
                " = Rs. " + subtotal;

        });

        message += "\n\nTotal: Rs. " + total;
        message += "\n\nPlease share further details.";

        return message;

    }


    // WHATSAPP ENQUIRY
    whatsappBtn.addEventListener("click", function () {

        const message = getEnquiryMessage();

        if (!message) return;

        window.open(
            "https://wa.me/917972432946?text=" +
            encodeURIComponent(message),
            "_blank"
        );

    });


    // EMAIL ENQUIRY
    emailBtn.addEventListener("click", function () {

        const message = getEnquiryMessage();

        if (!message) return;

        window.location.href =
            "mailto:ishakalastudio@gmail.com?subject=" +
            encodeURIComponent("Ishakala Studio Product Enquiry") +
            "&body=" + encodeURIComponent(message);

    });


    // INITIALIZE
    async function initializeProducts() {

        try {

            const response = await fetch("./products.json");

            if (!response.ok) {
                throw new Error("Products JSON not found.");
            }

            productsCache = await response.json();

            await loadProducts();

        } catch (error) {

            console.error(error);

            productsList.textContent =
                "Unable to load products. Please try again.";

        }

    }

    initializeProducts();

});
