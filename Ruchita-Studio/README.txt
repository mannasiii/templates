RUCHITA STUDIO — XAMPP PROJECT
================================

INSTALL
1. Extract the Ruchita-Studio folder into: C:\xampp\htdocs\
2. Start Apache from XAMPP Control Panel.
3. Open: http://localhost/Ruchita-Studio/
4. If you rename the folder, use the matching localhost URL.

IMPORTANT FIRST CUSTOMISATION
1. Open index.php.
2. Find: $whatsappNumber = "919892960099";
3. Replace it with the studio WhatsApp number including country code, without +.
   Example format: 919876543210
4. Save and refresh the website.

EDIT SERVICES
Open assets/json/services.json. Each service has:
id, number, name, description, price, image.
Add/edit objects while keeping valid JSON syntax.

EDIT PRODUCTS
Open assets/json/products.json. Each product has:
id, name, short_description, price, tag, image.
Use unique IDs. Prices are numbers (no ₹ sign in JSON).

THEMES
Five theme styles are in assets/css/theme1.css through theme5.css.
Shared layout/components are in assets/css/style.css.
Theme selection is remembered in browser localStorage.

IMAGES
The starter uses remote Unsplash image URLs. Replace image URLs in the JSON
and in index.php with your own licensed studio images when ready.
An internet connection is needed for Google Fonts, Bootstrap Icons and remote photos.

FUNCTIONALITY
- Services load from services.json and enquiry buttons open WhatsApp.
- Products load from products.json.
- Add-to-bag, quantity, remove, subtotal and cart persistence use localStorage.
- Checkout opens WhatsApp with the order summary.
- Booking form opens WhatsApp with appointment details.
- No online payment, login, or server-side customer data storage.
- Mobile navigation and responsive layouts are included.

BEFORE GOING LIVE
- Replace WhatsApp number.
- Replace placeholder social links (#) with actual profiles.
- Replace demo product/service content and photos with the studio's actual details.
- Test on desktop and mobile.
- Configure HTTPS and hosting before publishing.

DESIGN NOTE
This is a complete editable starter based on the supplied project structure and
requirements. Service names, product names, prices, social URLs and imagery are
sample content and should be confirmed by the studio before launch.
