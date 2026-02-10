const products = [
  {
    id: "p01",
    name: "UltraSoft Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "p02",
    name: "Wireless Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "p03",
    name: "Elegant Wristwatch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=320&q=80",
  },
  {
    id: "p04",
    name: "Eco-friendly Backpack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=320&q=80",
  },
];

// Elements
const productsContainer = document.getElementById("products-container");
const cartLink = document.getElementById("cart-link");

// Cart state from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  productsContainer.innerHTML = products
    .map(
      (p) => `
      <article class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" />
        <div class="product-name">${p.name}</div>
        <div class="product-price">$${p.price.toFixed(2)}</div>
        <button class="btn add-to-cart-btn">Add to Cart</button>
      </article>`
    )
    .join("");
}

// Update cart link count display
function updateCartCount() {
  cartLink.textContent = `Cart (${cart.length})`;
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`Added "${product.name}" to cart!`);
}

// Setup event delegation
productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productCard = e.target.closest(".product-card");
    if (!productCard) return;
    const productId = productCard.getAttribute("data-id");
    addToCart(productId);
  }
});

// Initialize page
function init() {
  renderProducts();
  updateCartCount();
}

init();
