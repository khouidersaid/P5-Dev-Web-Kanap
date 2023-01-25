var searchParams = new URLSearchParams(location.search);
console.log(searchParams.get("id"));
fetch("http://localhost:3000/api/products/" + searchParams.get("id"))
  .then((response) => response.json())
  .then((product) => {
    console.log(product)
    renderProduct(product);
    updatePageTitle(product.name);
  })

  .catch((err) => {
    const errBloc = document.querySelector(".item");
    errBloc.innerHTML = `Une erreur est survenue (${err})`;
  });

  document.addEventListener('DOMContentLoaded', function() {
    // code
  })
  document.querySelector("#addToCart").addEventListener("click",addToCart);

function renderProduct(product) {
  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").innerHTML = product.name;
  document.getElementById("price").innerHTML = product.price;
  document.getElementById("description").innerHTML = product.description;
  //la constante "colorList" va référencier l'élément select (Id=colors)
  const colorsList = document.getElementById("colors");
  product.colors.forEach((color) => {
    //pour chaque couleurs créer un élément option
    const colorEl = document.createElement("option");
    //utiliser le nom "color" comme contenu de l'élément
    colorEl.innerHTML = color;
    //utiliser le nom de la couleur comme valeur de l'atribut "value"
    colorEl.value = color;
    //ajouter l'élément crée au parent select
    colorsList.appendChild(colorEl);

    //quantité entre 1 et 100 produits
    var input = document.getElementById("quantity");
    input.setAttribute("value", "1");
  });
}

// Fonction pour mettre à jour le titre de la page en fonction du produit courant
function updatePageTitle(name) {
  // Récupération de la balise title
  let title = document.querySelector("title");

  // Mise à jour du contenu de la balise title avec le nom du produit
  title.innerHTML = name + " - My e-commerce site";
}


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
  let cartContainer = document.getElementById("cart__items");
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
    imageUrl: event.target.getAttribute("data-product-image"),
    description: event.target.getAttribute("data-product-description"),
    colors: event.target.getAttribute("data-product-colors"),
    altTxt: event.target.getAttribute("data-product-alt"),
    quantity: 1,
  };



  
  //Ajout du produit au panier
  addToCart(product);
  //Afficher les produits du panier
  displayCart();
}



//Attacher l'événement click sur le bouton "Ajouter au panier"
let addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", handleAddToCartClick);

let url = button.getAttribute("data-url");
window.location.href = url;


