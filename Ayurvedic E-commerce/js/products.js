// ==============================
// PRODUCTS PAGE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const priceSelect = document.getElementById("price");

    // ==========================
    // ADD TO CART
    // ==========================

    cards.forEach(card => {

        const btn = card.querySelector(".cart-btn");

        if (!btn) return;

        btn.addEventListener("click", () => {

            const name = card.querySelector("h3").innerText;

            const image = card.querySelector("img").getAttribute("src");

            const priceText = card.querySelector("h4").innerText;

            const price = Number(priceText.replace("₹", "").trim());

            addToCart(name, price, image);

        });

    });

    // ==========================
    // SEARCH + FILTER
    // ==========================

    function filterProducts() {

        const search = searchInput.value.toLowerCase();

        const category = categorySelect.value;

        const price = priceSelect.value;

        cards.forEach(card => {

            const name = card.querySelector("h3").innerText.toLowerCase();

            const cardCategory = card.dataset.category || "";

            const amount = Number(
                card.querySelector("h4").innerText.replace("₹", "")
            );

            let show = true;

            // Search

            if (!name.includes(search)) {

                show = false;

            }

            // Category

            if (category !== "all" && cardCategory !== category) {

                show = false;

            }

            // Price

            if (price === "0-200" && !(amount >= 0 && amount <= 200)) {

                show = false;

            }

            if (price === "201-500" && !(amount >= 201 && amount <= 500)) {

                show = false;

            }

            if (price === "501+" && !(amount >= 501)) {

                show = false;

            }

            card.style.display = show ? "block" : "none";

        });

    }

    // ==========================
    // EVENTS
    // ==========================

    searchInput.addEventListener("keyup", filterProducts);

    categorySelect.addEventListener("change", filterProducts);

    priceSelect.addEventListener("change", filterProducts);

    updateCartCount();

});
//cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = document.querySelectorAll("#cart-count");

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    count.forEach(c => {
        c.innerText = total;
    });
}

function addToCart(name, price, image) {

    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            image,
            quantity: 1
        });
    }

    saveCart();
    alert(name + " added to cart.");
}

updateCartCount();