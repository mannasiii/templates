<?php

/* =========================================================
   MANASI RANE — WEBSITE DESIGN SHOWCASE
   ---------------------------------------------------------
   Automatically detects website folders.

   Example:
   /apex/index.html
   /salon/index.html
   /cycles/index.html

   No manual registration required.
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

$rootPath = __DIR__;

$entryFiles = [
    'index.html',
    'index.htm',
    'index.php'
];


/*
 * Folders that should NOT be treated as websites.
 */
$ignoredFolders = [
    '.well-known',
    'assets',
    'asset',
    'css',
    'js',
    'javascript',
    'images',
    'image',
    'img',
    'uploads',
    'upload',
    'fonts',
    'font',
    'vendor',
    'node_modules',
    'includes',
    'include',
    'admin',
    'api',
    'config',
    'storage',
    'backup',
    'backups',
    'tmp',
    'temp',
    'logs'
];


/* =========================================================
   CATEGORY CONFIGURATION
========================================================= */

$categories = [

    'salon' => [
        'salon',
        'spa',
        'beauty',
        'parlour',
        'parlor',
        'hair',
        'barber',
        'makeup'
    ],

    'cycles' => [
        'cycle',
        'cycles',
        'bicycle',
        'bicycles',
        'bike',
        'bikes',
        'cycling'
    ],

    'e-commerce' => [
        'shop',
        'store',
        'ecommerce',
        'e-commerce',
        'fashion',
        'clothing',
        'product',
        'products',
        'jewellery',
        'jewelry'
    ],

    'portfolio' => [
        'portfolio',
        'designer',
        'photography',
        'photographer',
        'agency',
        'creative',
        'studio'
    ],

    'business' => [
        'business',
        'company',
        'corporate',
        'industry',
        'industrial',
        'steel',
        'engineering',
        'construction',
        'realestate',
        'real-estate'
    ]
];


/* =========================================================
   HELPER — FIND ENTRY FILE
========================================================= */

function findEntryFile($directory, $entryFiles)
{
    foreach ($entryFiles as $file) {

        $path = $directory . DIRECTORY_SEPARATOR . $file;

        if (is_file($path) && is_readable($path)) {
            return $file;
        }
    }

    return false;
}


/* =========================================================
   HELPER — CLEAN DISPLAY NAME
========================================================= */

function formatName($folderName)
{
    $name = $folderName;

    /*
     * Replace separators.
     */
    $name = str_replace(
        ['-', '_', '.'],
        ' ',
        $name
    );

    /*
     * CamelCase → Camel Case
     */
    $name = preg_replace(
        '/([a-z])([A-Z])/',
        '$1 $2',
        $name
    );

    /*
     * Multiple spaces.
     */
    $name = preg_replace(
        '/\s+/',
        ' ',
        $name
    );

    return ucwords(trim($name));
}


/* =========================================================
   HELPER — CATEGORY DETECTION
========================================================= */

function detectCategory($folderName, $categories)
{
    $name = strtolower($folderName);

    foreach ($categories as $category => $keywords) {

        foreach ($keywords as $keyword) {

            if (strpos($name, strtolower($keyword)) !== false) {
                return $category;
            }
        }
    }

    return 'business';
}


/* =========================================================
   HELPER — CATEGORY LABEL
========================================================= */

function categoryLabel($category)
{
    $labels = [
        'salon' => 'Salon',
        'cycles' => 'Cycles',
        'e-commerce' => 'E-commerce',
        'portfolio' => 'Portfolio',
        'business' => 'Business'
    ];

    return $labels[$category] ?? 'Business';
}


/* =========================================================
   HELPER — SAFE URL
========================================================= */

function websiteUrl($folder)
{
    return './' . rawurlencode($folder) . '/';
}


/* =========================================================
   SCAN WEBSITE FOLDERS
========================================================= */

$websites = [];

$items = @scandir($rootPath);

