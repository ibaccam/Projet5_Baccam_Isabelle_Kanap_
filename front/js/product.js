
//Fonction pour récupérer l'ID du produit//
function getProductId() {
    return new URL(location.href).searchParams.get('id')
}

const productId = getProductId()

//Fonction pour récupérer le produit par rapport à son iD
fetch(`http://localhost:3000/api/products/${productId}`)//chemin de la ressource qu’on souhaite récupérer//
       
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


