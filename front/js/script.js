fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
        return res.json();
    }
  })
  .then((datas) => {
    let html = ""
    datas.forEach(element => {
        html += `<a href="./product.html?id=${element._id}">
        <article>
          <img src=${element.imageUrl} alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`
    });
    const section = document.getElementById("items")
    section.innerHTML=html
  })
  .catch((err) => {
    const section = document.getElementById("items")
    section.innerHTML = `Une erreur est survenue (${(err)})`
  });
