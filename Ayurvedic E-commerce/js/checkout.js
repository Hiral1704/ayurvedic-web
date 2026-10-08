let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
// ==============================
// CHECKOUT PAGE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    loadOrderSummary();

    const placeOrderBtn = document.getElementById("place-order-btn");

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", placeOrder);
    }

});


// ==============================
// LOAD ORDER SUMMARY
// ==============================

function loadOrderSummary() {

    const summary = document.querySelector(".order-summary");

    if (!summary) return;

    // Old items remove
    summary.querySelectorAll(".summary-item.dynamic").forEach(item => item.remove());

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "summary-item dynamic";

        div.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;

        summary.insertBefore(div, summary.querySelector("hr"));

    });

    const delivery = cart.length > 0 ? 50 : 0;

    document.getElementById("grand-total").innerText =
        `₹${subtotal + delivery}`;

}


// ==============================
// PLACE ORDER
// ==============================

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    // ==========================
    // VALIDATION
    // ==========================

    if (
        !name ||
        !email ||
        !mobile ||
        !address ||
        !city ||
        !state ||
        !pincode
    ) {

        alert("Please fill all fields.");

        return;
    }

    if (mobile.length !== 10) {

        alert("Enter valid mobile number.");

        return;
    }

    // ==========================
    // TOTAL
    // ==========================

    const subtotal = cart.reduce((sum, item) => {

        return sum + item.price * item.quantity;

    }, 0);

    const total = subtotal + 50;

    // ==========================
    // CREATE ORDER
    // ==========================

    const order = {

        id: "ORD" + Date.now(),

        date: new Date().toLocaleDateString(),

        customer: {

            name,
            email,
            mobile,
            address,
            city,
            state,
            pincode

        },

        payment,

        products: [...cart],

        total,

        status: "Pending"

    };

    // ==========================
    // SAVE ORDER
    // ==========================

    orders.push(order);

    saveOrders();

    // ==========================
    // CLEAR CART
    // ==========================

    cart = [];

    saveCart();

    // ==========================
    // SUCCESS
    // ==========================

    alert("🎉 Order Placed Successfully!");

    window.location.href = "orders.html";

}