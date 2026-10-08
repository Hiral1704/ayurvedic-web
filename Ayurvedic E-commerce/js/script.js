// Add To Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCounter = document.getElementById("cart-count");

cartCounter.innerHTML = cart.length;

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        const name = card.querySelector("h3").innerText;

        const price = card.querySelector("h4").innerText.replace("₹", "");

        cart.push({
            name: name,
            price: price
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        cartCounter.innerHTML = cart.length;

        alert("✅ Product Added To Cart");

    });

});

// Search Icon

const searchIcon = document.querySelector(".fa-search");

searchIcon.addEventListener("click", () => {

    let product = prompt("🔍 Search Product");

    if (product != "" && product != null) {

        alert("Searching for : " + product);

    }

});

// Newsletter

const subscribeBtn = document.querySelector(".newsletter button");

subscribeBtn.addEventListener("click", () => {

    let email = document.querySelector(".newsletter input").value;

    if (email == "") {

        alert("Please Enter Email");

    }

    else {

        alert("🎉 Thank You For Subscribing!");

        document.querySelector(".newsletter input").value = "";

    }

});

// Smooth Scroll


document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});

// Hero Button

const heroBtn = document.querySelector(".hero button");

heroBtn.addEventListener("click", () => {

    document.querySelector(".products").scrollIntoView({

        behavior: "smooth"

    });

});

// Login Button


const loginBtn = document.querySelector(".icons button");

loginBtn.addEventListener("click", () => {

    alert("Login Page Coming Soon!");

});

// Product Hover Effect


const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0px 15px 30px rgba(0,0,0,0.2)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "0px 5px 15px rgba(0,0,0,0.1)";

    });

});

// Sticky Header Shadow


window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";

    } else {

        header.style.boxShadow = "none";

    }

});

// Console Message

console.log("🌿 Organic Ayurveda Website Loaded Successfully!");