if ($items !== false) {

    foreach ($items as $item) {

        /* Ignore . and .. */
        if ($item === '.' || $item === '..') {
            continue;
        }


        /* Ignore current index */
        if (strtolower($item) === 'index.php') {
            continue;
        }


        /* Ignore hidden folders */
        if (strpos($item, '.') === 0) {
            continue;
        }


        /* Ignore configured folders */
        if (
            in_array(
                strtolower($item),
                array_map('strtolower', $ignoredFolders),
                true
            )
        ) {
            continue;
        }


        $fullPath =
            $rootPath .
            DIRECTORY_SEPARATOR .
            $item;


        /* Only directories */
        if (!is_dir($fullPath)) {
            continue;
        }


        /* Check for website entry */
        $entryFile = findEntryFile(
            $fullPath,
            $entryFiles
        );


        if ($entryFile === false) {
            continue;
        }


        /* Detect category */
        $category = detectCategory(
            $item,
            $categories
        );


        /* Add website */
        $websites[] = [

            'folder' => $item,

            'name' => formatName($item),

            'category' => $category,

            'category_label' =>
                categoryLabel($category),

            'url' =>
                websiteUrl($item),

            'entry' =>
                $entryFile
        ];
    }
}


/* =========================================================
   SORT
========================================================= */

usort(
    $websites,
    function ($a, $b) {

        return strcasecmp(
            $a['name'],
            $b['name']
        );
    }
);


$totalWebsites = count($websites);

$currentYear = date('Y');

?>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    Manasi Rane — Website Designs
</title>

<meta
    name="description"
    content="Website designs and digital experiences by Manasi Rane."
>

<link rel="preconnect" href="https://fonts.googleapis.com">

<link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap"
    rel="stylesheet"
>


<style>

/* =========================================================
   ROOT
========================================================= */

:root {

    --cream: #f7f6f0;

    --cream-dark: #eeeee6;

    --white: #ffffff;

    --ink: #17211d;

    --muted: #707a74;

    --line: #dfe3dc;

    --blue: #d9ecf4;

    --blue-dark: #9fc5d6;

    --jade: #b7c5ad;

    --jade-dark: #879b7e;

    --shadow:
        0 20px 60px rgba(31, 45, 38, .08);

    --radius: 22px;

}


/* =========================================================
   RESET
========================================================= */

* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;

}


html {

    scroll-behavior: smooth;

}


body {

    background: var(--cream);

    color: var(--ink);

    font-family: "DM Sans", sans-serif;

    line-height: 1.6;

}


a {

    color: inherit;

    text-decoration: none;

}


button,
input {

    font: inherit;

}


/* =========================================================
   CONTAINER
========================================================= */

.container {

    width: min(92%, 1240px);

    margin: auto;

}


/* =========================================================
   HEADER
========================================================= */

header {

    position: sticky;

    top: 0;

    z-index: 100;

    background:
        rgba(247, 246, 240, .88);

    backdrop-filter: blur(16px);

    border-bottom:
        1px solid rgba(23, 33, 29, .07);

}


.navbar {

    min-height: 78px;

    display: flex;

    align-items: center;

    justify-content: space-between;

}


.logo {

    display: flex;

    align-items: center;

    gap: 11px;

    font-weight: 700;

    letter-spacing: -.4px;

}


.logo-mark {

    width: 38px;

    height: 38px;

    display: grid;

    place-items: center;

    border-radius: 12px;

    background:
        var(--blue);

    color: var(--ink);

    font-size: 13px;

    font-weight: 700;

}


.logo-text {

    font-size: 17px;

}


.logo-text span {

    color: var(--muted);

    font-weight: 500;

}


.nav-link {

    color: var(--muted);

    font-size: 13px;

}


.nav-link:hover {

    color: var(--ink);

}


/* =========================================================
   HERO
========================================================= */

.hero {

    padding:
        120px 0 105px;

}


.hero-inner {

    max-width: 850px;

}


.eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 9px;

    padding:
        7px 12px;

    border:
        1px solid var(--line);

    border-radius: 50px;

    background: var(--white);

    color: var(--muted);

    font-size: 11px;

    margin-bottom: 27px;

}


