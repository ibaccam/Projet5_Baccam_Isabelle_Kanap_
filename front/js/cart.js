/*-----------------------------------------------------------------------------
        Afficher un tableau récapitulatif des achats dans le panier
--------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------
        Récupèrer les valeurs du local storage et API
--------------------------------------------------------------------------------*/

let productLocalStorage = JSON.parse (localStorage.getItem("panier"));
console.log(productLocalStorage)
//JSON.parse convertit les données JSON du localStorage en objet Javascript 
//Lit ds le local storage, cette méthode renvoie la valeur de la clé correspondante "panier"

//panierLocalStorage=[];  //et je crée un tableau


//Fonction pour récupérer les autres caractéristiques du produit (nom, image, prix)
function getProductIdData(productId) { // argument 
  return fetch(`http://localhost:3000/api/products/${productId}`)//chemin de la ressource qu’on souhaite récupérer avec l'id du produit//     
      .then(function(response){
          return response.json() // retourne la réponse en format json (retourne une promesse contenant la réponse)
      })
      .then(function(data) {
          return data // récupération de la valeur du résultat json précédent
  //return console.table(data)// récupération de la valeur du résultat json précédent
      })
      .catch(function (error) {   // retourner valeur si erreur de l'opération fetch
          error = `Erreur echec du chargement, merci de relancer votre demande.`;
          alert(error);
          })
}

/*-----------------------------------------------------------------------------
        Afficher les caractéristiques pour chaque article du local storage
--------------------------------------------------------------------------------*/

async function displayPanier (){
//On vérifie si le panier est vide
  if (productLocalStorage === null|| productLocalStorage.length === 0 ) {
      // si le panier est vide, on informe l'utilisateur
      document.querySelector('h1').innerHTML = 'Votre panier est vide';
  } 
//sinon on récupère ce qu'il y a dans le LS
  else {
    for(i=0; i < productLocalStorage.length; i++) { //Boucle pour chaque type article retrouvé dans le local storage
      let article = productLocalStorage[i]; //Constante pour identifier un type d'article du local storage
      productData = await getProductIdData(article.id); //constante pour le résulat d'un article
        
//et on injecte le nouveau contenu dans le DOM
      document.getElementById('cart__items').innerHTML +=
      `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
        <div class="cart__item__img">
        <img src="${productData.imageUrl}" alt="${productData.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>"${productData.name}"</h2>
          <p>${article.color}</p>
          <p>${productData.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
  }
}
displayPanier ()


