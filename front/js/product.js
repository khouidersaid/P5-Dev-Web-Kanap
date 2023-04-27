import * as tools from "./index.js";

var searchParams = new URLSearchParams(location.search);
const productId = searchParams.get("id");

//envoyer la riquette fetch pour récuperer la reponse json.
fetch("http://localhost:3000/api/products/" + productId) //searchParams.get("id"))
  .then((response) => response.json())
  .then((product) => {
    renderProduct(product);
    updatePageTitle(product.name);

    document
      // ajouter un ecouteur d'évenemnt.
      .querySelector("#addToCart")
      // attacher l'écouteur d'evenment click au bouton.
      .addEventListener("click", () => addToCart(product._id));
  })
  //afficher un message d’erreur à l’utilisateur lorsqu’une erreur se produit dans la chaîne de promesse.
  .catch((err) => {
    const errBloc = document.querySelector(".item");
    errBloc.innerHTML = `Une erreur est survenue (${err})`;
  });








// afficher les informations de produit dans la page product.
function renderProduct(product) {
  //console.log(product);
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








//Fonction pour ajouter un produit au panier
function addToCart(productId) {
  //récupérer la couleur de produit
  const choosenColor = document.querySelector("#colors").value;

  //afficher un message si le client n'a pas choisi une couleur
  if (!choosenColor) {
    alert("Veuillez sélectionner une couleur");
    return;
  }

  // Récupérer la quantité sélectionné
  const productQuantity = document.querySelector("#quantity").value;
  // Si quantité < 1 : Erreur
  if (productQuantity < 1 || productQuantity > 100) {
    alert("Veuillez choisir une quantité valide");
    return;
  }

  let newItem = {
    _id: productId,
    qty: parseInt(productQuantity),
    color: choosenColor,
  };

  //mettre à jour la quantité si un produit de même couleur et de même id existe déja dans le pannier,
  const cart = tools.getCart();
  if (cart) {
    const found = cart.find(
      (element) => element._id == newItem._id && element.color == newItem.color
    );
    if (found) {
      found.qty += newItem.qty;
    } else {
      //sinon ajouter le nouveau produit au pannier.
      cart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
