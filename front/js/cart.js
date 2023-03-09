/*-----------------------------------------------------------------------------
        Afficher un tableau récapitulatif des achats dans le panier
--------------------------------------------------------------------------------*/

//On récupère les valeurs du local storage
let productLocalStorage = JSON.parse (localStorage.getItem("panier"));
console.log(productLocalStorage)
//JSON.parse convertit les données JSON du localStorage en objet Javascript 
 //Lit ds le local storage, cette méthode renvoie la valeur de la clé correspondante "panier"
productLocalStorage=[];  //et je crée un tableau



//Fonction pour récupérer l'ensemble des produits de l'API//
function getProducts() { 
    return fetch("http://localhost:3000/api/products") // chemin de la ressource qu’on souhaite récupérer//
        .then(function(response){
            return response.json() // retourne la réponse en format json (retourne une promesse contenant la réponse)
        })
        .then(function(data) {
            return data // récupération de la valeur du résultat json précédent
        })
        .catch(function (error) {   // retourner valeur si erreur de l'opération fetch
            error = `Erreur echec du chargement, merci de relancer votre demande.`;
            alert(error);
        })
}


