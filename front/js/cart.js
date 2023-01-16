
//Fonction pour ajouter un produit au panier
function addToCart(product) {
    //Récupération des produits existants dans le panier
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    //Ajout du produit au panier
    cart.push(product);
    //Mise à jour du panier dans le localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  //Fonction pour récupérer les produits du panier
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  //Fonction pour afficher les produits du panier
  function displayCart() {
    let cart = getCart();
    let cartContainer = document.getElementById("cart-container");
    //Vider le conteneur avant de l'afficher
    cartContainer.innerHTML = "";
    //Parcourir les produits du panier
    cart.forEach((product) => {
      //Création d'un élément pour afficher le produit
      let productEl = document.createElement("div");
      productEl.innerHTML = `${product.name} - ${product.price} €`;
      cartContainer.appendChild(productEl);
    });
  }
  
  //Fonction pour gérer l'événement click sur le bouton "Ajouter au panier"
  function handleAddToCartClick(event) {
    //Récupération des données du produit
    let product = {
      _id: event.target.getAttribute("data-product-id"),
      name: event.target.getAttribute("data-product-name"),
      price: event.target.getAttribute("data-product-price"),
      quantity: 1,
    };
    //Ajout du produit au panier
    addToCart(product);
    //Afficher les produits du panier
    displayCart();
  }
  
  //Attacher l'événement click sur le bouton "Ajouter au panier"
  let addToCartButton = document.getElementById("add-to-cart-button");
  addToCartButton.addEventListener("click", handleAddToCartClick);
  