import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, onValue,remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

function fetchProduits() {
    const produitListUl = document.getElementById('produitListUl');
    produitListUl.innerHTML = ''; // Réinitialiser la liste
  
    const produitsRef = ref(db, 'Produits/');
    onValue(produitsRef, (snapshot) => {
      const produits = snapshot.val();
      if (produits) {
        Object.keys(produits).forEach(key => {
          const produit = produits[key];
          const produitItem = document.createElement('div');
          produitItem.classList.add('produit-item');
          produitItem.innerHTML = `
            <p>Nom: ${produit.nom}</p>
            <p>Prix: ${produit.prix}</p>
            <p>Quantité: ${produit.quantite}</p>
            <div class="produit-actions">
            <i class="fa-solid fa-trash fa-lg delete-icon" style="color: #ffffff;" data-id="${key}"></i>
            <button onclick="location.href='inscription.html?id=${key}'">
             <i class="fa-solid fa-pen-to-square fa-lg edit-icon" style="color: #fffbfb;" data-id="${key}"></i>
            </button>
          </div>
          `;
          produitListUl.appendChild(produitItem);
        });

         // Ajouter un gestionnaire d'événements pour les icônes de suppression
      const deleteIcons = document.querySelectorAll('.delete-icon');
      deleteIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
          const productId = e.target.getAttribute('data-id');
          deleteProduit(productId);
        });
      });



      } else {
        produitListUl.innerHTML = 'Aucun produit trouvé.';
      }
    });
  }

  function deleteProduit(productId) {
    const produitRef = ref(db, 'Produits/' + productId);
    remove(produitRef)
      .then(() => {
        Swal.fire({
          title: "Produit supprimé avec succès!",
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          }
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du produit:', error);
        Swal.fire({
          title: "Erreur lors de la suppression du produit.",
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
          }
        });
      });
  }
  
  
  
  document.addEventListener('DOMContentLoaded', fetchProduits);



