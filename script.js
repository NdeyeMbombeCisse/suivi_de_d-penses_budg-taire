
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
//   import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
//   import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
  
//   const firebaseConfig = {
//     apiKey: "AIzaSyCQGsCrIRQUumN2OPoY6EbX2CtI1HToHW8",
//     authDomain: "gestion-de-depenses-f22f2.firebaseapp.com",
//     projectId: "gestion-de-depenses-f22f2",
//     storageBucket: "gestion-de-depenses-f22f2.appspot.com",
//     messagingSenderId: "166722032540",
//     appId: "1:166722032540:web:0a82311ffd9fdcc83eee59",
//     measurementId: "G-9Z1YSG37CT",
//     databaseURL:"https://gestion-de-depenses-f22f2-default-rtdb.firebaseio.com/",
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const db = getDatabase(app);
//   const auth = getAuth(app);

//   const formulaire = document.getElementById('formulaire');
//   formulaire.addEventListener('submit',(e) =>{
//     e.preventDefault();

//     const prenom = formulaire.prenom.value;
//     const email = formulaire.email.value;
//     const password =  formulaire.password.value;
//     createUserWidthEmailAndPassword(auth,email,password,prenom);
//     alert('user inscrit avec succes')
//   })

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

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
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inscription réussie
      const user = userCredential.user;
      console.log('User inscrit avec succès:', user);
      alert('Utilisateur inscrit avec succès');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erreur d\'inscription:', errorCode, errorMessage);
      alert('Erreur d\'inscription: ' + errorMessage);
    });
});
