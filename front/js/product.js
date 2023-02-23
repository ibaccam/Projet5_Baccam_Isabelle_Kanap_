
//Fonction pour récupérer l'ID du produit//
function getProductID() {
    return new URL(location.href).searchParams.get('id')
}