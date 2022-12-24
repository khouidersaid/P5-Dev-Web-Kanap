// Faire une demande à l'adresse "http://localhost:3000/api/products" et obtenir une réponse
fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      // Si la réponse est "ok", la convertir en JSON et la retourner
        return res.json();
    }
  })
  .then((datas) => {
    console.log(datas)
    let html = ""
    // Pour chaque élément dans les données JSON
    datas.forEach(element => {
      // Générer une chaîne HTML pour l'élément actuel en utilisant les données de l'élément
        html += `<a href="./product.html?id=${element._id}">
        <article>
          <img src=${element.imageUrl} alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`
    });
    // Récupérer l'élément HTML avec l'id "items"
    const section = document.getElementById("items")
    section.innerHTML=html
  })
  .catch((err) => {
    const section = document.getElementById("items")
    //Afficher un message d'érreur 
    section.innerHTML = `Une erreur est survenue (${(err)})`
  });


