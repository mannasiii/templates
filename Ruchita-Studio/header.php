<?php
$pageTitle = $pageTitle ?? "Ruchita Studio | Beauty, Art & Care";
$pageDescription = $pageDescription ?? "Thoughtful beauty services and curated essentials at Ruchita Studio.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES) ?>">
<meta name="theme-color" content="#f6f0e8">
<title><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/theme1.css" id="activeTheme">
</head>
<body>
<header class="site-header">
     <div class="theme-switcher"><div class="container theme-switcher-inner"><span class="theme-label">CHOOSE YOUR PALETTE</span><div class="theme-options">
  <button class="theme-btn active" data-theme="theme1" type="button"><span class="theme-dot mocha"></span><span>Mocha</span></button>
  <button class="theme-btn" data-theme="theme2" type="button"><span class="theme-dot burgundy"></span><span>Burgundy</span></button>
  <button class="theme-btn" data-theme="theme3" type="button"><span class="theme-dot sage"></span><span>Sage</span></button>
  <button class="theme-btn" data-theme="theme4" type="button"><span class="theme-dot blue"></span><span>Dusty Blue</span></button>
  <button class="theme-btn" data-theme="theme5" type="button"><span class="theme-dot charcoal"></span><span>Charcoal</span></button>
 </div></div></div>

 
 <div class="container nav-wrap">
  <a href="#home" class="brand" aria-label="Ruchita Studio home"><span class="brand-mark">R</span><span class="brand-copy"><strong>Ruchita</strong><small>STUDIO · BEAUTY & CARE</small></span></a>
  <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation" aria-expanded="false"><i class="bi bi-list"></i></button>
  <nav class="main-nav" id="mainNav"><a href="#home">Home</a><a href="#services">Services</a><a href="#shop">Shop</a><a href="#gallery">Gallery</a><a href="#about">Our story</a><a href="#faq">FAQs</a></nav>
  <div class="nav-actions"><button class="icon-btn cart-open" aria-label="Open shopping bag"><i class="bi bi-bag"></i><span class="cart-count">0</span></button><a href="#booking" class="button button-small">Book a visit <i class="bi bi-arrow-up-right"></i></a></div>
 </div>

</header>