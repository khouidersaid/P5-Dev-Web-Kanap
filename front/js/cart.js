



/*//Ajout du produit au panier
addToCart(product);
//Afficher les produits du panier
displayCart();




//Attacher l'événement click sur le bouton "Ajouter au panier"
let addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", handleAddToCartClick);

let url = button.getAttribute("data-url");
window.location.href = url;*/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
let cart = getCart();
console.log(cart)
//localStorage.clear();

let seenCart = document.getElementById("cart__items");
console.log(seenCart)
let cartNull = `veuillez ajouter des produits à votre pannier`;
    console.log(cartNull)


function said () {
if (cart === null || cart == 0) {
    seenCart.innerHTML += cartNull; 
}


else {
    for (let i=0; i < cart.length; i++){  
      document.querySelector("#cart__items").innerHTML +=
      `<article class="cart__item" data-id="${cart[i].option}">
      <article class="cart__item" data-id="${cart[i].color}">
         <div class="cart__item__img">
             <img src="${cart[i].image}" alt="${cart[i].alt}">
         </div>
         <div class="cart__item__content">
             <div class="cart__item__content__titlePrice">
                 <h2>${cart[i].title}</h2>
                 <p>${cart[i].price * cart[i].qty} €</p>
             </div>
             <div class="cart__item__content__settings">
                 <div class="cart__item__content__settings__quantity">
                     <p>Couleur : ${cart[i].color}</p>
                     <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${cart[i].option}" canapeColor="${cart[i].color}" value="${cart[i].qty}">
                 </div>
                 <div class="cart__item__content__settings__delete">
                     <p class="deleteItem" canapeId="${cart[i].option}" canapeColor="${cart[i].color}">Supprimer</p>
                 </div>
             </div>
         </div>
     </article>
 </article>`;
        }    
    } 
}
said();


//fonction pour afficher le prix
function totalP () {
  //cibler l'élément Id pour afficher le prix
  let ttl = document.getElementById("totalPrice");
  //console.log(ttl);
  let ttlp = [];
  //console.log(ttlp)
  for (let j=0; j < cart.length; j++){ 
  let calcul = parseInt(
    cart[j].price * cart[j].qty
  );
  ttlp.push(calcul)
  //aditionner les prix qui sont dans le tableau avec la méthode reducer
  const initialValue = 0;
    let priceFinal = ttlp.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
  ttl.innerHTML = priceFinal;
 }
}
totalP()



//fonction pour afficher la quantité
function totalQ () {
  //cibler l'élément Id pour afficher le prix
  let qtt = document.getElementById("totalQuantity");
  //console.log(ttl);
  let qttG = [];
  //console.log(ttlp)
  for (let k=0; k < cart.length; k++){ 
  let calculator = parseInt(
  cart[k].qty
  );
  qttG.push(calculator)

  const initialValue = 0;
  let qttFinal = qttG.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  qtt.innerHTML = qttFinal;

 }
}
totalQ()



// activer le boutton supprimer dans le pannier

let btnDelete = document.querySelectorAll(".deleteItem");
console.log(btnDelete);

for (let d = 0; d < btnDelete.length; d++){  
btnDelete[d].addEventListener("click" , (Event) => {
  Event.preventDefault();
  //la méthode filter pour selectionner les elements à garder et je supprime l'élément où le btn supprimer à été cliqué
  let productDelete = cart[d].option;
  console.log(productDelete);
  cart = cart.filter(element => element.option !== productDelete);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
  
}
)
}