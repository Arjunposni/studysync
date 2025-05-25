import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5NPfSNedNHTNriM14soBMz2Sa17e04uw",
    authDomain: "posnidti.firebaseapp.com",
    projectId: "posnidti",
    storageBucket: "posnidti.firebasestorage.app",
    messagingSenderId: "421688629086",
    appId: "1:421688629086:web:fc6d453253af1214a361cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login Form Submission
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Firebase Login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to dashboard or home page
            window.location.href = 'home1.html';
        })
        .catch((error) => {
            loginError.textContent = error.message;
            loginError.classList.remove('hidden');
        });
});