.dot {

    width: 7px;

    height: 7px;

    border-radius: 50%;

    background: var(--jade-dark);

}


.hero h1 {

    font-family:
        "Playfair Display",
        serif;

    font-size:
        clamp(55px, 8vw, 94px);

    line-height: .98;

    letter-spacing: -4px;

    font-weight: 600;

}


.hero h1 em {

    color: var(--jade-dark);

    font-style: italic;

}


.hero-description {

    max-width: 620px;

    margin-top: 28px;

    color: var(--muted);

    font-size: 16px;

}


.hero-bottom {

    margin-top: 42px;

    display: flex;

    align-items: center;

    gap: 15px;

    flex-wrap: wrap;

}


.hero-button {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding:
        13px 19px;

    border-radius: 12px;

    background: var(--ink);

    color: white;

    font-size: 12px;

    font-weight: 600;

    transition: .25s ease;

}


.hero-button:hover {

    transform:
        translateY(-2px);

}


.hero-note {

    color: var(--muted);

    font-size: 11px;

}


/* =========================================================
   SOFT INFO BAR
========================================================= */

.info-bar {

    border-top:
        1px solid var(--line);

    border-bottom:
        1px solid var(--line);

    background:
        rgba(255,255,255,.38);

}


.info-inner {

    min-height: 76px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

}


.info-item {

    color: var(--muted);

    font-size: 12px;

}


.info-item strong {

    color: var(--ink);

}


/* =========================================================
   SHOWCASE
========================================================= */

.showcase {

    padding:
        105px 0 120px;

}


.section-top {

    display: flex;

    justify-content: space-between;

    align-items: end;

    gap: 30px;

    margin-bottom: 38px;

}


.section-label {

    text-transform: uppercase;

    letter-spacing: 2px;

    color: var(--jade-dark);

    font-size: 10px;

    font-weight: 700;

    margin-bottom: 9px;

}


.section-title {

    font-family:
        "Playfair Display",
        serif;

    font-size:
        clamp(39px, 5vw, 58px);

    line-height: 1;

    letter-spacing: -2px;

}


.section-description {

    max-width: 380px;

    color: var(--muted);

    font-size: 13px;

}


/* =========================================================
   TOOLBAR
========================================================= */

.toolbar {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 18px;

    margin-bottom: 28px;

}


.filters {

    display: flex;

    gap: 8px;

    flex-wrap: wrap;

}


.filter-btn {

    border:
        1px solid var(--line);

    background:
        rgba(255,255,255,.55);

    color: var(--muted);

    padding:
        9px 14px;

    border-radius: 50px;

    cursor: pointer;

    font-size: 11px;

    transition: .25s ease;

}


.filter-btn:hover {

    color: var(--ink);

    border-color:
        var(--blue-dark);

}


.filter-btn.active {

    background: var(--ink);

    color: white;

    border-color: var(--ink);

}


.search {

    width: 230px;

}


.search input {

    width: 100%;

    border:
        1px solid var(--line);

    background:
        rgba(255,255,255,.7);

    border-radius: 12px;

    outline: none;

    padding:
        10px 13px;

    color: var(--ink);

    font-size: 11px;

}


.search input:focus {

    border-color:
        var(--blue-dark);

}


/* =========================================================
   GRID
========================================================= */

.design-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 22px;

}


/* =========================================================
   DESIGN CARD
========================================================= */

.design-card {

    background: var(--white);

    border:
        1px solid var(--line);

    border-radius:
        var(--radius);

    overflow: hidden;

    box-shadow:
        0 8px 30px
        rgba(31,45,38,.035);

    transition:
        transform .35s ease,
        box-shadow .35s ease;

}


.design-card:hover {

    transform:
        translateY(-7px);

    box-shadow:
        var(--shadow);

}


/* =========================================================
   PREVIEW
========================================================= */

.preview {

    height: 265px;

    background: var(--blue);

    overflow: hidden;

    position: relative;

}


