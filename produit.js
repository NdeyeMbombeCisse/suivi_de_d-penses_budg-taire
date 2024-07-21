

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Configuration Firebase
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

document.addEventListener('DOMContentLoaded', () => {
    const menuBurger = document.getElementById("menu-burger");
  const navLinks = document.getElementById("nav-links");

  menuBurger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
    menuBurger.classList.toggle("active");
  });
    const produitform = document.getElementById('produitformulaire');
    const dateproduitInput = document.getElementById('dateproduit');
    const produitsList = document.getElementById('produitsList');
    const logoutButton = document.querySelector('button'); // Assurez-vous que le bouton de déconnexion est le bon

    // Vérifier l'état de l'authentification
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;

            // Gestion de l'événement de soumission du formulaire
            produitform.addEventListener('submit', (e) => {
                e.preventDefault();
                let valid = true;
                const nomregex = /^[a-zA-Z\s]+$/;
                const quantiteregex = /^[a-zA-Z0-9\s]+$/;

                const nomproduit = document.getElementById('nomproduit').value.trim();
                const prixproduit = document.getElementById('prixproduit').value.trim();
                const quantiteproduit = document.getElementById('quantiteproduit').value.trim();
                const selectedDate = dateproduitInput.value;

                // Validation des champs
                if (nomproduit === "") {
                    document.getElementById('nomproduitErreur').textContent = "Le nom du produit ne doit pas être vide";
                    valid = false;
                } else if (!nomregex.test(nomproduit)) {
                    document.getElementById('nomproduitErreur').textContent = "Le nom ne doit pas contenir de caractère spécial ni de chiffre";
                    valid = false;
                }

                if (prixproduit === "") {
                    document.getElementById('prixproduitErreur').textContent = "Le prix ne doit pas être vide";
                    valid = false;
                }

                if (quantiteproduit === "") {
                    document.getElementById('quantiteproduitErreur').textContent = "La quantité ne doit pas être vide";
                    valid = false;
                } else if (!quantiteregex.test(quantiteproduit)) {
                    document.getElementById('quantiteproduitErreur').textContent = "La quantité ne doit pas contenir de caractère spécial";
                    valid = false;
                }

                if (!selectedDate) {
                    document.getElementById('dateproduitErreur').textContent = "La date ne doit pas être vide";
                    valid = false;
                }

                if (!valid) {
                    return; // Arrêter le traitement si les données ne sont pas valides
                }

                // Ajouter le produit à Firebase
                const newproduitRef = ref(db, 'Produits/' + uid + '/' + Date.now());
                set(newproduitRef, {
                    nom: nomproduit,
                    prix: prixproduit,
                    quantite: quantiteproduit,
                    date: selectedDate,
                    utilisateur: uid
                })
                    .then(() => {
                        Swal.fire({
                            title: "Produit ajouté avec succès!",
                            icon: 'success'
                        });
                        produitform.reset();
                        afficherProduitsParDate(selectedDate, uid);
                    })
                    .catch((error) => {
                        console.error('Erreur lors de l\'ajout du produit:', error);
                        Swal.fire({
                            title: "Erreur lors de l'ajout du produit.",
                            icon: 'error'
                        });
                    });
            });

            // Fonction pour afficher les produits par date
            function afficherProduitsParDate(date, uid) {
                produitsList.innerHTML = '';
                const produitsRef = ref(db, 'Produits/' + uid);
                get(child(produitsRef, '/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const produits = snapshot.val();
                        Object.keys(produits).forEach(key => {
                            const produit = produits[key];
                            if (produit.date === date) {
                                const produitElement = document.createElement('div');
                                produitElement.innerHTML = `
                                    <h3>${produit.nom}</h3>
                                    <p>Prix: ${produit.prix}</p>
                                    <p>Quantité: ${produit.quantite}</p>
                                    <p>Date: ${produit.date}</p>
                                `;
                                produitsList.appendChild(produitElement);
                            }
                        });
                    } else {
                        produitsList.innerHTML = 'Aucun produit trouvé pour cette date.';
                    }
                }).catch((error) => {
                    console.error('Erreur lors de la récupération des produits:', error);
                });
            }

            // Afficher les produits par date initiale (s'il y a une date sélectionnée)
            if (dateproduitInput.value) {
                afficherProduitsParDate(dateproduitInput.value, uid);
            }

            // Déconnexion de l'utilisateur
            logoutButton.addEventListener('click', () => {
                signOut(auth).then(() => {
                    window.location.href = 'inscription.html'; // Rediriger vers la page d'inscription après déconnexion
                }).catch((error) => {
                    console.error('Erreur lors de la déconnexion:', error);
                });
            });

        } else {
            window.location.href = 'inscription.html'; // Rediriger si non authentifié
        }
    });
});

