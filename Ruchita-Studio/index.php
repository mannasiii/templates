<?php
$pageTitle = "Ruchita Studio | Beauty, Art & Care";
$pageDescription = "A thoughtful beauty and self-care experience. Explore services, curated essentials and appointments at Ruchita Studio.";
$whatsappNumber = "919892960099"; // Replace with your WhatsApp number including country code, without +.

function loadJson($file) {
    if (!is_file($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : [];
}
$services = loadJson(__DIR__ . "/assets/json/services.json");
$products = loadJson(__DIR__ . "/assets/json/products.json");
include __DIR__ . "/header.php";
?>
<main>
    <section class="hero section-pad" id="home">
        <div class="container hero-grid">
            <div class="hero-copy">
                <span class="eyebrow"><span class="eyebrow-line"></span> THE ART OF FEELING BEAUTIFUL</span>
                <h1>Beauty is a ritual.<br><em>Make it yours.</em></h1>
                <p class="hero-lead">A little time for yourself can change everything. Discover thoughtful beauty services and handpicked essentials, made to help you feel effortlessly you.</p>
                <div class="hero-actions">
                    <a class="button" href="#services">Explore services <i class="bi bi-arrow-up-right"></i></a>
                    <a class="text-link" href="#shop">Discover the shop <i class="bi bi-arrow-right"></i></a>
                </div>
                <div class="hero-note"><span class="note-stars">★★★★★</span><span>Personalised care, made with love</span></div>
            </div>
            <div class="hero-visual">
                <div class="hero-image-main"></div>
                <div class="hero-image-small"></div>
                <div class="hero-stamp"><span>R</span><small>Ruchita<br>Studio</small></div>
                <div class="hero-caption">
                    <!-- <span>01 / 05</span> -->
                    <!-- <span>YOUR MOMENT, YOUR GLOW</span> -->
                </div>
            </div>
        </div>
        <div class="hero-bottom container"><span>BEAUTY · CARE · CONFIDENCE</span><span>SCROLL TO EXPLORE <i class="bi bi-arrow-down"></i></span></div>
    </section>

    <section class="intro-strip">
        <div class="container intro-inner"><span>AN EXPERIENCE THAT FEELS LIKE YOU</span><p>Thoughtful details. A personal touch. <em>A beautiful you.</em></p><span>EST. WITH LOVE</span></div>
    </section>

    <section class="section-pad services-section" id="services">
        <div class="container">
            <div class="section-heading">
                <div><span class="eyebrow">01 — OUR SERVICES</span><h2>Little luxuries.<br><em>Lasting confidence.</em></h2></div>
                <div class="heading-side"><p>From everyday refreshes to your most special occasions, find the care that feels just right.</p><a class="text-link" href="#booking">Plan your visit <i class="bi bi-arrow-up-right"></i></a></div>
            </div>
            <div class="service-grid">
                <?php foreach ($services as $service): ?>
                <article class="service-card">
                    <div class="service-image" style="background-image:url('<?= htmlspecialchars($service['image'] ?? '') ?>')"><span class="service-number"><?= htmlspecialchars($service['number'] ?? '01') ?></span></div>
                    <div class="service-info"><div><h3><?= htmlspecialchars($service['name'] ?? '') ?></h3><p><?= htmlspecialchars($service['description'] ?? '') ?></p></div><button class="round-arrow service-enquire" type="button" data-service="<?= htmlspecialchars($service['name'] ?? '', ENT_QUOTES) ?>" aria-label="Enquire about <?= htmlspecialchars($service['name'] ?? '') ?>"><i class="bi bi-arrow-up-right"></i></button></div>
                    <?php if (!empty($service['price'])): ?><span class="service-price"><?= htmlspecialchars($service['price']) ?></span><?php endif; ?>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section class="shop-section section-pad" id="shop">
        <div class="container">
            <div class="section-heading">
                <div><span class="eyebrow">02 — THE STUDIO SHOP</span><h2>Good things for<br><em>your everyday glow.</em></h2></div>
                <div class="heading-side"><p>A considered collection of little favourites to bring the studio feeling home.</p><span class="shop-note">CURATED WITH CARE · MADE FOR YOU</span></div>
            </div>
            <div class="product-grid">
                <?php foreach ($products as $product): ?>
                <article class="product-card">
                    <div class="product-image-wrap">
                        <img src="<?= htmlspecialchars($product['image'] ?? '') ?>" alt="<?= htmlspecialchars($product['name'] ?? 'Ruchita Studio product') ?>" loading="lazy">
                        <?php if (!empty($product['tag'])): ?><span class="product-tag"><?= htmlspecialchars($product['tag']) ?></span><?php endif; ?>
                        <button class="add-to-cart" type="button" data-product-id="<?= htmlspecialchars((string)($product['id'] ?? '')) ?>"><i class="bi bi-bag-plus"></i> Add to bag</button>
                    </div>
                    <div class="product-info"><div><h3><?= htmlspecialchars($product['name'] ?? '') ?></h3><p><?= htmlspecialchars($product['short_description'] ?? '') ?></p></div><strong>₹<?= number_format((float)($product['price'] ?? 0)) ?></strong></div>
                </article>
                <?php endforeach; ?>
            </div>
            <p class="shop-footnote">Your order will be confirmed personally on WhatsApp. No online payment required.</p>
        </div>
    </section>

    <section class="story-section section-pad" id="about">
        <div class="container story-grid">
            <div class="story-visual"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85" alt="Beauty products and makeup brushes" loading="lazy"><span class="story-seal">A PERSONAL<br>TOUCH, ALWAYS</span></div>
            <div class="story-copy"><span class="eyebrow">03 — OUR PHILOSOPHY</span><h2>Because feeling good<br>is <em>always in style.</em></h2><p>At Ruchita Studio, beauty is never about becoming someone else. It is about celebrating what makes you, you. Every service is approached with care, attention and a love for the little details.</p><p>Whether you are getting ready for a celebration or simply making space for yourself, we want every visit to feel warm, personal and special.</p><a class="button button-outline" href="#booking">Get to know us <i class="bi bi-arrow-up-right"></i></a><div class="signature">With love, <span>Ruchita</span></div></div>
        </div>
    </section>

    <section class="gallery-section section-pad" id="gallery">
        <div class="container">
            <div class="section-heading compact-heading"><div><span class="eyebrow">04 — THE MOODBOARD</span><h2>A glimpse of <em>our world.</em></h2></div><p>Beauty in the details. Moments worth keeping.</p></div>
            <div class="gallery-grid">
                <a href="https://i.pinimg.com/736x/bd/d3/a4/bdd3a43a2d230f30c233b16e60e6b489.jpg" class="gallery-item gallery-tall" target="_blank" rel="noopener"><img src="https://i.pinimg.com/736x/bd/d3/a4/bdd3a43a2d230f30c233b16e60e6b489.jpg" alt="Natural beauty portrait" loading="lazy"><span>01 / THE GLOW</span></a>
                <a href="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=90" class="gallery-item" target="_blank" rel="noopener"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85" alt="Makeup tools" loading="lazy"><span>02 / THE DETAILS</span></a>
                <a href="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=90" class="gallery-item" target="_blank" rel="noopener"><img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=85" alt="Beauty products" loading="lazy"><span>03 / THE RITUAL</span></a>
                <a href="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=90" class="gallery-item gallery-wide" target="_blank" rel="noopener"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85" alt="Makeup collection" loading="lazy"><span>04 / THE ARTISTRY</span></a>
            </div>
        </div>
    </section>

    <section class="testimonial-section section-pad">
        <div class="container testimonial-inner"><span class="eyebrow">05 — KIND WORDS</span><div class="quote-mark">“</div><blockquote>It is the little details, the warmth and the personal attention that make an experience truly special.</blockquote><div class="quote-stars">★★★★★</div><p class="quote-author">A NOTE FROM OUR STUDIO</p><div class="testimonial-dots"><span class="active"></span><span></span><span></span></div></div>
    </section>

    <section class="faq-section section-pad" id="faq">
        <div class="container faq-grid"><div><span class="eyebrow">06 — GOOD TO KNOW</span><h2>A few things<br><em>you may wonder.</em></h2><p>Have another question? Send us a message and we’ll be happy to help.</p><a class="text-link" href="#booking">Talk to the studio <i class="bi bi-arrow-up-right"></i></a></div>
            <div class="faq-list">
                <details open><summary>How do I book an appointment?<i class="bi bi-plus-lg"></i></summary><p>Fill in the appointment form below or enquire directly on WhatsApp. We will connect with you to confirm the date and details.</p></details>
                <details><summary>Do I need to pay online to place an order?<i class="bi bi-plus-lg"></i></summary><p>No. Add your favourites to the bag and send your order on WhatsApp. Payment and delivery details can be discussed directly.</p></details>
                <details><summary>Can I ask for a customised service?<i class="bi bi-plus-lg"></i></summary><p>Absolutely. Share what you have in mind through WhatsApp and we will help you understand the options.</p></details>
                <details><summary>Where is Ruchita Studio located?<i class="bi bi-plus-lg"></i></summary><p>Please contact us for the current service area and appointment availability.</p></details>
            </div>
        </div>
    </section>

    <section class="booking-section section-pad" id="booking">
        <div class="container booking-grid">
            <div class="booking-copy"><span class="eyebrow">07 — YOUR MOMENT STARTS HERE</span><h2>Let's make time<br>for <em>you.</em></h2><p>Tell us a little about what you are looking for. We’ll take it from there, one lovely detail at a time.</p><div class="booking-contact"><span><i class="bi bi-whatsapp"></i> Personal appointment assistance</span><span><i class="bi bi-heart"></i> Thoughtful care, always</span></div></div>
            <form class="booking-form" id="bookingForm">
                <div class="form-heading"><span>APPOINTMENT ENQUIRY</span><small>* Required fields</small></div>
                <div class="form-row"><label>Your name *<input type="text" name="name" placeholder="Name" required></label><label>Phone number *<input type="tel" name="phone" placeholder="Your number" required></label></div>
                <div class="form-row"><label>Service you’re interested in *<select name="service" required><option value="">Choose a service</option><?php foreach ($services as $service): ?><option value="<?= htmlspecialchars($service['name'] ?? '') ?>"><?= htmlspecialchars($service['name'] ?? '') ?></option><?php endforeach; ?><option value="Not sure yet">Not sure yet</option></select></label><label>Preferred date<input type="date" name="date"></label></div>
                <label>A note for us<textarea name="message" rows="3" placeholder="Tell us anything that will help us prepare..."></textarea></label>
                <button class="button form-submit" type="submit">Send appointment enquiry <i class="bi bi-arrow-up-right"></i></button>
                <small class="form-privacy">This form opens WhatsApp with your enquiry. Your details are not stored on this website.</small>
            </form>
        </div>
    </section>
</main>
<?php include __DIR__ . "/footer.php"; ?>