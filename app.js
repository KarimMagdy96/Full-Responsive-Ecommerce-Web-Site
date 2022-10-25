const bars = document.getElementById("bars");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
//div container for cart and num
const cartbtn = document.querySelector(".cart-btn");
const mCartbtn = document.querySelector(".mCart-btn");
const closeCartBtn = document.querySelector(".close-mycart");
const clearCartBtn = document.querySelector(".clear-cart");
const cardDom = document.querySelector(".mycart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-itemsNum");
const mCartItems = document.querySelector(".mCart-itemsNum");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".mycart-content");
const productsDom = document.querySelector(".pro-container");
const nproductsDom = document.querySelector(".npro-container");

//open and close nav bar tablet
// ##################################################

bars.addEventListener("click", () => {
  nav.classList.add("active");
});
close.addEventListener("click", () => {
  nav.classList.remove("active");
});

//##############################################

// cart functionality
let cart = [];
let buttonDom = [];

//get prodacts
class getAllProdacts {
  async getProdact() {
    try { 
      let result = await fetch('products.json')
      let data = await result.json();
      let finaldata= data.items
      finaldata=finaldata.map(prodact=>{
        const{title,price}=prodact.fields
        const{id} =prodact.sys
        let imge = prodact.fields.image.fields.file.url;
        return { title, price, id, imge };
      })
      return finaldata;
    }
    catch (error) {
      console.log(error);
    }
  }
}

