// Utility to get data from localStorage
function getCredentials(role) {
  return JSON.parse(localStorage.getItem(role + 's')) || [];
}

// Utility to save data to localStorage
function saveCredentials(role, data) {
  localStorage.setItem(role + 's', JSON.stringify(data));
}

function switchForm(role) {
  document.getElementById('user-form').style.display = role === 'user' ? 'block' : 'none';
  document.getElementById('admin-form').style.display = role === 'admin' ? 'block' : 'none';
}

function register(role) {
  const email = document.getElementById(`${role}Email`).value.trim();
  const password = document.getElementById(`${role}Password`).value.trim();

  if (!email || !password) {
      alert("Email and password are required.");
      return;
  }

  const store = getCredentials(role);

  if (store.some(acc => acc.email === email)) {
      alert(`${role} already registered.`);
      return;
  }

  store.push({ email, password });
  saveCredentials(role, store);
  alert(`${role} registered successfully!`);
}

function login(role) {
  const email = document.getElementById(`${role}Email`).value.trim();
  const password = document.getElementById(`${role}Password`).value.trim();

  const store = getCredentials(role);

  const user = store.find(acc => acc.email === email && acc.password === password);
  if (user) {
      alert(`${role} login successful! Redirecting...`);
      window.location.href = role === 'admin' ? 'admin.html' : 'menu.html';
  } else {
      alert(`Invalid ${role} credentials.`);
  }
}



// Placeholder for future interactivity
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully.");
  });
  document.querySelector(".scroll-button").addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("buyNow").addEventListener("click", () => {
    const checkedItems = Array.from(document.querySelectorAll(".menu-check:checked"))
                              .map(input => input.value);
    if (checkedItems.length === 0) {
      alert("Please select at least one item before proceeding.");
      return;
    }
    localStorage.setItem("selectedItems", JSON.stringify(checkedItems));
    window.location.href = "checkout.html";
  });
  // BUY NOW -> store selected items
if (document.getElementById("buyNow")) {
  document.getElementById("buyNow").addEventListener("click", () => {
    const items = Array.from(document.querySelectorAll(".menu-check:checked")).map(i => i.value);
    if (items.length === 0) return alert("Please select at least one item.");
    localStorage.setItem("selectedItems", JSON.stringify(items));
    window.location.href = "checkout.html";
  });
}

// CHECKOUT form submission
if (document.getElementById("orderForm")) {
  document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const order = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      time: document.getElementById("time").value,
      items: JSON.parse(localStorage.getItem("selectedItems"))
    };
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    const data = await res.json();
    alert(data.message || "Order placed!");
    window.location.href = "sat.html";
  });
}

// ADMIN login
if (document.getElementById("adminLoginForm")) {
  document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials.");
    }
  });
}

// DASHBOARD load orders
if (document.getElementById("ordersList")) {
  window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("/api/orders");
    const orders = await res.json();
    const container = document.getElementById("ordersList");
    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <h4>${order.name} (${order.phone})</h4>
        <p><strong>Items:</strong> ${order.items.join(", ")}</p>
        <p><strong>Location:</strong> ${order.location}</p>
        <p><strong>Time:</strong> ${order.time}</p>
      </div>
    `).join("");
  });
}


