

/*------------------------------------------------
    Affichage des produits dans la page d'accueil
--------------------------------------------------*/

//Fonction pour récupérer l'ensemble des produits de l'API//
function getProducts() { 
    return fetch("http://localhost:3000/api/products") //chemin de la ressource qu’on souhaite récupérer//
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

//Fonction pour afficher les produits de l'API sur la page d'accueil//
function displayProduct(product) { // fonction pour afficher les produits
    document.getElementById('items').innerHTML +=  // getElementById() permet de récupérer les informations d'une balise identifiée par son id. // .innerHTML crée les nouveaux élements dans le DOM
        `<a href="./product.html?_id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;
}

//Fonction pour lancer la récupération et l'affichage de chaque produit de la liste//
async function main() { // fonction qui va attendre 
    const data = await getProducts() // la récupèration des produit pour se lancer
    for (product of data) { // pour chaque article de la liste (boucle)
        displayProduct(product) // A afficher
    }
}

main(); //appel de la fonction