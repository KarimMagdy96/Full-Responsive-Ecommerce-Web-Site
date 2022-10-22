const bars = document.getElementById("bars");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");


  bars.addEventListener("click", () => {nav.classList.add("active")});
  close.addEventListener('click',()=>{
    nav.classList.remove('active')
  })