.preview iframe {

    width: 100%;

    height: 100%;

    border: 0;

    background: white;

    pointer-events: none;

    transform-origin:
        top left;

}


/*
 * Preview overlay.
 * Clicking anywhere opens the actual website.
 */

.preview-link {

    position: absolute;

    inset: 0;

    z-index: 5;

}


/* =========================================================
   CARD CONTENT
========================================================= */

.card-content {

    padding:
        21px 22px 22px;

}


.card-top {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 10px;

    margin-bottom: 13px;

}


.category {

    display: inline-flex;

    padding:
        5px 9px;

    border-radius: 50px;

    background: var(--blue);

    color: #476879;

    font-size: 9px;

    text-transform: uppercase;

    letter-spacing: 1px;

    font-weight: 700;

}


.status {

    color: var(--jade-dark);

    font-size: 9px;

    text-transform: uppercase;

    letter-spacing: 1px;

    font-weight: 700;

}


.card-title {

    font-family:
        "Playfair Display",
        serif;

    font-size: 25px;

    line-height: 1.15;

    letter-spacing: -.5px;

}


.card-domain {

    margin-top: 5px;

    color: var(--muted);

    font-family: monospace;

    font-size: 10px;

}


.visit {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    margin-top: 18px;

    font-size: 11px;

    font-weight: 700;

}


.visit span {

    transition: .2s ease;

}


.visit:hover span {

    transform:
        translateX(4px);

}


/* =========================================================
   EMPTY
========================================================= */

.empty {

    grid-column:
        1 / -1;

    text-align: center;

    padding: 80px 20px;

    border:
        1px dashed var(--line);

    border-radius:
        var(--radius);

    color: var(--muted);

}


.empty h3 {

    color: var(--ink);

    font-family:
        "Playfair Display",
        serif;

    font-size: 26px;

    margin-bottom: 5px;

}


/* =========================================================
   CTA
========================================================= */

.cta-section {

    padding:
        0 0 120px;

}


.cta {

    position: relative;

    overflow: hidden;

    padding:
        75px 35px;

    border-radius:
        28px;

    background:
        linear-gradient(
            135deg,
            var(--blue),
            #e8eee5
        );

    text-align: center;

}


.cta::after {

    content: "";

    position: absolute;

    width: 350px;

    height: 350px;

    border-radius: 50%;

    right: -100px;

    top: -180px;

    background:
        rgba(255,255,255,.4);

}


.cta-content {

    position: relative;

    z-index: 2;

}


.cta h2 {

    font-family:
        "Playfair Display",
        serif;

    font-size:
        clamp(38px, 5vw, 60px);

    line-height: 1;

    letter-spacing: -2px;

}


.cta p {

    max-width: 500px;

    margin:
        17px auto 25px;

    color: #586761;

    font-size: 13px;

}


.cta-button {

    display: inline-flex;

    padding:
        13px 19px;

    border-radius: 11px;

    background: var(--ink);

    color: white;

    font-size: 11px;

    font-weight: 700;

}


/* =========================================================
   FOOTER
========================================================= */

footer {

    border-top:
        1px solid var(--line);

    padding:
        30px 0;

}


.footer-inner {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

}


.footer-copy {

    color: var(--muted);

    font-size: 10px;

}


.footer-right {

    color: var(--muted);

    font-size: 10px;

}


/* =========================================================
   MOBILE
========================================================= */

@media(max-width: 950px) {

    .design-grid {

        grid-template-columns:
            repeat(2, 1fr);

    }

}


@media(max-width: 650px) {

    .navbar {

        min-height: 68px;

    }


    .hero {

        padding:
            85px 0 80px;

    }


    .hero h1 {

        font-size: 53px;

        letter-spacing: -2.5px;

    }


    .info-inner {

        flex-wrap: wrap;

        padding:
            20px 0;

    }


    .info-item {

        width: 45%;

    }


    .section-top {

        flex-direction: column;

        align-items: flex-start;

    }


    .toolbar {

        flex-direction: column;

        align-items: stretch;

    }


    .search {

        width: 100%;

    }


    .design-grid {

        grid-template-columns: 1fr;

    }


    .preview {

        height: 245px;

    }


    .cta {

        padding:
            60px 20px;

    }


    .footer-inner {

        flex-direction: column;

        align-items: flex-start;

    }

}

