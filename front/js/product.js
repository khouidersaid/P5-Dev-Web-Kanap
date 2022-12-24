var searchParams = new URLSearchParams(location.search);
console.log(searchParams.get("id"));
fetch("http://localhost:3000/api/products/" +searchParams.get("id"))

.then(response => response.json())
  .then(product => {
    document.getElementsByClassName ("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    document.getElementById("title").innerHTML = product.name
    document.getElementById("price").innerHTML = product.price
    document.getElementById("description").innerHTML = product.description  
    //la constante "colorList" va référencier l'élément select (Id=colors)
    const colorsList = document.getElementById("colors");
    product.colors.forEach(color => {
      //pour chaque couleurs créer un élément option
      const colorEl = document.createElement("option")
      //utiliser le nom "color" comme contenu de l'élément
      colorEl.innerHTML = color
      //ajouter l'élément crée au parent select
      colorsList.appendChild(colorEl)
    })
  })
.catch(error => {
    // Gérer les erreurs ici
  });
