// main.js
import { auth, db } from "./firebase.js";

// Example: Sign up a user
auth.createUserWithEmailAndPassword("user@example.com", "password123")
    .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
    })
    .catch((error) => {
        console.error("Error signing up:", error.message);
    });

// Example: Add data to Firestore
db.collection("users").add({
    name: "John Doe",
    email: "john@example.com"
})
    .then(() => {
        console.log("Data added to Firestore");
    })
    .catch((error) => {
        console.error("Error adding data:", error);
    });
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior
    auth.signOut().then(() => {
        // Redirect to the login page after logout
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error during logout:", error.message);
    });
});