const phones = [
    // Samsung Phones
    { brand: "Samsung", model: "Galaxy S21", ram: 8, rom: 128, camera: "64 megapixel", price: 799 },
    { brand: "Samsung", model: "Galaxy A72", ram: 6, rom: 128, camera: "64 megapixel", price: 499 },
    { brand: "Samsung", model: "Note 20 Ultra", ram: 12, rom: 256, camera: "108 megapixel", price: 1299 },
    { brand: "Samsung", model: "S20 FE", ram: 8, rom: 128, camera: "12 megapixel", price: 799 },
    { brand: "Samsung", model: "Galaxy A52", ram: 6, rom: 128, camera: "64 megapixel", price: 349 },

    // Vivo Phones
    { brand: "Vivo", model: "X60 Pro", ram: 12, rom: 256, camera: "48 megapixel", price: 999 },
    { brand: "Vivo", model: "V21", ram: 8, rom: 128, camera: "64 megapixel", price: 399 },
    { brand: "Vivo", model: "Y31", ram: 6, rom: 128, camera: "48 megapixel", price: 249 },
    { brand: "Vivo", model: "V17 Pro", ram: 8, rom: 128, camera: "48 megapixel", price: 399 },
    { brand: "Vivo", model: "V19", ram: 8, rom: 128, camera: "48 megapixel", price: 499 },

    // Apple Phones
    { brand: "Apple", model: "iPhone 13", ram: 4, rom: 128, camera: "12 megapixel", price: 799 },
    { brand: "Apple", model: "iPhone 12", ram: 4, rom: 128, camera: "12 megapixel", price: 699 },
    { brand: "Apple", model: "iPhone 11", ram: 4, rom: 64, camera: "12 megapixel", price: 599 },
    { brand: "Apple", model: "iPhone SE", ram: 3, rom: 64, camera: "12 megapixel", price: 399 },
    { brand: "Apple", model: "iPhone XR", ram: 3, rom: 64, camera: "12 megapixel", price: 499 },

    // Xiaomi Phones
    { brand: "Xiaomi", model: "Mi 11", ram: 8, rom: 256, camera: "108 megapixel", price: 749 },
    { brand: "Xiaomi", model: "Redmi Note 10 Pro", ram: 6, rom: 128, camera: "108 megapixel", price: 299 },
    { brand: "Xiaomi", model: "Poco X3", ram: 6, rom: 64, camera: "64 megapixel", price: 229 },
    { brand: "Xiaomi", model: "Redmi Note 9", ram: 4, rom: 64, camera: "48 megapixel", price: 199 },
    { brand: "Xiaomi", model: "Mi 10", ram: 8, rom: 128, camera: "108 megapixel", price: 999 },
];

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const div = document.querySelector("#container");
const brandFilter = document.querySelector("#brandFilter");
const priceFilter = document.querySelector("#priceFilter");
const ramFilter = document.querySelector("#ramFilter");

// Render all phones initially
function renderPhones(filteredPhones = phones) {
    div.innerHTML = ""; // Clear the container before re-rendering
    filteredPhones.forEach((item, index) => {
        div.innerHTML += `
        <div class="card border border-white p-3 rounded w-25">
            <h5>${item.brand} ${item.model}</h5>
            <p>Price: $${item.price}</p>
            <p>RAM: ${item.ram}GB | ROM: ${item.rom}GB</p>
            <p>Camera: ${item.camera}</p>
            <button class="btn btn-primary mt-3" onclick="addToCart(${index})">Add to Cart</button>
        </div>
        `;
    });
}

// Add to cart function
function addToCart(index) {
    const phone = phones[index];
    const checkIndex = cartItems.findIndex(item => item.brand === phone.brand && item.model === phone.model);
    if (checkIndex === -1) {
        phone.quantity = 1;
        cartItems.push(phone);
    } else {
        cartItems[checkIndex].quantity += 1;
    }

    Swal.fire({
        title: "Nice",
        text: "Item added to cart successfully!",
        icon: "success",
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Filter phones based on the selected criteria
function filterPhones() {
    const brand = brandFilter.value.toLowerCase();
    const price = parseInt(priceFilter.value) || Infinity;
    const ram = parseInt(ramFilter.value) || 0;

    const filteredPhones = phones.filter(phone => 
        phone.brand.toLowerCase().includes(brand) &&
        phone.price <= price &&
        phone.ram >= ram
    );

    renderPhones(filteredPhones);
}

// Event listeners for filter inputs
brandFilter.addEventListener("input", filterPhones);
priceFilter.addEventListener("input", filterPhones);
ramFilter.addEventListener("input", filterPhones);

// Render phones when the page loads
function loadBrands() {
    const brands = [...new Set(phones.map(phone => phone.brand))];
    brands.forEach(brand => {
        brandFilter.innerHTML += `<option value="${brand}">${brand}</option>`;
    });
}

loadBrands();
renderPhones();

// Checkout function
function checkout() {
    if (cartItems.length === 0) {
        Swal.fire({
            title: "Cart is empty",
            text: "Please add items to the cart before proceeding.",
            icon: "warning",
        });
    } else {
        window.location = "cart.html";
    }
}
