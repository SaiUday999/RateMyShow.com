import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIWSl-N_naw3gMmM",
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
submit.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Inputs 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            alert("Created Successfully......");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});
