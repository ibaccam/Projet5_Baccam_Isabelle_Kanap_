/*-----------------------------------------------------------------------------
        Afficher un tableau récapitulatif des achats dans le panier
--------------------------------------------------------------------------------*/

//On récupère les valeurs du local storage
let productLocalStorage = JSON.parse (localStorage.getItem("panier"));
console.log(productLocalStorage)
//JSON.parse convertit les données JSON du localStorage en objet Javascript 
 //Lit ds le local storage, cette méthode renvoie la valeur de la clé correspondante "panier"

//panierLocalStorage=[];  //et je crée un tableau

//On vérifie si le panier est vide
if (productLocalStorage === null|| productLocalStorage.length === 0 ) {
    // si le panier est vide, on informe l'utilisateur
    document.querySelector('h1').innerHTML = 'Votre panier est vide';
    // sinon on récupère ce qu'il y a dans le LS
  } else {
    
    for(i=0; i < productLocalStorage.length; i++) {
         //.innerHTML injecte le nouveau contenu dans le DOM

    document.getElementById('cart__items').innerHTML +=
    `<article class="cart__item" data-id="${productLocalStorage.id}" data-color="${productLocalStorage.color}">
        <div class="cart__item__img">
          <img src="${productLocalStorage.imageUrl}" alt="${productLocalStorage.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>"${productLocalStorage.name}"</h2>
            <p>${productLocalStorage.color}</p>
            <p>${productLocalStorage.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
    //if(i == productLocalStorage.length){} 
}


