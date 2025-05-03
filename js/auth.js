function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email === "admin@restaurant.com") {
          window.location.href = "admin-dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  }
  