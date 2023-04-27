import * as tools from "./index.js"

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let seenCart = document.getElementById("cart__items");
  let cartNull = `veuillez ajouter des produits à votre panier`;

  if (cart === null || cart.length === 0) {
    seenCart.innerHTML += cartNull; 
  } else {
    cart.forEach((cartItem) => {
      fetch("http://localhost:3000/api/products/" + cartItem._id)
        .then((response) => response.json())
        .then((product) => {
          let cartItemHTML = `
            <article class="cart__item" data-id="${product._id}" data-color="${product.colors[0]}">
              <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${product.name}</h2>
                  <p>${product.colors[0]}</p>
                  <p>${(product.price / 100).toFixed(2)} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="qty">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
          `;
          seenCart.innerHTML += cartItemHTML;
        })
        .catch ((err) => {
          let seenCart = document.getElementById("cart__items");
          seenCart.innerHTML = `Une erreur est survenue (${(err)})`;
        });
    });
  }
}

displayCartItems();



//activer le bouton supprimer dans le panier

let deleteItem = document.getElementsByClassName("deleteItem");
console.log(deleteItem);
//ajouter l'évènement click au btn supprimer

deleteItem.addEventListner("click", function(){
  //sélectionner le produit à supprimer
let deleteProduct= document.getElementsById("product._id")

//supprimer l'élément de panier
deleteProduct.parentNode.removeChild(product._id);
});






/*for (let k = 0; k < deleteItem.length; k++)
{
  deleteItem[k].addEventListener("click" , (event) =>{
    event.preventDefault();
    console.log(event);
  })
}*/


















let cartTotal = 0;

for (let i = 0; i < cart.length; i++) {
 cartTotal = product.price * cartItem.qty;
}
             
// Afficher le prix total dans le panier
document.querySelector("#cart__price").textContent = `${cartTotal} €`;
