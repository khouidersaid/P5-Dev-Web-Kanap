fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
        return res.json();
    }
  })
  .then((datas) => {
    console.log(datas)
    let html = ""
    datas.forEach(element => {
        html += `<a href="./product.html?id=${element.id}">
        <article>
          <img src=${element.imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
      </a>`
    });
    const section = document.getElementById("items")
    section.innerHTML=html
  })
  .catch((err) => {});

