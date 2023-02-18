
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

let cart = getCart();
let seenCart = document.getElementById("cart__items");
let cartNull = `veuillez ajouter des produits à votre panier`;

function displayCartItems() {
  if (cart === null || cart.length === 0) {
    seenCart.innerHTML += cartNull; 
  } else {
    fetch("http://localhost:3000/api/products/")
      .then((response) => response.json())
      .then((products) => {
        cart.forEach((cartItem) => {
          const product = products.find((p) => p._id === cartItem._id);
          if (product) {
            document.querySelector("#cart__items").innerHTML +=
              `<article class="cart__item" data-id="${cartItem._id}">
                  <article class="cart__item" data-id="${cartItem.color}">
                     <div class="cart__item__img">
                         <img src="${product.imageUrl}" alt="${product.altTxt}">
                     </div>
                     <div class="cart__item__content">
                         <div class="cart__item__content__titlePrice">
                             <h2>${product.name}</h2>
                             <p>${product.price * cartItem.qty} €</p>
                         </div>
                         <div class="cart__item__content__settings">
                             <div class="cart__item__content__settings__quantity">
                                 <p>Couleur : ${cartItem.color}</p>
                                 <p>Qté : </p>
                                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${cartItem._id}" canapeColor="${cartItem.color}" value="${cartItem.qty}">
                             </div>
                             <div class="cart__item__content__settings__delete">
                                 <p class="deleteItem" canapeId="${cartItem._id}" canapeColor="${cartItem.color}">Supprimer</p>
                             </div>
                         </div>
                     </div>
                 </article>
             </article>`;  
          }
        });
      })
      .catch((err) => console.error(err));
  }
 
}

displayCartItems();


let cartTotal = 0;

for (let i = 0; i < cart.length; i++) {
 cartTotal += product.price * cartItem.qty;
}
             
// Afficher le prix total dans le panier
document.querySelector("#cart__price").textContent = `${cartTotal} €`;