// ######################################################################
//display my prodacts
class displayProdacts {
  //show products on dom
ui(prodacts){
  let result=``;
  let newresult=``;
  let myownprodacts=[...prodacts]
let nprodact = myownprodacts.splice(8,);
let oldprodact = myownprodacts.splice(0, 8);
  oldprodact.forEach((prodact) => {
    result += `
      <div class="pro">
            <img src=${prodact.imge} alt="t-shrit">
            <div class="des">
                <span>adidas</span>
                <h5>${prodact.title}</h5>
                <div class="star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <h4>$${prodact.price}</h4>
            </div>
          <button class="bag-btn cart"data-id=${prodact.id} >
              + 
          </button>
        </div>
    
    
    `;
  });
nprodact.forEach(nprodacts=>{
  newresult += `

      <div class="pro">
            <img src=${nprodacts.imge} alt="t-shrit">
            <div class="des">
                <span>adidas</span>
                <h5>${nprodacts.title}</h5>
                <div class="star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <h4>$${nprodacts.price}</h4>
            </div>
           <button class="bag-btn cart"data-id=${nprodacts.id} >
            + 
            </button>
        </div>
  `;
})
productsDom.innerHTML=result
nproductsDom.innerHTML = newresult;


}

//get btns on cart to work 
getbagButtons(){
const btn = [...document.querySelectorAll(".bag-btn")];
buttonDom=btn
btn.forEach(item=>{
  let id = item.dataset.id;
  let inCart= cart.find(item=>item.id===id)
  if(inCart){
    btn.innerHTML = '<i class="fa fa-check"></i>';
    btn.disabled= true;
  }
    item.addEventListener("click", (event) => {
      event.target.innerHTML = '<i class="fa fa-check"></i>';
      event.target.disabled=true
      //get prodact from prodacts
      //add amount prop to the item i have
      let cartItem= {...storgeProdacts.getprodact(id),amount:1}
      //push item to cart array + save old items in cart 
      // add prodact to cart 
      cart=[...cart,cartItem]
      //save cart to local storage
      storgeProdacts.saveCart(cart);  
      //set cart values
      this.setCartValus(cart)
      //display item to cart dom
      this.addCartItemsDom(cartItem);
      //show cart
      this.showCart()

    });
})

}
setCartValus(cart){
  let itemCount = 0
  let itemTPrice =0
  cart.map((item) => {
    itemTPrice += item.price * item.amount;
     itemCount += item.amount;
  });
  cartTotal.innerHTML=parseFloat(itemTPrice.toFixed(2))
  cartItems.innerHTML = itemCount;
  mCartItems.innerHTML = itemCount;
 
}
addCartItemsDom(item){
  const div= document.createElement('div')
  div.classList.add("cart-item");
  div.innerHTML = `
    <img src=${item.imge} alt="prodact">
    <div>
        <h4>${item.title}</h4>
        <h5>${item.price}$</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
        <i class="fa fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fa fa-chevron-down" data-id=${item.id}></i>
    </div>`;
    cartContent.appendChild(div)
    console.log(cartContent )
}
showCart(){
cartOverlay.classList.add("transparentBcg");
cardDom.classList.add("showCart");
}
  setupApp(){
    //chek local storge for any data and update cart with it & update cart values
    cart = storgeProdacts.getCartSataus();
    this.setCartValus(cart)
    this.populateCart(cart)
 }
 populateCart(cart){
  cart.forEach(item=>this.addCartItemsDom(item))
  cartbtn.addEventListener('click',()=>{
    this.showCart()
  })
  mCartbtn.addEventListener('click',()=>{
    this.showCart()
  })
  closeCartBtn.addEventListener('click',()=>{
    this.hideCart()
  })
 }
 hideCart(){
  cartOverlay.classList.remove("transparentBcg");
  cardDom.classList.remove("showCart");
 }
 cartLogic(){
  clearCartBtn.addEventListener('click',()=>{
    this.clearCart()
  })
  cartContent.addEventListener('click',(e)=>{
    if(e.target.classList.contains('remove-item')){
      let removeItem=e.target;
      let id = removeItem.dataset.id
      this.removeitems(id);
      cartContent.removeChild(removeItem.parentElement.parentElement);
    }
    else if (e.target.classList.contains("fa-chevron-up")) {
      let addAmount = e.target;
      let id = addAmount.dataset.id;
      let item= cart.find(item=>item.id===id);
      item.amount=item.amount+1;
      storgeProdacts.saveCart(cart)
      this.setCartValus(cart)
    addAmount.nextElementSibling.innerHTML=item.amount
    }else if (e.target.classList.contains("fa-chevron-down")) {
      let lowertarget =e.target
      let id= lowertarget.dataset.id
      let item =cart.find(item=>item.id===id)
      item.amount = item.amount - 1;
      if(item.amount>0){
        storgeProdacts.saveCart(cart);
        this.setCartValus(cart);
        lowertarget.previousElementSibling.innerHTML=item.amount
      }else{
        cartContent.removeChild(lowertarget.parentElement.parentElement);
        this.removeitems(id)
      }
    }
  })
 }
 clearCart(){
  //get ids for items inside cart
  let cartitems= cart.map(item=>item.id)
  cartitems.forEach(id=>this.removeitems(id))
  while(cartContent.children.length>0){
    cartContent.removeChild(cartContent.children[0])
  }
this.hideCart();
 }
 removeitems(id){
  cart= cart.filter(item=>item.id !== id)
  this.setCartValus(cart)
  storgeProdacts.saveCart(cart)
  let button= this.getsinglebtn(id)
  button.disabled=false
  button.innerHTML='+ '

 }
 getsinglebtn(id){
  return buttonDom.find(btn=>btn.dataset.id===id)
 }
}
// ################################################################################
//store prodacts to local storge
// ###########################################################################################
class storgeProdacts {
  static saveProdacts(prodacts) {
    localStorage.setItem("prodacts", JSON.stringify(prodacts));
  }
  static getprodact(id) {
    let prodacts = JSON.parse(localStorage.getItem("prodacts"));
    return prodacts.find((prodact) => prodact.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCartSataus(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[];
  }
}
// #############################################################
document.addEventListener("DOMContentLoaded", () => {
    const showprodacts = new displayProdacts();
    const myprodacts = new getAllProdacts();
  showprodacts.setupApp();
    //setupApp cheak cart valus from lose when refresh
//get my prodacts

  myprodacts.getProdact().then(prodacts=>{
    showprodacts.ui(prodacts)
    storgeProdacts.saveProdacts(prodacts)
  }).then(()=>{
    showprodacts.getbagButtons();
    showprodacts.cartLogic();
  });
});
// cart -end
