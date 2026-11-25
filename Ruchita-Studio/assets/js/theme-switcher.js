document.addEventListener("DOMContentLoaded",()=>{
 const buttons=[...document.querySelectorAll(".theme-btn")],link=document.getElementById("activeTheme");
 const names=["theme1","theme2","theme3","theme4","theme5"];
 function apply(name){if(!names.includes(name)||!link)return;link.href=`assets/css/${name}.css`;buttons.forEach(b=>b.classList.toggle("active",b.dataset.theme===name));localStorage.setItem("ruchitaTheme",name);}
 buttons.forEach(b=>b.addEventListener("click",()=>apply(b.dataset.theme)));
 apply(localStorage.getItem("ruchitaTheme")||"theme1");
});