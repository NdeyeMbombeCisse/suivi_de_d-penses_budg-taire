

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getDatabase,ref, set  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";


// const firebaseConfig = {
//   apiKey: "AIzaSyCQGsCrIRQUumN2OPoY6EbX2CtI1HToHW8",
//   authDomain: "gestion-de-depenses-f22f2.firebaseapp.com",
//   projectId: "gestion-de-depenses-f22f2",
//   storageBucket: "gestion-de-depenses-f22f2.appspot.com",
//   messagingSenderId: "166722032540",
//   appId: "1:166722032540:web:0a82311ffd9fdcc83eee59",
//   measurementId: "G-9Z1YSG37CT",
//   databaseURL: "https://gestion-de-depenses-f22f2-default-rtdb.firebaseio.com/",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const auth = getAuth(app);

// const formulaire = document.getElementById('formulaire');
// formulaire.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const prenom = formulaire.prenom.value;
//   const email = formulaire.email.value;
//   const password = formulaire.password.value;
  
//   createUserWithEmailAndPassword(auth, email, password,prenom)
//     .then((userCredential) => {
//       // Inscription réussie
//       const user = userCredential.user;
//       console.log('User inscrit avec succès:', user);
//       alert('Utilisateur inscrit avec succès');
//       formulaire.reset();
//       document.getElementById('container').style.display = 'none';
//       document.getElementById('login').style.display = 'block';
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error('Erreur d\'inscription:', errorCode, errorMessage);
//       alert('Erreur d\'inscription: ' + errorMessage);
//     });
// });



// // gestion de l'autehntification

// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('loginform');
//     const logoutButton = document.getElementById('logout');

//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const email = loginForm.email2.value;
//         const password = loginForm.password2.value;

//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // connexion reussi
//                 const user = userCredential.user;
//                 console.log('User connecte avec succès:', user);
//                 alert('Utilisateur connecte avec succès');
//                 loginForm.reset();
//                 document.getElementById('container').style.display = 'block';
//                 document.getElementById('login').style.display = 'none';
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.error('Erreur de connexion:', errorCode, errorMessage);
//                 alert('Erreur de connexion: ' + errorMessage);
//             });
//     });

//     logoutButton.addEventListener('click', () => {
//         signOut(auth)
//             .then(() => {
//                 // Déconnexion réussie
//                 console.log('Utilisateur déconnecté');
//                 alert('Déconnexion réussie');
//                 // Rediriger l'utilisateur vers la page de connexion ou effectuer d'autres actions
//             })
//             .catch((error) => {
//                 console.error('Erreur de déconnexion:', error);
//                 alert('Erreur de déconnexion: ' + error.message);
//             });
//     });
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const produitform = document.getElementById('produitformulaire');
const produitIdInput = document.getElementById('produitId');

// Fonction pour réinitialiser le formulaire
function resetForm() {
    produitform.reset();
    produitIdInput.value = '';
    document.getElementById('form-title').innerText = 'Ajouter un Produit';
}

// Ajouter ou modifier un produit
produitform.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const nomregex = /^[a-zA-Z\s]+$/;
    const quantiteregex = /^[a-zA-Z0-9\s]+$/;

    const nomproduit = document.getElementById('nomproduit').value.trim();
    const prixproduit = document.getElementById('prixproduit').value.trim();
    const quantiteproduit = document.getElementById('quantiteproduit').value.trim();
    const produitId = produitIdInput.value.trim();

    // Validation des champs
    if (nomproduit === "") {
        const nomproduitErreur = document.getElementById('nomproduitErreur');
        nomproduitErreur.innerHTML = "Le nom du produit ne doit pas être vide";
        nomproduitErreur.style.color = 'red';
        valid = false;
    } else if (!nomregex.test(nomproduit)) {
        const nomproduitErreur = document.getElementById('nomproduitErreur');
        nomproduitErreur.innerHTML = "Le nom ne doit pas contenir de caractères spéciaux ni de chiffres";
        nomproduitErreur.style.color = 'red';
        valid = false;
    }

    if (prixproduit === "") {
        const prixproduitErreur = document.getElementById('prixproduitErreur');
        prixproduitErreur.innerHTML = "Le prix ne doit pas être vide";
        prixproduitErreur.style.color = 'red';
    }

    if (quantiteproduit === "") {
        const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
        quantiteproduitErreur.innerHTML = "La quantité ne doit pas être vide";
        quantiteproduitErreur.style.color = 'red';
    } else if (!quantiteregex.test(quantiteproduit)) {
        const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
        quantiteproduitErreur.innerHTML = "La quantité ne doit pas contenir de caractères spéciaux";
        quantiteproduitErreur.style.color = 'red';
    }

    if (!valid) {
        return; // Arrêter le traitement si les données ne sont pas valides
    }

    // Ajouter ou modifier le produit
    const produitRef = produitId ? ref(db, 'Produits/' + produitId) : ref(db, 'Produits/' + Date.now());

    set(produitRef, {
        nom: nomproduit,
        prix: prixproduit,
        quantite: quantiteproduit
    })
    .then(() => {
        Swal.fire({
            title: produitId ? "Produit modifié avec succès!" : "Produit ajouté avec succès!",
            icon: 'success',
            showClass: {
                popup: 'animate__animated animate__fadeInUp animate__faster'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutDown animate__faster'
            }
        });

        // Réinitialiser le formulaire
        resetForm();

        // Rediriger vers la page d'affichage des produits
        window.location.href = 'afficheproduit.html';
    }).catch((error) => {
        console.error('Erreur lors de l\'ajout ou de la modification du produit:', error);
        alert('Erreur lors de l\'ajout ou de la modification du produit.');
    });
});

// Charger les détails du produit à modifier si l'ID est fourni
function loadProduit() {
    const urlParams = new URLSearchParams(window.location.search);
    const produitId = urlParams.get('id');

    if (produitId) {
        const produitRef = ref(db, 'Produits/' + produitId);
        onValue(produitRef, (snapshot) => {
            const produit = snapshot.val();
            if (produit) {
                document.getElementById('nomproduit').value = produit.nom;
                document.getElementById('prixproduit').value = produit.prix;
                document.getElementById('quantiteproduit').value = produit.quantite;
                produitIdInput.value = produitId;
                document.getElementById('form-title').innerText = 'Modifier le Produit';
            }
        });
    }
}

// Charger les détails du produit à modifier lors du chargement de la page
document.addEventListener('DOMContentLoaded', loadProduit);