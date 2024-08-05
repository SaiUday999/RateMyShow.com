import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWSl-N_naw3gMmFudD6yQsiosyRs4UZUM",
    authDomain: "dtm-2dd23.firebaseapp.com",
    projectId: "dtm-2dd23",
    storageBucket: "dtm-2dd23.appspot.com",
    messagingSenderId: "1020650368885",
    appId: "1:1020650368885:web:8edae36514624416372d3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Submit button
const submit = document.getElementById('submit');
if (submit) {
    console.log("Submit button found");

    submit.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log("Email:", email);
        console.log("Password:", password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("User signed in:", userCredential);
                window.location.href = "myshow1.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error code:", errorCode);
                console.error("Error message:", errorMessage);
                alert("Enter Correct Details!!!");
            });
    });
}

// Reset button
const reset = document.getElementById('reset');
if (reset) {
    reset.addEventListener("click", function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Email sent");
                alert("Password reset email sent!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error code:", errorCode);
                console.error("Error message:", errorMessage);
                alert("Please Enter only Email then click on Forget Password?");
            });
    });
}