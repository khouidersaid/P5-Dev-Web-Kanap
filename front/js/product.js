var searchParams = new URLSearchParams(location.search);
console.log(searchParams.get("id"));
fetch("http://localhost:3000/api/products/" + searchParams.get("id"))
  .then((response) => response.json())
  .then((product) => {
    renderProduct(product);
    updatePageTitle(product.name);
  })

  .catch((err) => {
    const errBloc = document.querySelector(".item");
    errBloc.innerHTML = `Une erreur est survenue (${err})`;
  });

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
