document.addEventListener("DOMContentLoaded",()=>{
const form=document.getElementById("appointmentForm"),msg=document.getElementById("formMessage");
form.addEventListener("submit",e=>{e.preventDefault();if(!form.checkValidity()){form.classList.add("was-validated");return}
msg.style.display="block";msg.textContent="Thanks! Your appointment request is ready for the clinic to receive. Connect this form to email/CRM before launch.";form.reset();form.classList.remove("was-validated")});
document.querySelectorAll("#nav a[href^='#']").forEach(a=>a.addEventListener("click",()=>{const n=document.getElementById("nav");if(n.classList.contains("show"))bootstrap.Collapse.getOrCreateInstance(n).hide()}));
});