</style>

</head>


<body>


<!-- =====================================================
     HEADER
===================================================== -->

<header>

    <div class="container navbar">

        <a href="./" class="logo">

            <div class="logo-mark">
                MR
            </div>

            <div class="logo-text">
                Manasi Rane
                <span> / Web Design</span>
            </div>

        </a>


        <a
            href="#designs"
            class="nav-link"
        >
            View Designs →
        </a>

    </div>

</header>



<!-- =====================================================
     HERO
===================================================== -->

<section class="hero">

    <div class="container">

        <div class="hero-inner">

            <div class="eyebrow">

                <span class="dot"></span>

                <?= $totalWebsites ?>
                <?= $totalWebsites === 1 ? 'design' : 'designs' ?>
                available

            </div>


            <h1>

                Websites made to
                <em>stand out.</em>

            </h1>


            <p class="hero-description">

                A collection of website designs,
                concepts and digital experiences
                created for modern businesses.

            </p>


            <div class="hero-bottom">

                <a
                    href="#designs"
                    class="hero-button"
                >
                    Explore Designs
                    <span>↓</span>
                </a>


                <span class="hero-note">

                    New designs are added regularly.

                </span>

            </div>

        </div>

    </div>

</section>



<!-- =====================================================
     INFO BAR
===================================================== -->

<div class="info-bar">

    <div class="container info-inner">

        <div class="info-item">

            <strong>
                <?= $totalWebsites ?>
            </strong>

            live designs

        </div>


        <div class="info-item">

            <strong>
                Responsive
            </strong>

            by default

        </div>


        <div class="info-item">

            <strong>
                Mobile
            </strong>

            ready

        </div>


        <div class="info-item">

            <strong>
                Fresh
            </strong>

            concepts

        </div>

    </div>

</div>



<!-- =====================================================
     DESIGN SHOWCASE
===================================================== -->

<section
    class="showcase"
    id="designs"
