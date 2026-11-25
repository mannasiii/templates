// WhatsApp actions are wired in main.js and cart.js. This file is kept separate
// so future WhatsApp integrations can be added without mixing UI/cart logic.
window.addEventListener("DOMContentLoaded",()=>{window.showToast=window.showToast||showToast;});