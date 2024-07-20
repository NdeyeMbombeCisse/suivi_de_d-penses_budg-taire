

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', () => {
  const menuBurger = document.getElementById("menu-burger");
  const navLinks = document.getElementById("nav-links");

  menuBurger.addEventListener("click", function() {
    navLinks.classList.toggle("active");
    menuBurger.classList.toggle("active");
  });

  const dateFiltreInput = document.getElementById('dateFiltre');
  dateFiltreInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    fetchProduits(selectedDate);
  });

  // Initial load to show all products
  fetchProduits();
});

function fetchProduits(date = null) {
  const produitListUl = document.getElementById('produitListUl');
  const videDiv = document.querySelector('.vide');
  produitListUl.innerHTML = ''; // Réinitialiser la liste

  const produitsRef = ref(db, 'Produits/');
  onValue(produitsRef, (snapshot) => {
    const produits = snapshot.val();
    let produitTrouve = false;

    if (produits) {
      Object.keys(produits).forEach(key => {
        const produit = produits[key];
        if (!date || produit.date === date) {
          produitTrouve = true;
          const produitItem = document.createElement('div');
          produitItem.classList.add('produit-item');
          produitItem.innerHTML = `
            <div class="produit-content">
              <input type="checkbox" class="achete-checkbox" data-id="${key}" ${produit.achete ? 'checked' : ''}>
              <p>Nom: ${produit.nom}</p>
              <p>Prix: ${produit.prix}</p>
              <p>Quantité: ${produit.quantite}</p>
              <div class="produit-actions">
                <i class="fa-solid fa-trash fa-2x delete-icon" style="color: #ffffff;" data-id="${key}"></i>
                <button onclick="location.href='inscription.html?id=${key}'">
                  <i class="fa-solid fa-pen-to-square fa-3x edit-icon" style="color: #fffbfb;" data-id="${key}"></i>
                </button>
              </div>
              ${produit.achete ? '<div class="statut">Acheté</div>' : ''}

            </div>
          `;
          produitListUl.appendChild(produitItem);
        }
      });

      // Afficher ou masquer le message en fonction des produits trouvés
      if (produitTrouve) {
        videDiv.style.display = 'none';
      } else {
        videDiv.style.display = 'block';
      }

      // Ajouter un gestionnaire d'événements pour les icônes de suppression
      const deleteIcons = document.querySelectorAll('.delete-icon');
      deleteIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
          const productId = e.target.getAttribute('data-id');
          deleteProduit(productId);
        });
      });

      // Ajouter un gestionnaire d'événements pour les checkbox
      const acheteCheckboxes = document.querySelectorAll('.achete-checkbox');
      acheteCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const productId = e.target.getAttribute('data-id');
          const achete = e.target.checked;
          updateProduitAchete(productId, achete);
        });
      });

    } else {
      produitListUl.innerHTML = 'Aucun produit trouvé.';
      videDiv.style.display = 'block';
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
      fetchProduits(document.getElementById('dateFiltre').value); // Refresh the list to reflect changes
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

function updateProduitAchete(productId, achete) {
  const produitRef = ref(db, 'Produits/' + productId);
  update(produitRef, { achete: achete })
    .then(() => {
      console.log('Produit mis à jour avec succès');
      fetchProduits(document.getElementById('dateFiltre').value); // Rafraîchir la liste pour refléter les changements
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour du produit:', error);
      Swal.fire({
        title: "Erreur lors de la mise à jour du produit.",
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

