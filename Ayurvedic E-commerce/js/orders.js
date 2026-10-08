// ==============================
// ORDERS PAGE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

});
//
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}


// ==============================
// LOAD ORDERS
// ==============================

function loadOrders() {

    const tbody = document.getElementById("orders-body");
    const empty = document.getElementById("empty-orders");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (orders.length === 0) {

        tbody.style.display = "none";
        empty.style.display = "block";

        document.getElementById("total-orders").innerText = 0;
        document.getElementById("completed-orders").innerText = 0;
        document.getElementById("pending-orders").innerText = 0;

        return;
    }

    tbody.style.display = "";
    empty.style.display = "none";

    let completed = 0;
    let pending = 0;

    orders.forEach((order, index) => {

        if (order.status === "Delivered") {
            completed++;
        } else {
            pending++;
        }

        tbody.innerHTML += `
            <tr>

                <td>${order.id}</td>

                <td>${order.date}</td>

                <td>${order.customer.name}</td>

                <td>${order.payment}</td>

                <td>₹${order.total}</td>

                <td>
                    <span class="status ${order.status.toLowerCase()}">
                        ${order.status}
                    </span>
                </td>

                <td>
                    <button class="view-btn"
                        onclick="viewOrder(${index})">
                        View
                    </button>
                </td>

            </tr>
        `;

    });

    document.getElementById("total-orders").innerText = orders.length;
    document.getElementById("completed-orders").innerText = completed;
    document.getElementById("pending-orders").innerText = pending;

    updateCartCount();
}


// ==============================
// VIEW ORDER
// ==============================

function viewOrder(index) {

    const order = orders[index];

    let products = "";

    order.products.forEach(item => {

        products += `
${item.name}
Quantity : ${item.quantity}
Price : ₹${item.price * item.quantity}

`;

    });

    alert(
        `Order ID : ${order.id}

Customer : ${order.customer.name}

Mobile : ${order.customer.mobile}

Email : ${order.customer.email}

Address :
${order.customer.address},
${order.customer.city},
${order.customer.state} - ${order.customer.pincode}

Payment : ${order.payment}

Status : ${order.status}

----------------------------

Products

${products}

----------------------------

Grand Total : ₹${order.total}`
    );

}