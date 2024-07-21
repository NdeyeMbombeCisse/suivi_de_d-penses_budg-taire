








import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQGsCrIRQUumN2OPoY6EbX2CtI1HToHW8",
  authDomain: "gestion-de-depenses-f22f2.firebaseapp.com",
  projectId: "gestion-de-depenses-f22f2",
  storageBucket: "gestion-de-depenses-f22f2.appspot.com",
  messagingSenderId: "166722032540",
  appId: "1:166722032540:web:0a82311ffd9fdcc83eee59",
  measurementId: "G-9Z1YSG37CT",
  databaseURL: "https://gestion-de-depenses-f22f2-default-rtdb.firebaseio.com/",
};


// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const formulaire = document.getElementById('formulaire');
const loginForm = document.getElementById('loginform');
const container = document.getElementById('container');
const loginDiv = document.getElementById('login');
const showLogin = document.getElementById('showLogin');
const showSignup = document.getElementById('showSignup');

// Gestion de l'inscription
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const prenom = formulaire.prenom.value;
    const email = formulaire.email.value;
    const password = formulaire.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Utilisateur inscrit:', userCredential.user);
            alert('Inscription réussie');
            formulaire.reset();
            window.location.href = 'afficheproduit.html'; // Redirige vers la page de produits après l'inscription
        })
        .catch((error) => {
            console.error('Erreur d\'inscription:', error.message);
            alert('Erreur d\'inscription: ' + error.message);
        });
});

// Gestion de la connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email2.value;
    const password = loginForm.password2.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Utilisateur connecté:', userCredential.user);
            alert('Connexion réussie');
            loginForm.reset();
            window.location.href = 'afficheproduit.html'; // Redirige vers la page de produits après la connexion
        })
        .catch((error) => {
            console.error('Erreur de connexion:', error.message);
            alert('Erreur de connexion: ' + error.message);
        });
});

// Gestion de l'affichage des formulaires
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    container.style.display = 'none';
    loginDiv.style.display = 'block';
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    container.style.display = 'block';
    loginDiv.style.display = 'none';
});

// Vérifier l'état d'authentification
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Utilisateur connecté
        container.style.display = 'none'; // Cacher le formulaire d'inscription
        loginDiv.style.display = 'none'; // Cacher le formulaire de connexion
    } else {
        // Utilisateur non connecté
        container.style.display = 'block'; // Afficher le formulaire d'inscription
        loginDiv.style.display = 'none'; // Cacher le formulaire de connexion
    }
});
