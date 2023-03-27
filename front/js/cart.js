/*-----------------------------------------------------------------------------
                          ***AFFICHAGE PANIER***
--------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------
        Récupèrer les valeurs du local storage et via API
--------------------------------------------------------------------------------*/

let productLocalStorage = JSON.parse (localStorage.getItem("panier"));
console.log(productLocalStorage)
//JSON.parse convertit les données JSON du localStorage en objet Javascript 
//Lit ds le local storage, cette méthode renvoie la valeur de la clé correspondante "panier"


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
      // si le panier est vide (tableau vide), on informe l'utilisateur
      document.querySelector('h1').innerHTML = 'Votre panier est vide';
  } 
//sinon on récupère ce qu'il y a dans le LS
  else {
    for(let i = 0; i < productLocalStorage.length; i++) { //Boucle pour chaque type article retrouvé dans le local storage
      let article = productLocalStorage[i]; //Constante pour identifier un type d'article du local storage
      let productData = await getProductIdData(article.id); //constante pour le résulat d'un article
        
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
    
      updateQuantity ();
      deleteArticle();
      totalPanier();
    }
  }
}
displayPanier ()


/*-----------------------------------------------------------------------------
                  ***MODIFICATION ET SUPPRESSION DE PRODUIT***
--------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------
       Modifier une quantité à un produit
--------------------------------------------------------------------------------*/
function updateQuantity (){  //Fonction à déclarer dans la fonction "displayPanier"
let articleQuantity = document.querySelectorAll('.itemQuantity'); //Constante pour déclarer la quantité et modif du DOM

  //Pour chaque quantité, modifié
  for (let x = 0; x < articleQuantity.length; x++) {
    articleQuantity[x].addEventListener('change', (event) => {
    event.preventDefault(); //ne rien faire si pas de modification
    
    //déclaration d'une nouvelle quantité
      let newArticleQuantity = articleQuantity[x].value;
    
      //déclaration pour le localStorage
      const newLS = {
        id: productLocalStorage[x].id,
        quantity: parseInt(newArticleQuantity),
        color: productLocalStorage[x].color,
      }
    
      //Il faut vérifier que la quantité est valide
      if (newArticleQuantity ==="" || newArticleQuantity<= 0 || newArticleQuantity > 100) {
        alert('Merci de sélectionner une quantité entre 1 et 100');
      }
    
      //Si ok, on récupère la nouvelle quantité dans le local storage
      else { 
        productLocalStorage[x] = newLS;
        localStorage.setItem('panier', JSON.stringify(productLocalStorage));
        alert("La quantité de votre produit a bien été mise à jour."); //alerte pour confirmer à l'utilisateur la modification de la quantité
      }
      totalPanier();
    })
  }
}

/*-----------------------------------------------------------------------------
       Supprimer un produit
--------------------------------------------------------------------------------*/

function deleteArticle(){  //Fonction à déclarer dans la fonction "displayPanier"
  let articleDelete = document.querySelectorAll('.deleteItem'); //Constante pour déclarer la suppression et déclaration dans le DOM
  
    //Pour chaque article supprimé
    for (let y = 0; y < articleDelete.length; y++) {
      articleDelete[y].addEventListener('click', (event) => {
      event.preventDefault(); //ne rien faire s'il n'est pas cliqué
      
      // sélection de l'id et couleur du produit qui va être supprimé
      let id_suppression= productLocalStorage[y].id;
      let color_suppression=productLocalStorage[y].color;

      // avec la methode filter je sélectionne les élements à garder et je supprime l'élement où nous avons demandé une suppression
      productLocalStorage=productLocalStorage.filter(
        (el) =>el.id!==id_suppression || el.color!==color_suppression);
      
      //on met à jour le localstorage
      localStorage.setItem('panier', JSON.stringify(productLocalStorage));
      alert ("Le produit a été supprimé du panier")    
      window.location.href = "cart.html"; //permet de relancer la page panier
      
      });
  }
}

/*-----------------------------------------------------------------------------
                              ***TOTAL PANIER***
--------------------------------------------------------------------------------*/

