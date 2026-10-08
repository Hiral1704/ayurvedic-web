// ==============================
// CART PAGE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    // Continue Shopping Button
    const continueBtn = document.querySelector(".continue-btn");

    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            window.location.href = "products.html";
        });
    }

    // Checkout Button
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {

            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            window.location.href = "checkout.html";
        });
    }

});
//
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

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    loadCart();
}

function changeQuantity(id, value) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += value;

    if (product.quantity <= 0) {

        removeFromCart(id);
        return;
    }

    saveCart();

    loadCart();
}

function getCartTotal() {

    return cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
}


// ==============================
// LOAD CART
// ==============================

function loadCart() {

    const tbody = document.getElementById("cart-items");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (cart.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding:40px;text-align:center;">
                    <h2>Your Cart is Empty</h2>
                    <p>Add some products to continue shopping.</p>
                </td>
            </tr>
        `;

        updateSummary();

        return;
    }

    cart.forEach(item => {

        tbody.innerHTML += `
            <tr>

                <td>
                    <div class="product-info">

                        <img src="${item.image}" alt="${item.name}">

                        <span>${item.name}</span>

                    </div>
                </td>

                <td>₹${item.price}</td>

                <td>

                    <button class="qty-btn"
                        onclick="changeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span class="qty">
                        ${item.quantity}
                    </span>

                    <button class="qty-btn"
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </td>

                <td>
                    ₹${item.price * item.quantity}
                </td>

                <td>

                    <button class="remove-btn"
                        onclick="removeFromCart(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

    updateSummary();
}


// ==============================
// SUMMARY
// ==============================

function updateSummary() {

    const subtotal = getCartTotal();

    const delivery = cart.length > 0 ? 50 : 0;

    const grandTotal = subtotal + delivery;

    const subtotalEl = document.getElementById("subtotal");
    const deliveryEl = document.getElementById("delivery-charge");
    const totalEl = document.getElementById("grand-total");

    if (subtotalEl) {
        subtotalEl.innerText = `₹${subtotal}`;
    }

    if (deliveryEl) {
        deliveryEl.innerText = `₹${delivery}`;
    }

    if (totalEl) {
        totalEl.innerText = `₹${grandTotal}`;
    }

    updateCartCount();
}