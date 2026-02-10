// cart.js

function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function displayCartItems() {
  const cart = getCart();
  const cartItemsSection = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItemsSection.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("total-price").textContent = "Total: $0.00";
    return;
  }

  let html = "<ul>";
  cart.forEach((item) => {
    html += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
  });
  html += "</ul>";
  cartItemsSection.innerHTML = html;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}

// Luhn algorithm for credit card validation
function validateCreditCard(number) {
  const num = number.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(num)) return false;

  let sum = 0;
  let toggle = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (toggle) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    toggle = !toggle;
  }
  return sum % 10 === 0;
}

document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();

  const form = document.getElementById("checkout-form");
  const messageEl = document.getElementById("checkout-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageEl.textContent = "";

    const ccNumber = document.getElementById("cc-number").value;
    if (!validateCreditCard(ccNumber)) {
      messageEl.style.color = "red";
      messageEl.textContent = "Please enter a valid credit card number.";
      return;
    }

    // On successful purchase
    messageEl.style.color = "green";
    messageEl.textContent = "Purchase successful! Thank you for shopping with ShopAway.";

    // Clear cart
    localStorage.removeItem("cart");

    displayCartItems();
    form.reset();
    document.getElementById("checkout-section").style.display = "none";
  });
});