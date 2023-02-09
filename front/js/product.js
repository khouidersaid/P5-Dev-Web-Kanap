var searchParams = new URLSearchParams(location.search);
console.log(searchParams.get("id"));

const productId =  searchParams.get("id");

fetch("http://localhost:3000/api/products/"+  productId)         //searchParams.get("id"))
  .then((response) => response.json())
  .then((product) => {
    renderProduct(product);
    updatePageTitle(product.name);
    
    document.querySelector("#addToCart").addEventListener("click",() => addToCart(product));
  })



  .catch((err) => {
    const errBloc = document.querySelector(".item");
    errBloc.innerHTML = `Une erreur est survenue (${err})`;
  });

  document.addEventListener('DOMContentLoaded', function() {
    // code
  })


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
    const input = document.getElementById("quantity");
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


function updateCart(cart) // Met à jour le panier ->
{
  // todo
}

//Fonction pour ajouter un produit au panier
function addToCart(product) {
  console.log(product) // OK

  //récupérer la couleur de produit
  const choosenColor = document.querySelector('#colors').value
  
  //afficher un message si le client n'a pas choisi une couleur
  if (!choosenColor) {
    alert('Veuillez sélectionner une couleur')
  }


  // Récupérer la quantité sélectionné 
  const productquantity = document.querySelector('#quantity').value
  // Si quantité < 1 : Erreur
  if (!productquantity) {
    alert('veuillez choisir une quantité')
  }

  
  let newItem = {
    qty: parseInt  (productquantity),
    option: productId,
    price: product.price,
    color: choosenColor,
    image: product.imageUrl,
    alt: product.altTxt,
    description: product.description,
    title: product.name
  };


  /*if (cart) {
    const found = cart.find(
      (element)=>
      element.option == newItem.option &&
      element.color == newItem.color
    );
    if (found) {
      let newQuantity = newItem.qty + found.qty;
    found.qty = newQuantity;
  } else {
    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
        }
   }*/
    


  //Récupération des produits existants dans le panier
  let cart = getCart();
  //Ajout du produit au panier
  cart.push(newItem);
  //Mise à jour du panier dans le localStorage

  // updateCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
     }


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

  



















