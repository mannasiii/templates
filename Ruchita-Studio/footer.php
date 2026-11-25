<footer class="site-footer">
 <div class="container footer-grid">
  <div class="footer-about"><a class="brand footer-brand" href="#home"><span class="brand-mark">R</span><span class="brand-copy"><strong>Ruchita</strong><small>STUDIO · BEAUTY & CARE</small></span></a><p>Beauty, art and personal care — thoughtfully brought closer to you.</p><div class="footer-socials"><a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="#" class="footer-whatsapp" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a></div></div>
  <div class="footer-links"><h4>Explore</h4><a href="#services">Our services</a><a href="#shop">Studio shop</a><a href="#gallery">Gallery</a><a href="#about">Our story</a><a href="#faq">FAQs</a></div>
  <div class="footer-links"><h4>Let’s connect</h4><a href="#booking">Book an appointment</a><a href="#booking">Custom enquiries</a><a href="#shop">Product orders</a><a href="#contact">Contact the studio</a></div>
  <div class="footer-contact"><h4>A little hello?</h4><p>We’d love to hear from you.</p><a href="#booking"><i class="bi bi-calendar-heart"></i> Make an enquiry</a><a href="#" class="footer-whatsapp"><i class="bi bi-whatsapp"></i> Chat on WhatsApp</a></div>
 </div>
 <div class="footer-bottom"><div class="container footer-bottom-inner"><p>© <?= date('Y') ?> Ruchita Studio. All rights reserved.</p><p class="footer-credit">Made with <i class="bi bi-heart-fill"></i> by <a href="https://pixeora.tech" target="_blank" rel="noopener noreferrer">Pixeora</a></p></div></div>
</footer>
<div class="drawer-overlay" id="drawerOverlay"></div>
<aside class="cart-drawer" id="cartDrawer" aria-hidden="true" aria-label="Shopping bag">
 <div class="drawer-head"><div><span class="eyebrow">YOUR PICKS</span><h3>Your Shopping Bag <span class="drawer-count">(0)</span></h3></div><button class="icon-btn drawer-close" aria-label="Close bag"><i class="bi bi-x-lg"></i></button></div>
 <div class="cart-items" id="cartItems"><div class="cart-empty"><i class="bi bi-bag-heart"></i><h4>Your bag is waiting</h4><p>Add something lovely from our collection.</p><button class="button" id="continueShopping">Continue shopping</button></div></div>
 <div class="drawer-foot"><div class="subtotal-row"><span>Subtotal</span><strong id="cartSubtotal">₹0</strong></div><small>Delivery charges, if any, will be confirmed on WhatsApp.</small><button class="button checkout-button" id="whatsappCheckout">Checkout on WhatsApp <i class="bi bi-whatsapp"></i></button></div>
</aside>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script>
window.RUCHITA_CONFIG = {
 whatsapp: <?= json_encode($whatsappNumber ?? "919892960099") ?>,
 products: <?= json_encode($products ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?>
};
</script>
<script src="assets/js/main.js"></script><script src="assets/js/cart.js"></script><script src="assets/js/whatsapp.js"></script><script src="assets/js/theme-switcher.js"></script>
</body></html>