/*------------------------------------------------------------
    Creation de la fonction qui récupère l'identifiant de la commande
-------------------------------------------------------------*/
  // Récupération de l'ordreId de l'URL
let orderId = new URLSearchParams(window.location.search).get('orderId');

// Rajoute le N° de commande dans l'affichage
document.getElementById('orderId').textContent = orderId;

// Vide le localStorage
window.localStorage.clear();