async function totalPanier() {
  //Déclaration des variables pour afficher "0" par défaut
  let totalPrice = 0; 
  let totalQuantity = 0; 


  //si il y a des articles dans le panier, alors
  if(productLocalStorage.length != 0 || productLocalStorage != null){
      for(let i = 0; i < productLocalStorage.length; i++) { //Boucle pour chaque type article retrouvé dans le local storage
        let article = productLocalStorage[i]; //Constante pour identifier un type d'article du local storage
        let productData = await getProductIdData(article.id); //Constante pour le résulat d'un article
        totalPrice += parseInt(article.quantity) * parseInt(productData.price); //Pour chaque article, il va récupérer le prix et la quantité et faire la somme
        totalQuantity += parseInt(article.quantity); //Nb d'article au total
      }
  }

  //injecte le nouveau contenu dans le DOM 
  let globalQuantity = document.getElementById('totalQuantity');
  globalQuantity.innerHTML = totalQuantity ;

  let globalPrice = document.getElementById('totalPrice');
  globalPrice.innerHTML = totalPrice;

}


/*-----------------------------------------------------------------------------
                              ***FORMULAIRE***
--------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------
      Formulaire
      Validation des champs    
--------------------------------------------------------------------------------*/


//sélection du dom
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');


//Gestion du formulaire
  //Récupérer et analyser les données saisies par l’utilisateur dans le formulaire.
  //Afficher un message d’erreur si besoin (par exemple lorsqu’un utilisateur renseigne “bonjour” dans le champ “e-mail”). 
  //Constituer un objet contact (à partir des données du formulaire) et un tableau de produits.
  //Vérification des données via des regex (expression régulière) et 
  //Afficher un message d’erreur si nécessaire. 

//Contrôle du Prénom
firstNameInput.addEventListener("change", function(){ //écoute de l'événement change sur l'input prénom
let inputValue = this.value; //variable pour définir la valeur modifiée de l'input
  firstNameValidation(inputValue); //lancement de la fonction de validation
});

function firstNameValidation (){
const firstNameInputcontrole = firstNameInput.value;
if(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/.test(firstNameInputcontrole)){ // vérification des données via des regex
  document.getElementById('firstNameErrorMsg').textContent = ""; // si ok, ne plus afficher le message d'alerte
  firstNameInput.setAttribute('style', 'border:1px solid #767676;');
  return true;
}else{
  document.getElementById('firstNameErrorMsg').textContent = "Veuillez saisir un Prénom correct (Minimum 2 caractères, chiffres et symboles spéciaux interdits)";  // pour avoir une alerte sous le champs concerné
  firstNameInput.setAttribute('style', 'border:3px solid red;');
  return false;
}
};

//Contrôle du Nom
lastNameInput.addEventListener("change", function(){ //écoute de l'événement change sur l'input
  let inputValue = this.value; //variable pour définir la valeur modifiée de l'input
    lastNameValidation(inputValue); //lancement de la fonction de validation
  });
  
  function lastNameValidation (){
  const lastNameInputcontrole = lastNameInput.value;
  if(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/.test(lastNameInputcontrole)){ // vérification des données via des regex
    document.getElementById('lastNameErrorMsg').textContent = ""; // si ok, ne plus afficher le message d'alerte
    lastNameInput.setAttribute('style', 'border:1px solid #767676;');
    return true;
  }else{
    document.getElementById('lastNameErrorMsg').textContent = "Veuillez saisir un Nom correct (Minimum 2 caractères, chiffres et symboles spéciaux interdits)";  // pour avoir une alerte sous le champs concerné
    lastNameInput.setAttribute('style', 'border:3px solid red;');
    return false;
  }
  };

//Controle de l'adresse
addressInput.addEventListener("change", function(){ //écoute de l'événement change sur l'input
  let inputValue = this.value; //variable pour définir la valeur modifiée de l'input
   addressValidation(inputValue); //lancement de la fonction de validation
  });

  function addressValidation (){
  const addressInputcontrole = addressInput.value;
  if(/^[a-zA-Z0-9.,-_\é\è\ê\ë\ï\œ\â\-\s]{5,50}[ ]{0,2}$/.test(addressInputcontrole)){ // vérification des données via des regex
    document.getElementById('addressErrorMsg').textContent = ""; // si ok, ne plus afficher le message d'alerte
    addressInput.setAttribute('style', 'border:1px solid #767676;');
    return true;
  }else{
    document.getElementById('addressErrorMsg').textContent = "Veuillez renseigner une Adresse correcte. (Minimum 5 caractères, symboles spéciaux interdits)";  // pour avoir une alerte sous le champs concerné
    addressInput.setAttribute('style', 'border:3px solid red;');
    return false;
  }
  };


