// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import { getDatabase,ref, set  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";


// const firebaseConfig = {
//     apiKey: "AIzaSyCQGsCrIRQUumN2OPoY6EbX2CtI1HToHW8",
//     authDomain: "gestion-de-depenses-f22f2.firebaseapp.com",
//     projectId: "gestion-de-depenses-f22f2",
//     storageBucket: "gestion-de-depenses-f22f2.appspot.com",
//     messagingSenderId: "166722032540",
//     appId: "1:166722032540:web:0a82311ffd9fdcc83eee59",
//     measurementId: "G-9Z1YSG37CT",
//     databaseURL: "https://gestion-de-depenses-f22f2-default-rtdb.firebaseio.com/",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const produitform = document.getElementById('produitformulaire');

// produitform.addEventListener('submit' ,(e) =>{
//     e.preventDefault();
//    let valid = true;
//     const nomregex = /^[a-zA-Z\s]+$/;
//     const quantiteregex = /^[a-zA-Z0-9\s]+$/

//      const nomproduit = document.getElementById('nomproduit').value.trim();
//    const  prixproduit = document.getElementById('prixproduit').value.trim()
//     const quantiteproduit = document.getElementById('quantiteproduit').value.trim();
//     if(nomproduit ===""){
//        const nomproduitErreur = document.getElementById('nomproduitErreur');
//         nomproduitErreur.innerHTML = "le nom du produit ne dois pas etre vide";
//         nomproduitErreur.style.color = 'red';
//         valid = false;
        
//     } else if(!nomregex.test(nomproduit)){
//         const nomproduitErreur = document.getElementById('nomproduitErreur');
//         nomproduitErreur.innerHTML = "le nom ne dois pas contenir de caractere speciale ni de chiffre";
//         nomproduitErreur.style.color = 'red';
//         valid = false;
//     }

//     if(prixproduit ===""){
//         const prixproduitErreur = document.getElementById('prixproduitErreur');
//         prixproduitErreur.innerHTML = "le  prix ne dois pas etre vide";
//         prixproduitErreur.style.color = 'red';

//     } 

//     if(quantiteproduit === ""){
//         const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
//         quantiteproduitErreur.innerHTML = "la quantite ne dois pas etre vide";
//         quantiteproduitErreur.style.color = 'red';
//     } else if(!quantiteregex.test(quantiteproduit)){
//         const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
//         quantiteproduitErreur.innerHTML = "la quantite ne dois pas contenir de caracte special";
//         quantiteproduitErreur.style.color = 'red';

//     }

//     if (!valid) {
//         return; // Arrêter le traitement si les données ne sont pas valides
//       }
    

//     const newproduitRef = ref(db, 'Produits/' +Date.now());
//     set(newproduitRef,{
//         nom: nomproduit ,
//         prix:  prixproduit,
//         quantite:   quantiteproduit,

//     })
//     .then(() => { 
//         Swal.fire({
//             title: "Produit ajouté avec succès!",
//             icon: 'success',
//             showClass: {
//               popup: 'animate__animated animate__fadeInUp animate__faster'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutDown animate__faster'
//             }
//           });
    
//           // Réinitialiser le formulaire
//           produitform.reset();

    
//         // Afficher un message de succès avec SweetAlert2
       
//       }).catch((error) => {
//         console.error('Erreur lors de l\'ajout du produit:', error);
//         alert('Erreur lors de l\'ajout du produit.');
//     });

//    // Fonction pour récupérer et afficher les produits


// })


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', () => {
    const produitform = document.getElementById('produitformulaire');
    const dateproduitInput = document.getElementById('dateproduit');
    let selectedDate = null;

    dateproduitInput.addEventListener('change', (e) => {
        selectedDate = e.target.value;
        afficherProduitsParDate(selectedDate);
    });

    produitform.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const nomregex = /^[a-zA-Z\s]+$/;
        const quantiteregex = /^[a-zA-Z0-9\s]+$/;

        const nomproduit = document.getElementById('nomproduit').value.trim();
        const prixproduit = document.getElementById('prixproduit').value.trim();
        const quantiteproduit = document.getElementById('quantiteproduit').value.trim();

        if (nomproduit === "") {
            const nomproduitErreur = document.getElementById('nomproduitErreur');
            nomproduitErreur.innerHTML = "Le nom du produit ne doit pas être vide";
            nomproduitErreur.style.color = 'red';
            valid = false;
        } else if (!nomregex.test(nomproduit)) {
            const nomproduitErreur = document.getElementById('nomproduitErreur');
            nomproduitErreur.innerHTML = "Le nom ne doit pas contenir de caractère spécial ni de chiffre";
            nomproduitErreur.style.color = 'red';
            valid = false;
        }

        if (prixproduit === "") {
            const prixproduitErreur = document.getElementById('prixproduitErreur');
            prixproduitErreur.innerHTML = "Le prix ne doit pas être vide";
            prixproduitErreur.style.color = 'red';
            valid = false;
        }

        if (quantiteproduit === "") {
            const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
            quantiteproduitErreur.innerHTML = "La quantité ne doit pas être vide";
            quantiteproduitErreur.style.color = 'red';
            valid = false;
        } else if (!quantiteregex.test(quantiteproduit)) {
            const quantiteproduitErreur = document.getElementById('quantiteproduitErreur');
            quantiteproduitErreur.innerHTML = "La quantité ne doit pas contenir de caractère spécial";
            quantiteproduitErreur.style.color = 'red';
            valid = false;
        }

        if (!selectedDate) {
            const dateproduitErreur = document.getElementById('dateproduitErreur');
            dateproduitErreur.innerHTML = "La date ne doit pas être vide";
            dateproduitErreur.style.color = 'red';
            valid = false;
        }

        if (!valid) {
            return; // Arrêter le traitement si les données ne sont pas valides
        }

        const newproduitRef = ref(db, 'Produits/' + Date.now());
        set(newproduitRef, {
            nom: nomproduit,
            prix: prixproduit,
            quantite: quantiteproduit,
            date: selectedDate
        })
            .then(() => {
                Swal.fire({
                    title: "Produit ajouté avec succès!",
                    icon: 'success',
                    showClass: {
                        popup: 'animate__animated animate__fadeInUp animate__faster'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster'
                    }
                });

                // Réinitialiser le formulaire
                produitform.reset();
                afficherProduitsParDate(selectedDate);
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du produit:', error);
                alert('Erreur lors de l\'ajout du produit.');
            });
    });

    function afficherProduitsParDate(date) {
        const produitsList = document.getElementById('produitsList');
        produitsList.innerHTML = ''; // Effacer la liste existante

        const produitsRef = ref(db, 'Produits');
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
                console.log('Aucun produit trouvé pour cette date.');
            }
        }).catch((error) => {
            console.error('Erreur lors de la récupération des produits:', error);
        });
    }
});












