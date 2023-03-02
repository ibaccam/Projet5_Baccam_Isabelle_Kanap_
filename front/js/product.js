
/*-----------------------------------------------------------------------------
        Faire le lien entre un produit de la page d'accueil et la page Produit
--------------------------------------------------------------------------------*/

//Fonction pour récupérer l'ID du produit dans l'URL/
function getProductId() {
    return new URL(location.href).searchParams.get('id')  // utilisation de l'objet "URL" et de "searchParams"
}
// Déclaration d'une constante pour identifier l'ID du produit //on peut donner n'importe quel nom
//const productId = getProductId() 





/*-----------------------------------------------------------------------------
        Récupérer l'ID du produit affiché
--------------------------------------------------------------------------------*/

//Fonction pour récupérer le produit par rapport à son ID
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
        Insérer et afficher un produit et ses détails dans la page Produit
--------------------------------------------------------------------------------*/

//Fonction pour afficher les caractéristiques du produit sur la page :
// img src - Nom - Prix - Description - Couleur

function displayProductIdType(productIdType) { // fonction pour afficher les produits //on peut donner n'importe quel nom mais il faut qu'il soit rappelé avec le "".champs"
    document.querySelector('.item__img').innerHTML =
        `<img src="${productIdType.imageUrl}" alt="${productIdType.altTxt}">`
    document.getElementById('title').innerHTML = productIdType.name
    document.getElementById('price').innerHTML = productIdType.price
    document.getElementById('description').innerHTML = productIdType.description
   
    //boucle for...of pour les couleurs
    for (const color of productIdType.colors) {
    document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`
    }
}


//Fonction pour lancer la récupération de l'ID, ses caractéristiques et l'affichage du produit identifié
async function main() { //Une fonction asynchrone peut appeler une fonction qui retourne une promesse ou une fonction asynchrone en spécifiant le mot-clé await.
    // On récupère d'abord l'id du produit dans l'url
    const productId = getProductId() //valeur de l'ID // // Déclaration d'une constante pour identifier l'ID du produit
    //console.log(productId)
    
    // On récupère les caractéristiques du produit grâce à l'id
    const productIdType = await getProductIdData(productId) // poductIdType = valeur des caractéristqiues et attend de récupérer l'ID pour identifier les caractéristiques
    //console.log(product)
    
    // Puis on l'affiche
    displayProductIdType(productIdType)

         
};
main();




/*---------------------------------------------------------------------
        Ajouter des produits dans le panier
----------------------------------------------------------------------*/
//Récupération des données sélectionnées par l'utilisateur et envoi du panier


//Sélection du bouton Ajouter au panier
const btn_ajouterPanier = document.getElementById("addToCart")

//Ecouter le bouton au click
btn_ajouterPanier.addEventListener("click", (event)=>{

    //valeur de l'ID du produit
    const productId = getProductId() 
    //valeur de la quantité choisie par l'utilisateur
    const quantity = document.getElementById('quantity').value
    //valeur de la couleur choisie par l'utilisateur
    const color = document.getElementById('colors').value
    const productIdType = getProductIdData(productId)

        //console.log(btn_ajouterPanier) 

    // on récupère les valeurs du produit choisit dans un objet
    let choixProduct = {
        id: productId,
        //name: productIdType.name,
        //img: productIdType.imageUrl,
        color: color,
        quantity: quantity,
    }
    console.log(choixProduct)

})
