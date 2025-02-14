console.log("Cart Page");

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const output = document.querySelector("#output");
const totalPriceElement = document.getElementById("totalPrice");

if (cartItems.length === 0) {
    output.innerHTML = "<h3>Your cart is empty</h3>";
    totalPriceElement.innerText = "0";
} else {
    let totalPrice = 0;

    // Display cart items
    cartItems.forEach(item => {
        output.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${item.brand} ${item.model}</h5>
                    <p class="card-text">RAM: ${item.ram}GB | ROM: ${item.rom}GB</p>
                    <p class="card-text">Camera: ${item.camera}</p>
                    <p class="card-text">Price: $${item.price}</p>
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <p class="card-text"><strong>Total: $${item.price * item.quantity}</strong></p>
                </div>
            </div>
        `;
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.innerText = totalPrice;
}

// Clear cart function
function clearCart() {
    localStorage.removeItem("cart");
    location.reload(); // Refresh the page
}

// Complete the order function
function completeOrder() {
    const address = document.getElementById("address").value;
    if (!address) {
        Swal.fire({
            title: "Missing Address",
            text: "Please enter a shipping address to complete the order.",
            icon: "error",
        });
        return;
    }

    Swal.fire({
        title: "Order Complete",
        text: `Your order will be shipped to: ${address}. Total: $${totalPriceElement.innerText}`,
        icon: "success",
    });

    // Clear cart after order completion
    localStorage.removeItem("cart");

    // Redirect to a confirmation page or home
    setTimeout(() => {
        window.location = "index.html"; // Redirect to home page after a few seconds
    }, 2000);
}