//Controle de la ville
cityInput.addEventListener("change", function(){ //écoute de l'événement change sur l'input
  let inputValue = this.value; //variable pour définir la valeur modifiée de l'input
   cityValidation(inputValue); //lancement de la fonction de validation
  });

 function cityValidation (){
  const cityInputcontrole = cityInput.value;
  if(/^[A-Za-z][A-Za-z\é\è\ê\ë\ï\œ\â\-\s]+$/.test(cityInputcontrole)){ // vérification des données via des regex
    document.getElementById('cityErrorMsg').textContent = ""; // si ok, ne plus afficher le message d'alerte
    cityInput.setAttribute('style', 'border:1px solid #767676;');
    return true;
  }else{
    document.getElementById('cityErrorMsg').textContent = "Veuillez saisir une Ville correcte (Minimum 2 caractères, chiffres et symboles spéciaux interdits)";  // pour avoir une alerte sous le champs concerné
    cityInput.setAttribute('style', 'border:3px solid red;');
    return false;
  }
  };

//Controle de de l'email
emailInput.addEventListener("change", function(){ //écoute de l'événement change sur l'input
  let inputValue = this.value; //variable pour définir la valeur modifiée de l'input
   emailValidation(inputValue); //lancement de la fonction de validation
  });

  function emailValidation (){
  const emailInputcontrole = emailInput.value;
  if(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$/.test(emailInputcontrole)){ // vérification des données via des regex
    document.getElementById('emailErrorMsg').textContent = ""; // si ok, ne plus afficher le message d'alerte
    emailInput.setAttribute('style', 'border:1px solid #767676;');
    return true;
  }else{
    document.getElementById('emailErrorMsg').textContent = "Veuillez saisir un Email correct (doit contenir @, exemple : utilisateur@exemple.com)";  //pour avoir une alerte sous le champs concerné
    emailInput.setAttribute('style', 'border:3px solid red;');
    return false;
  }
};

// /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z][2,4]$/,
      //^ début de la chaîne de caractère autorisée
        //[a-z: de a à z en minuscule, de A-Z en majuscule 0-9: des chiffres de 0à 9, .-_ : caractères autorisés]
        //+ permet de dire que ces caractères peuvent être écrit une fois ou plrs fois
        //[@]{1} on doit trouvé l'@ une seule fois
        //[a-zA-Z0-9.-_]+ : autorisation après l'@
        // [.]{1} le point a retrouver qu'une seule fois
        // [a-z]: signfie qu'après le . uniquement en minuscule [2,4} et nombre de lettres autorisées : 2min 4max
        // $ fin de notre expresion régulière



/*-----------------------------------------------------------------------------
      Formulaire
      Envoi des données au serveur   
--------------------------------------------------------------------------------*/        

//l’objet contact envoyé au serveur doit contenir les champs firstName, lastName, address, city et email. 
//Le tableau des produits envoyé au back-end doit être un array de strings product-ID. 

//on vient cibler le bouton 'commander' du formulaire
const order = document.getElementById('order');

//au click du bouton "Commander"
order.addEventListener('click', (event) => {
event.preventDefault();

//si le panier est vide, on crée una alerte
if (productLocalStorage == null || productLocalStorage == 0) {
  alert(`Votre panier est vide, merci de sélectionner des produits pour passer une commande`);
}
//sinon, si tous les champs sont renseignés correctement
else{
  if(firstNameValidation() && lastNameValidation() && addressValidation() && cityValidation() && emailValidation()){ // il faut que les fonctions soient true (&&)

//on crée un objet contact
    let contact= {
        firstName:firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,
    };

//et on envoi le formulaire pour le mettre ds le local storage
    localStorage.setItem('contact', JSON.stringify(contact)); // JSON.stringify=> convertir l'objet (formulaire) en chaine de caractères
    alert( "Votre commande a bien été prise en compte");

//puis on crée un tableau de tous les IDs des articles du panier
    let productID = [];
    for (let a = 0; a < productLocalStorage.length; a++) {
      productID.push(productLocalStorage[a].id);
    }
//on crée un objet à envoyer au serveur
    let order = {  //avec le formulaire
      contact: {
        firstName:firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value,
      },
      products: productID, // et le tableau des IDs à transmettre
    };
console.log(order);


//Fonction pour envoyer les données au serveur
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          const orderId = data.orderId;
          window.location.href = 'confirmation.html?orderId=' + orderId;
        })
        .catch((err) => {
          console.error(err);
          alert('erreur: ' + err);
        });
    }

    else{
      alert("Merci de renseigner correctement tous les champs du formulaire avant de valider votre commande.");
    }
  } 
});
