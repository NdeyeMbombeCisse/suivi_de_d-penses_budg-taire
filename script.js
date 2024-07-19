

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const formulaire = document.getElementById('formulaire');
formulaire.addEventListener('submit', (e) => {
  e.preventDefault();

  const prenom = formulaire.prenom.value;
  const email = formulaire.email.value;
  const password = formulaire.password.value;
  
  createUserWithEmailAndPassword(auth, email, password,prenom)
    .then((userCredential) => {
      // Inscription réussie
      const user = userCredential.user;
      console.log('User inscrit avec succès:', user);
      alert('Utilisateur inscrit avec succès');
      formulaire.reset();
      document.getElementById('container').style.display = 'none';
      document.getElementById('login').style.display = 'block';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erreur d\'inscription:', errorCode, errorMessage);
      alert('Erreur d\'inscription: ' + errorMessage);
    });
});



// gestion de l'autehntification

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginform');
    const logoutButton = document.getElementById('logout');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email2.value;
        const password = loginForm.password2.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // connexion reussi
                const user = userCredential.user;
                console.log('User connecte avec succès:', user);
                alert('Utilisateur connecte avec succès');
                loginForm.reset();
                document.getElementById('container').style.display = 'block';
                document.getElementById('login').style.display = 'none';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Erreur de connexion:', errorCode, errorMessage);
                alert('Erreur de connexion: ' + errorMessage);
            });
    });

    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                // Déconnexion réussie
                console.log('Utilisateur déconnecté');
                alert('Déconnexion réussie');
                // Rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions
            })
            .catch((error) => {
                console.error('Erreur de déconnexion:', error);
                alert('Erreur de déconnexion: ' + error.message);
            });
    });
});

