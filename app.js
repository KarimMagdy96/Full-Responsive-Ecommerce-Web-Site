const bars = document.getElementById("bars");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
//div container for cart and num
const cartbtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-mycart");
const clearCartBtn = document.querySelector(".clear-cart");
const cardDom = document.querySelector(".mycart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-item");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".mycart-content");
const productsDom = document.querySelector(".pro-container");
const nproductsDom = document.querySelector(".npro-container");
const butn = document.querySelector(".bag-btn");
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

class displayProdacts {
  //display my prodacts
ui(prodacts){
  let result=``;
  let newresult=``;
  let myownprodacts=[...prodacts]
let nprodact = myownprodacts.splice(8);
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
            <button class="bag-btn" data-id=${prodact.id}><i class="fa fa-shopping-cart cart"></i></button>
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
            <button class="bag-btn cart" data-id=${nprodacts.id}><i class="fa fa-shopping-cart"></i></button>
        </div>
  `;
})
productsDom.innerHTML=result
nproductsDom.innerHTML = newresult;
}
   
}

class storgeProdacts {
  static saveProdacts(prodacts){
    localStorage.setItem('prodacts',JSON.stringify(prodacts))
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const showprodacts = new displayProdacts();
     
    const myprodacts = new getAllProdacts();
//get my prodacts
  myprodacts.getProdact().then(prodacts=>{
    showprodacts.ui(prodacts)
    storgeProdacts.saveProdacts(prodacts)
  });
});
// cart -end
