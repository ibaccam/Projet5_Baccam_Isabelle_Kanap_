
/*-----------------------------------------------------------------------------
        Faire le lien entre un produit de la page d'accueil et la page Produit
--------------------------------------------------------------------------------*/

//Fonction pour récupérer l'ID du produit dans l'URL/
function getProductId() {
    return new URL(location.href).searchParams.get('id')  // utilisation de l'objet "URL" et de "searchParams"
}


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

function displayProductIdType(productIdType) { // fonction pour afficher les produits //on peut donner n'importe quel nom mais il faut qu'il soit rappelé avec "l'argument.champs"
    document.querySelector('.item__img').innerHTML =
        `<img src="${productIdType.imageUrl}" alt="${productIdType.altTxt}">`
    document.getElementById('title').innerHTML = productIdType.name
    document.getElementById('price').innerHTML = productIdType.price
    document.getElementById('description').innerHTML = productIdType.description
   
    //boucle for...of pour les couleurs
    for (const color of productIdType.colors) { //Pour chaque couleur existante dans le produit
    document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>` //crée selon les données du produit
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
    
    //console.log(btn_ajouterPanier) 

    // il faut vérifier que le choix de couleur et de quantité est valide
    if (color=="" || quantity<1 || quantity>100 || quantity==="") {
        alert(`Merci de sélectionner une couleur et/ou une quantité entre 1 et 100.`);
    } 
    
    else { 
        // on récupère les valeurs du produit choisi dans un objet
        let choixProduct = {
            id: productId,
            //name: productIdType.name,
            //img: productIdType.imageUrl,
            color: color,
            quantity: parseInt(quantity) //parseInt convertit un string en number
        }
    console.log(choixProduct)




/*---------------------------------------------------------------------
        Stockage des valeurs dans le local storage
----------------------------------------------------------------------*/
//Il est nécessaire d’utiliser localStorage pour pouvoir accéder à cet array depuis la page Panier.

        //Déclaration d'une variable dans laquelle se trouve les valeurs du local storage
        let productLocalStorage = JSON.parse (localStorage.getItem("panier"));
        //JSON.parse convertit les données JSON du localStorage en objet Javascript 
        //Lit ds le local storage, cette méthode renvoie la valeur de la clé correspondante "panier"

 

        //si nous avons déjà des produits dans le local storage 
        if(productLocalStorage) { 
    
            //il faut vérifier si le produit est déjà présent dans le panier (même id + même couleur), 
            //Création de la constante qui identifie un article avec même ID et Même couleur
            //La find()méthode exécute une fonction pour chaque élément du tableau.
            let article= productLocalStorage.find((article) => article.id == choixProduct.id && article.color == choixProduct.color); 
   
            //Si c'est le cas=>  on ajoute la nouvelle quantité à l'ancienne qté du produit correspondant dans l’array
            if (article) {
                const newQuantity  = article.quantity + choixProduct.quantity; // attention pour faire la somme il faut définir valeur des quantités
                console.log(newQuantity)
            
                //Si la somme dépasse 100, on ne peut pas ajouter au panier et il faut alerter l'utilisateur
                if (newQuantity > 100) {
                    return alert("Vous n'avez pas la possibilité de commander plus de 100 articles identique.")
                }

                // puis on réassigne une nouvelle quantité
                article.quantity = newQuantity;
                localStorage.setItem("panier", JSON.stringify(productLocalStorage));
                //set.Item : cette méthode ajoute cette clé et cette valeur dans le stockage. Si la clé existe déjà, elle met à jour la valeur
                //puis je dois convertir les données en JSON avec .strignify              
            }
        
    
            //si ce n'est pas le cas => l'article n'existe pas déjà dans le localstorage, on le push
            else{
                productLocalStorage.push(choixProduct); //je récupère le choix de l'utilisateur
                localStorage.setItem("panier", JSON.stringify(productLocalStorage));
            //set.Item : cette méthode ajoute cette clé et cette valeur dans le stockage. 
            //puis je dois convertir les données en JSON avec .strignify
            }   
        }

        // sinon s'il n'existe aucun produit dans le local storage
        // on ajoute un produit au panier et crée un nouvel élément dans l’array.
        else{
            productLocalStorage=[];  //alors je crée un tableau 
            productLocalStorage.push(choixProduct); //où je récupère le choix de l'utilisateur
            localStorage.setItem("panier", JSON.stringify(productLocalStorage));//mais je dois créer la clé et envoyer la donnée en objet Javascript
        //set.Item : cette méthode ajoute cette clé et cette valeur dans le stockage. Si la clé existe déjà, elle met à jour la valeur
        //puis je dois convertir les données en JSON avec .strignify
        }
  
        window.alert("votre produit a été ajouté au panier")
        //window.location.href = "cart.html" permet de renvoyer vers le panier
    }   
})