>

    <div class="container">


        <div class="section-top">

            <div>

                <div class="section-label">
                    Selected Work
                </div>

                <h2 class="section-title">
                    Explore my designs.
                </h2>

            </div>


            <p class="section-description">

                Browse website concepts by category
                and open any design to see the
                complete experience.

            </p>

        </div>



        <!-- =================================================
             FILTERS
        ================================================== -->

        <div class="toolbar">


            <div class="filters">

                <button
                    class="filter-btn active"
                    data-category="all"
                >
                    All
                </button>


                <button
                    class="filter-btn"
                    data-category="salon"
                >
                    Salon
                </button>


                <button
                    class="filter-btn"
                    data-category="cycles"
                >
                    Cycles
                </button>


                <button
                    class="filter-btn"
                    data-category="business"
                >
                    Business
                </button>


                <button
                    class="filter-btn"
                    data-category="e-commerce"
                >
                    E-commerce
                </button>


                <button
                    class="filter-btn"
                    data-category="portfolio"
                >
                    Portfolio
                </button>

            </div>



            <div class="search">

                <input
                    type="search"
                    id="searchInput"
                    placeholder="Search designs..."
                    autocomplete="off"
                >

            </div>

        </div>



        <!-- =================================================
             DESIGN GRID
        ================================================== -->

        <div
            class="design-grid"
            id="designGrid"
        >


            <?php if ($totalWebsites === 0): ?>


                <div class="empty">

                    <h3>
                        No designs yet.
                    </h3>

                    <p>
                        Upload a website folder
                        containing index.html
                        and it will appear here automatically.
                    </p>

                </div>


            <?php else: ?>


                <?php foreach ($websites as $site): ?>


                    <article
                        class="design-card"
                        data-category="<?= htmlspecialchars(
                            $site['category'],
                            ENT_QUOTES,
                            'UTF-8'
                        ) ?>"
                        data-search="<?= htmlspecialchars(
                            strtolower(
                                $site['name']
                                . ' '
                                . $site['folder']
                                . ' '
                                . $site['category_label']
                            ),
                            ENT_QUOTES,
                            'UTF-8'
                        ) ?>"
                    >


                        <!-- PREVIEW -->

                        <div class="preview">

                            <iframe
                                src="<?= htmlspecialchars(
                                    $site['url'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>"
                                loading="lazy"
                                title="<?= htmlspecialchars(
                                    $site['name'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>"
                            ></iframe>


                            <a
                                class="preview-link"
                                href="<?= htmlspecialchars(
                                    $site['url'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>"
                                target="_blank"
                                rel="noopener"
                                aria-label="Open <?= htmlspecialchars(
                                    $site['name'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>"
                            ></a>

                        </div>



                        <!-- CARD CONTENT -->

                        <div class="card-content">


                            <div class="card-top">

                                <span class="category">

                                    <?= htmlspecialchars(
                                        $site['category_label'],
                                        ENT_QUOTES,
                                        'UTF-8'
                                    ) ?>

                                </span>


                                <span class="status">

                                    ● Live

                                </span>

                            </div>



                            <h3 class="card-title">

                                <?= htmlspecialchars(
                                    $site['name'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>

                            </h3>



                            <div class="card-domain">

                                /<?= htmlspecialchars(
                                    $site['folder'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>/

                            </div>



                            <a
                                class="visit"
                                href="<?= htmlspecialchars(
                                    $site['url'],
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>"
                                target="_blank"
                                rel="noopener"
                            >

                                View Design

                                <span>
                                    →
                                </span>

                            </a>

                        </div>

                    </article>


                <?php endforeach; ?>


                <div
                    class="empty"
                    id="noResults"
                    style="display:none;"
                >

                    <h3>
                        No matching designs.
                    </h3>

                    <p>
                        Try another category or search term.
                    </p>

                </div>


            <?php endif; ?>


        </div>

    </div>

</section>



<!-- =====================================================
     CTA
===================================================== -->

<section class="cta-section">

    <div class="container">

        <div class="cta">

            <div class="cta-content">

                <div class="section-label">
                    Let's Build
                </div>


                <h2>
                    Have a project in mind?
                </h2>


                <p>

                    Let's create a website that
                    looks beautiful and works
                    beautifully.

                </p>


                <a
                    href="mailto:hello@example.com"
                    class="cta-button"
                >

                    Start a Project →

                </a>

            </div>

        </div>

    </div>

</section>



<!-- =====================================================
     FOOTER
===================================================== -->

<footer>

    <div class="container footer-inner">

        <div class="footer-copy">

            © <?= $currentYear ?>
            Manasi Rane.
            All rights reserved.

        </div>


        <div class="footer-right">

            Website Design & Development

        </div>

    </div>

</footer>



<!-- =====================================================
     JAVASCRIPT
===================================================== -->

<script>


/* =========================================================
   FILTER + SEARCH
========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const cards =
    document.querySelectorAll(".design-card");

const searchInput =
    document.getElementById("searchInput");

const noResults =
    document.getElementById("noResults");


let activeCategory = "all";


function filterDesigns() {

    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    let visible = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category || "";

        const searchable =
            card.dataset.search || "";


        const categoryMatch =
            activeCategory === "all"
            ||
            category === activeCategory;


        const searchMatch =
            searchable.includes(search);


        if (
            categoryMatch &&
            searchMatch
        ) {

            card.style.display = "";

            visible++;

        } else {

            card.style.display = "none";

        }

    });


    if (noResults) {

        noResults.style.display =
            visible === 0
            ? "block"
            : "none";

    }

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            activeCategory =
                button.dataset.category;


            filterDesigns();

        }
    );

});


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterDesigns
    );

}


</script>


</body>

</html>
