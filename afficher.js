



import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
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

  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    console.log('Utilisateur déconnecté');
    const container = document.getElementById('container');
    const loginDiv = document.getElementById('login');
    alert('Déconnexion réussie');
    window.location.href = 'index.html'; 

    container.style.display = 'none';
    loginDiv.style.display = 'block';
    // Remplacez l'URL par la page vers laquelle vous voulez rediriger après déconnexion
  });

  
  // Charger les détails d'un produit pour modification
  

  
});

function fetchProduits(date = null) {
  const produitListUl = document.getElementById('produitListUl');
  const videDiv = document.querySelector('.vide');
  produitListUl.innerHTML = ''; // Réinitialiser la liste

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

  if (uid) {
    const produitsRef = ref(db, 'Produits/' + uid);
    onValue(produitsRef, (snapshot) => {
      const produits = snapshot.val();
      let produitTrouve = false;

      if (produits) {
        Object.keys(produits).forEach(key => {
          const produit = produits[key];
          // Afficher tous les produits si aucune date n'est sélectionnée ou si la date correspond
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
                   <button onclick="chargerProduit('${key}')">
                  
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
  } else {
    console.error('Utilisateur non authentifié');
  }
}

function deleteProduit(productId) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

  if (uid) {
    const produitRef = ref(db, 'Produits/' + uid + '/' + productId);
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
}

function updateProduitAchete(productId, achete) {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

  if (uid) {
    const produitRef = ref(db, 'Produits/' + uid + '/' + productId);
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
}

function chargerDetailsProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const produitId = urlParams.get('id');
  
  if (produitId) {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user ? user.uid : null;

      if (uid) {
          const produitRef = ref(db, 'Produits/' + uid + '/' + produitId);

          get(produitRef).then((snapshot) => {
              if (snapshot.exists()) {
                  const produit = snapshot.val();
                  document.getElementById('nomproduit').value = produit.nom;
                  document.getElementById('prixproduit').value = produit.prix;
                  document.getElementById('quantiteproduit').value = produit.quantite;
                  document.getElementById('produitId').value = produitId;
                  document.getElementById('dateproduit').value = produit.date;
              } else {
                  console.error('Produit non trouvé');
              }
          }).catch((error) => {
              console.error('Erreur lors de la récupération des données du produit:', error);
          });
      } else {
          console.error('Utilisateur non authentifié');
      }
  }

 


}


