<?php
/**
 * FOURTY60 - Automatic Client Website Directory
 * ------------------------------------------------
 * Automatically detects client website folders from
 * the current directory.
 *
 * A folder is considered a client website when it contains:
 *   - index.php
 *   - index.html
 *   - index.htm
 *
 * No manual client registration required.
 */


/* =========================================================
   CONFIGURATION
========================================================= */

$rootPath = __DIR__;

/*
 * Files that identify a directory as an actual website.
 */
$websiteEntryFiles = [
    'index.php',
    'index.html',
    'index.htm'
];

/*
 * Folders that should NEVER appear as client websites.
 *
 * Add server/system folders here if required.
 */
$ignoredFolders = [
    '.well-known',
    'cgi-bin',
    'cgi-bin-bin',
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
    'includes',
    'include',
    'vendor',
    'node_modules',
    'storage',
    'logs',
    'tmp',
    'temp',
    'backup',
    'backups',
    'api',
    'admin',
    'config'
];


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/**
 * Convert domain/folder name into a clean display name.
 *
 * Example:
 * mogalsteelinternational.com
 * →
 * Mogal Steel International
 */
function formatClientName($folderName)
{
    $name = $folderName;

    // Remove common domain extensions
    $extensions = [
        '.com',
        '.in',
        '.net',
        '.org',
        '.co.in',
        '.co.uk',
        '.org.in',
        '.biz',
        '.info',
        '.online',
        '.website',
        '.store',
        '.shop'
    ];

    foreach ($extensions as $extension) {
        if (str_ends_with(strtolower($name), $extension)) {
            $name = substr(
                $name,
                0,
                -strlen($extension)
            );

            break;
        }
    }

    // Replace separators with spaces
    $name = str_replace(
        ['-', '_', '.'],
        ' ',
        $name
    );

    // Add spaces to common camelCase patterns
    $name = preg_replace(
        '/([a-z])([A-Z])/',
        '$1 $2',
        $name
    );

    // Clean multiple spaces
    $name = preg_replace(
        '/\s+/',
        ' ',
        $name
    );

    return ucwords(trim($name));
}


/**
 * Check whether a directory contains
 * a valid website entry file.
 */
function isWebsiteDirectory(
    $directory,
    $entryFiles
) {
    foreach ($entryFiles as $file) {

        $filePath = $directory . DIRECTORY_SEPARATOR . $file;

        if (
            is_file($filePath) &&
            is_readable($filePath)
        ) {
            return true;
        }
    }

    return false;
}


/**
 * Get a simple category based on domain name.
 *
 * This is only a visual label.
 * It does NOT modify the actual website.
 */
function detectCategory($domain)
{
    $domain = strtolower($domain);

    $keywords = [

        'steel' => 'Manufacturing',
        'metal' => 'Manufacturing',
        'metals' => 'Manufacturing',
        'engineering' => 'Engineering',
        'industries' => 'Industry',
        'industrial' => 'Industry',
        'fastener' => 'Manufacturing',
        'fasteners' => 'Manufacturing',
        'valve' => 'Engineering',
        'valves' => 'Engineering',
        'fabrication' => 'Manufacturing',
        'machine' => 'Engineering',
        'machinery' => 'Engineering',
        'tech' => 'Technology',
        'technology' => 'Technology',
        'software' => 'Technology',
        'event' => 'Events',
        'events' => 'Events',
        'restaurant' => 'Hospitality',
        'hotel' => 'Hospitality',
        'food' => 'Food',
        'fashion' => 'Fashion',
        'design' => 'Design',
        'studio' => 'Creative',
        'digital' => 'Digital',
        'marketing' => 'Marketing'
    ];

    foreach ($keywords as $keyword => $category) {

        if (strpos($domain, $keyword) !== false) {
            return $category;
        }
    }

    return 'Business';
}


/**
 * Generate a safe URL for a client folder.
 */
function clientUrl($folderName)
{
    $folderName = rawurlencode($folderName);

    return './' . $folderName . '/';
}


/* =========================================================
   AUTOMATIC CLIENT DETECTION
========================================================= */

$clients = [];

$items = @scandir($rootPath);

if ($items !== false) {

    foreach ($items as $item) {

        /*
         * Ignore . and ..
         */
        if (
            $item === '.' ||
            $item === '..'
        ) {
            continue;
        }


        /*
         * Ignore current index.php
         */
        if (
            strtolower($item) === 'index.php'
        ) {
            continue;
        }


        /*
         * Ignore hidden/system-looking folders
         */
        if (
            str_starts_with($item, '.')
        ) {
            continue;
        }


        /*
         * Ignore configured folders
         */
        if (
            in_array(
                strtolower($item),
                array_map(
                    'strtolower',
                    $ignoredFolders
                ),
                true
            )
        ) {
            continue;
        }


        $fullPath =
            $rootPath .
            DIRECTORY_SEPARATOR .
            $item;


        /*
         * Only directories.
         */
        if (!is_dir($fullPath)) {
            continue;
        }


        /*
         * Only directories containing
         * an actual website entry file.
         */
        if (
            !isWebsiteDirectory(
                $fullPath,
                $websiteEntryFiles
            )
        ) {
            continue;
        }


        /*
         * Build client information.
         */
        $clients[] = [

            'folder' => $item,

            'name' =>
                formatClientName($item),

            'category' =>
                detectCategory($item),

            'url' =>
                clientUrl($item)

        ];
    }
}


/* =========================================================
   SORT CLIENTS
========================================================= */

usort(
    $clients,
    function ($a, $b) {

        return strcasecmp(
            $a['name'],
            $b['name']
        );

    }
);


/* =========================================================
   WEBSITE COUNT
========================================================= */

$totalClients = count($clients);


/* =========================================================
   CURRENT YEAR
========================================================= */

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
        Fourty60 — Digital Home for Business Websites
    </title>

    <meta
        name="description"
        content="Fourty60 is the digital home for professional websites hosted and managed for businesses."
    >

    <meta
        name="robots"
        content="index, follow"
    >

    <meta
        name="theme-color"
        content="#07090d"
    >

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
    >


<style>

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
    background: #07090d;
    color: #f5f7fa;
    font-family: "Inter", sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
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
   VARIABLES
========================================================= */

:root {

    --bg: #07090d;

    --bg-soft: #0c1017;

    --card: #10151d;

    --card-hover: #151b25;

    --text: #f5f7fa;

    --muted: #8d97a8;

    --muted-dark: #667080;

    --border: rgba(255,255,255,.08);

    --border-hover: rgba(124,92,255,.35);

    --purple: #7c5cff;

    --blue: #4f8cff;

    --green: #55e58a;

    --container: 1180px;
}


/* =========================================================
   CONTAINER
========================================================= */

.container {
    width: min(92%, var(--container));
    margin: auto;
}


/* =========================================================
   BACKGROUND
========================================================= */

.background-glow {

    position: fixed;

    width: 650px;
    height: 650px;

    top: -300px;
    right: -180px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(124,92,255,.15),
            transparent 70%
        );

    pointer-events: none;

    z-index: -1;
}


.background-glow-two {

    position: fixed;

    width: 550px;
    height: 550px;

    bottom: -300px;
    left: -220px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(79,140,255,.08),
            transparent 70%
        );

    pointer-events: none;

    z-index: -1;
}


/* =========================================================
   HEADER
========================================================= */

header {

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 1000;

    background:
        rgba(7,9,13,.72);

    backdrop-filter:
        blur(18px);

    -webkit-backdrop-filter:
        blur(18px);

    border-bottom:
        1px solid transparent;

    transition: .3s ease;
}

header.scrolled {

    border-color:
        var(--border);
}


.navbar {

    height: 78px;

    display: flex;

    align-items: center;

    justify-content: space-between;
}


.logo {

    display: flex;

    align-items: center;

    gap: 10px;

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size: 23px;

    font-weight: 700;
}


.logo-mark {

    width: 38px;
    height: 38px;

    display: grid;

    place-items: center;

    border-radius: 11px;

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--blue)
        );

    box-shadow:
        0 10px 30px
        rgba(124,92,255,.22);
}


.logo-mark span {

    font-size: 13px;

    font-weight: 800;
}


nav {

    display: flex;

    align-items: center;

    gap: 30px;
}


nav a {

    color: #aab3c1;

    font-size: 13px;

    font-weight: 500;

    transition: .25s ease;
}


nav a:hover {

    color: white;
}


.nav-cta {

    padding:
        10px 17px;

    border-radius: 10px;

    background: white;

    color: #080a0e;

    font-weight: 600;
}


.nav-cta:hover {

    color: #080a0e;

    transform:
        translateY(-2px);
}


.menu-btn {

    display: none;

    background: none;

    border: none;

    color: white;

    font-size: 25px;

    cursor: pointer;
}


/* =========================================================
   HERO
========================================================= */

.hero {

    min-height: 92vh;

    display: flex;

    align-items: center;

    padding-top: 100px;
}


.hero-content {

    max-width: 900px;
}


.eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 9px;

    padding:
        8px 13px;

    border:
        1px solid var(--border);

    border-radius: 50px;

    background:
        rgba(255,255,255,.025);

    color: #aeb7c5;

    font-size: 12px;

    margin-bottom: 28px;
}


.status-dot {

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background:
        var(--green);

    box-shadow:
        0 0 12px
        var(--green);
}


.hero h1 {

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        clamp(54px, 8vw, 98px);

    line-height: .98;

    letter-spacing:
        -4px;
}


.gradient-text {

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #9b89ff,
            #72a5ff
        );

    -webkit-background-clip:
        text;

    background-clip:
        text;

    color: transparent;
}


.hero-description {

    max-width: 670px;

    margin-top: 30px;

    color: var(--muted);

    font-size: 17px;
}


.hero-actions {

    display: flex;

    gap: 13px;

    margin-top: 36px;

    flex-wrap: wrap;
}


.btn {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding:
        14px 20px;

    border-radius: 11px;

    font-size: 13px;

    font-weight: 600;

    transition: .3s ease;
}


.btn-primary {

    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--blue)
        );

    box-shadow:
        0 15px 35px
        rgba(79,140,255,.15);
}


.btn-primary:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 20px 45px
        rgba(79,140,255,.25);
}


.btn-secondary {

    border:
        1px solid var(--border);

    background:
        rgba(255,255,255,.025);
}


.btn-secondary:hover {

    background:
        rgba(255,255,255,.06);

    transform:
        translateY(-3px);
}


.hero-url {

    margin-top: 38px;

    color:
        var(--muted-dark);

    font-family:
        monospace;

    font-size: 12px;
}


.hero-url span {

    color:
        #8979ff;
}


/* =========================================================
   TRUST BAR
========================================================= */

.trust-bar {

    padding:
        27px 0;

    border-top:
        1px solid var(--border);

    border-bottom:
        1px solid var(--border);

    background:
        rgba(255,255,255,.012);
}


.trust-inner {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;
}


.trust-item {

    color:
        #707a8a;

    font-size: 12px;
}


.trust-item strong {

    color:
        #cbd2dc;
}


/* =========================================================
   SECTION
========================================================= */

section {

    padding:
        115px 0;
}


.section-heading {

    display: flex;

    justify-content: space-between;

    align-items: end;

    gap: 30px;

    margin-bottom: 45px;
}


.section-label {

    color:
        #8978ff;

    text-transform:
        uppercase;

    letter-spacing:
        2px;

    font-size:
        11px;

    font-weight:
        700;

    margin-bottom:
        13px;
}


.section-heading h2 {

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        clamp(37px, 5vw, 57px);

    line-height:
        1;

    letter-spacing:
        -2.5px;
}


.section-heading p {

    max-width:
        440px;

    color:
        var(--muted);

    font-size:
        14px;
}


/* =========================================================
   SHOWCASE TOOLBAR
========================================================= */

.showcase-toolbar {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    margin-bottom:
        23px;
}


.website-count {

    color:
        var(--muted);

    font-size:
        13px;
}


.website-count strong {

    color:
        white;

    font-size:
        16px;
}


.search-box {

    width:
        300px;
}


.search-box input {

    width: 100%;

    padding:
        12px 15px;

    outline: none;

    border:
        1px solid var(--border);

    border-radius:
        10px;

    background:
        rgba(255,255,255,.025);

    color:
        white;

    transition:
        .25s ease;
}


.search-box input:focus {

    border-color:
        rgba(124,92,255,.5);

    box-shadow:
        0 0 0 3px
        rgba(124,92,255,.07);
}


.search-box input::placeholder {

    color:
        #626c7b;
}


/* =========================================================
   CLIENT GRID
========================================================= */

.client-grid {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap:
        18px;
}


.client-card {

    position:
        relative;

    overflow:
        hidden;

    padding:
        25px;

    min-height:
        265px;

    background:
        var(--card);

    border:
        1px solid var(--border);

    border-radius:
        17px;

    transition:
        .35s ease;
}


.client-card::before {

    content: "";

    position: absolute;

    width: 190px;
    height: 190px;

    top: -110px;
    right: -90px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(124,92,255,.13),
            transparent 70%
        );

    transition:
        .35s ease;
}


.client-card:hover {

    transform:
        translateY(-6px);

    background:
        var(--card-hover);

    border-color:
        var(--border-hover);
}


.client-card:hover::before {

    transform:
        scale(1.3);
}


.client-top {

    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom:
        28px;
}


.client-icon {

    width: 49px;
    height: 49px;

    display: grid;

    place-items: center;

    border-radius:
        13px;

    border:
        1px solid var(--border);

    background:
        linear-gradient(
            135deg,
            #1b2230,
            #111620
        );

    color:
        #b7adff;

    font-family:
        "Space Grotesk",
        sans-serif;

    font-weight:
        700;

    font-size:
        16px;
}


.live-badge {

    padding:
        4px 9px;

    border-radius:
        50px;

    background:
        rgba(85,229,138,.08);

    color:
        var(--green);

    font-size:
        9px;

    font-weight:
        700;

    letter-spacing:
        .5px;
}


.client-card h3 {

    position:
        relative;

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        20px;

    line-height:
        1.2;

    margin-bottom:
        8px;
}


.client-category {

    display:
        inline-block;

    color:
        #8778ff;

    font-size:
        10px;

    text-transform:
        uppercase;

    letter-spacing:
        1px;

    margin-bottom:
        11px;
}


.client-domain {

    color:
        var(--muted);

    font-family:
        monospace;

    font-size:
        10px;

    word-break:
        break-all;
}


.visit-button {

    display:
        inline-flex;

    align-items:
        center;

    gap:
        6px;

    margin-top:
        19px;

    color:
        white;

    font-size:
        12px;

    font-weight:
        600;
}


.visit-button span {

    transition:
        .2s ease;
}


.visit-button:hover span {

    transform:
        translateX(4px);
}


/* =========================================================
   EMPTY STATE
========================================================= */

.empty-state {

    grid-column:
        1 / -1;

    padding:
        65px 30px;

    text-align:
        center;

    border:
        1px dashed
        var(--border);

    border-radius:
        17px;

    color:
        var(--muted);
}


.empty-state strong {

    display:
        block;

    color:
        white;

    font-size:
        18px;

    margin-bottom:
        6px;
}


/* =========================================================
   STATS
========================================================= */

.stats {

    display:
        grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap:
        1px;

    overflow:
        hidden;

    border:
        1px solid var(--border);

    border-radius:
        17px;

    background:
        var(--border);
}


.stat {

    padding:
        32px 25px;

    background:
        var(--card);
}


.stat-number {

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        39px;

    font-weight:
        700;
}


.stat p {

    margin-top:
        3px;

    color:
        var(--muted);

    font-size:
        12px;
}


/* =========================================================
   HOW IT WORKS
========================================================= */

.steps {

    display:
        grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap:
        18px;
}


.step {

    padding:
        28px;

    border:
        1px solid var(--border);

    border-radius:
        17px;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.035),
            rgba(255,255,255,.008)
        );
}


.step-number {

    margin-bottom:
        35px;

    color:
        #8978ff;

    font-size:
        10px;

    font-weight:
        700;

    letter-spacing:
        1px;
}


.step h3 {

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        22px;

    margin-bottom:
        9px;
}


.step p {

    color:
        var(--muted);

    font-size:
        13px;
}


/* =========================================================
   CTA
========================================================= */

.cta {

    position:
        relative;

    overflow:
        hidden;

    padding:
        78px 35px;

    text-align:
        center;

    border:
        1px solid var(--border);

    border-radius:
        23px;

    background:
        linear-gradient(
            135deg,
            rgba(124,92,255,.13),
            rgba(79,140,255,.06),
            rgba(255,255,255,.015)
        );
}


.cta::before {

    content: "";

    position: absolute;

    width:
        500px;

    height:
        500px;

    top:
        50%;

    left:
        50%;

    transform:
        translate(-50%,-50%);

    border-radius:
        50%;

    background:
        radial-gradient(
            circle,
            rgba(124,92,255,.13),
            transparent 70%
        );
}


.cta-content {

    position:
        relative;

    z-index:
        2;
}


.cta h2 {

    font-family:
        "Space Grotesk",
        sans-serif;

    font-size:
        clamp(37px, 5vw, 60px);

    line-height:
        1;

    letter-spacing:
        -2px;
}


.cta p {

    max-width:
        540px;

    margin:
        20px auto 28px;

    color:
        var(--muted);

    font-size:
        14px;
}


/* =========================================================
   FOOTER
========================================================= */

footer {

    padding:
        38px 0;

    border-top:
        1px solid var(--border);
}


.footer-inner {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    gap:
        20px;
}


.footer-copy {

    color:
        #606a79;

    font-size:
        11px;
}


.footer-links {

    display:
        flex;

    gap:
        20px;
}


.footer-links a {

    color:
        #737e8d;

    font-size:
        11px;
}


.footer-links a:hover {

    color:
        white;
}


/* =========================================================
   ANIMATION
========================================================= */

.reveal {

    opacity:
        0;

    transform:
        translateY(22px);

    transition:
        opacity .7s ease,
        transform .7s ease;
}


.reveal.active {

    opacity:
        1;

    transform:
        translateY(0);
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media(max-width: 950px) {

    nav {

        position:
            absolute;

        top:
            78px;

        left:
            0;

        width:
            100%;

        display:
            none;

        flex-direction:
            column;

        align-items:
            stretch;

        padding:
            15px;

        background:
            #0b0e14;

        border-bottom:
            1px solid var(--border);
    }


    nav.active {

        display:
            flex;
    }


    nav a {

        padding:
            11px;
    }


    .menu-btn {

        display:
            block;
    }


    .client-grid,
    .steps {

        grid-template-columns:
            repeat(2, 1fr);
    }


    .stats {

        grid-template-columns:
            repeat(2, 1fr);
    }
}


@media(max-width: 620px) {

    .navbar {

        height:
            70px;
    }


    nav {

        top:
            70px;
    }


    .hero {

        min-height:
            90vh;

        padding-top:
            100px;
    }


    .hero h1 {

        font-size:
            53px;

        letter-spacing:
            -2.5px;
    }


    .hero-description {

        font-size:
            15px;
    }


    section {

        padding:
            80px 0;
    }


    .section-heading {

        flex-direction:
            column;

        align-items:
            flex-start;
    }


    .client-grid,
    .steps,
    .stats {

        grid-template-columns:
            1fr;
    }


    .showcase-toolbar {

        flex-direction:
            column;

        align-items:
            stretch;
    }


    .search-box {

        width:
            100%;
    }


    .trust-inner {

        flex-wrap:
            wrap;
    }


    .trust-item {

        width:
            45%;
    }


    .cta {

        padding:
            60px 22px;
    }


    .footer-inner {

        flex-direction:
            column;

        align-items:
            flex-start;
    }


    .footer-links {

        flex-wrap:
            wrap;
    }
}

</style>

</head>


<body>


<div class="background-glow"></div>
<div class="background-glow-two"></div>


<!-- =====================================================
     HEADER
===================================================== -->

<header id="header">

    <div class="container navbar">

        <a href="./" class="logo">

            <div class="logo-mark">
                <span>40</span>
            </div>

            Fourty60

        </a>


        <button
            class="menu-btn"
            id="menuBtn"
            aria-label="Toggle navigation"
            aria-expanded="false"
        >
            ☰
        </button>


        <nav id="nav">

            <a href="#clients">
                Websites
            </a>

            <a href="#how">
                How It Works
            </a>

            <a href="#about">
                About
            </a>

            <a
                href="#contact"
                class="nav-cta"
            >
                Start a Project
            </a>

        </nav>

    </div>

</header>



<!-- =====================================================
     HERO
===================================================== -->

<main>

<section class="hero">

    <div class="container">

        <div class="hero-content reveal">

            <div class="eyebrow">

                <span class="status-dot"></span>

                <?= $totalClients ?> active
                <?= $totalClients === 1 ? 'website' : 'websites' ?>

            </div>


            <h1>

                The digital home
                <span class="gradient-text">
                    for business.
                </span>

            </h1>


            <p class="hero-description">

                Fourty60 is the central digital platform
                where professional business websites are
                hosted, managed and brought online.

            </p>


            <div class="hero-actions">

                <a
                    href="#clients"
                    class="btn btn-primary"
                >

                    Explore Websites

                    <span>→</span>

                </a>


                <a
                    href="#how"
                    class="btn btn-secondary"
                >

                    How It Works

                </a>

            </div>


            <div class="hero-url">

                Your website lives at:

                <br>

                <span>
                    fourty60.net/yourdomain.com
                </span>

            </div>

        </div>

    </div>

</section>



<!-- =====================================================
     TRUST BAR
===================================================== -->

<div class="trust-bar">

    <div class="container trust-inner">

        <div class="trust-item">
            <strong>Professional</strong>
            websites
        </div>

        <div class="trust-item">
            <strong>Responsive</strong>
            experiences
        </div>

        <div class="trust-item">
            <strong>Centralized</strong>
            hosting
        </div>

        <div class="trust-item">
            <strong>Scalable</strong>
            infrastructure
        </div>

    </div>

</div>



<!-- =====================================================
     CLIENT WEBSITES
===================================================== -->

<section id="clients">

    <div class="container">

        <div class="section-heading reveal">

            <div>

                <div class="section-label">
                    Client Network
                </div>

                <h2>
                    Websites we host.
                </h2>

            </div>


            <p>

                Every website below is automatically
                detected from the Fourty60 server.
                No manual registration required.

            </p>

        </div>


        <div class="showcase-toolbar">

            <div class="website-count">

                <strong>
                    <?= $totalClients ?>
                </strong>

                active
                <?= $totalClients === 1 ? 'website' : 'websites' ?>

            </div>


            <div class="search-box">

                <input
                    type="search"
                    id="searchInput"
                    placeholder="Search websites..."
                    autocomplete="off"
                >

            </div>

        </div>


        <div
            class="client-grid"
            id="clientGrid"
        >


            <?php if ($totalClients === 0): ?>

                <div class="empty-state">

                    <strong>
                        No client websites detected
                    </strong>

                    Upload a website folder containing
                    index.php or index.html and it will
                    automatically appear here.

                </div>

            <?php else: ?>


                <?php foreach ($clients as $client): ?>


                    <article
                        class="client-card reveal"
                        data-search="<?= htmlspecialchars(
                            strtolower(
                                $client['name']
                                . ' '
                                . $client['folder']
                                . ' '
                                . $client['category']
                            ),
                            ENT_QUOTES,
                            'UTF-8'
                        ) ?>"
                    >


                        <div class="client-top">

                            <div class="client-icon">

                                <?= htmlspecialchars(
                                    strtoupper(
                                        substr(
                                            $client['name'],
                                            0,
                                            1
                                        )
                                    ),
                                    ENT_QUOTES,
                                    'UTF-8'
                                ) ?>

                            </div>


                            <span class="live-badge">
                                LIVE
                            </span>

                        </div>


                        <span class="client-category">

                            <?= htmlspecialchars(
                                $client['category'],
                                ENT_QUOTES,
                                'UTF-8'
                            ) ?>

                        </span>


                        <h3>

                            <?= htmlspecialchars(
                                $client['name'],
                                ENT_QUOTES,
                                'UTF-8'
                            ) ?>

                        </h3>


                        <div class="client-domain">

                            <?= htmlspecialchars(
                                $client['folder'],
                                ENT_QUOTES,
                                'UTF-8'
                            ) ?>

                        </div>


                        <a
                            href="<?= htmlspecialchars(
                                $client['url'],
                                ENT_QUOTES,
                                'UTF-8'
                            ) ?>"
                            class="visit-button"
                        >

                            Visit Website

                            <span>→</span>

                        </a>


                    </article>


                <?php endforeach; ?>


                <div
                    id="noSearchResults"
                    class="empty-state"
                    style="display:none;"
                >

                    <strong>
                        No matching website
                    </strong>

                    Try another domain or company name.

                </div>


            <?php endif; ?>


        </div>

    </div>

</section>



<!-- =====================================================
     ABOUT / STATS
===================================================== -->

<section id="about">

    <div class="container">

        <div class="stats reveal">

            <div class="stat">

                <div class="stat-number">

                    <?= $totalClients ?>

                </div>

                <p>
                    Active Websites
                </p>

            </div>


            <div class="stat">

                <div class="stat-number">
                    24/7
                </div>

                <p>
                    Online Availability
                </p>

            </div>


            <div class="stat">

                <div class="stat-number">
                    100%
                </div>

                <p>
                    Responsive Experience
                </p>

            </div>


            <div class="stat">

                <div class="stat-number">
                    ∞
                </div>

                <p>
                    Growth Potential
                </p>

            </div>

        </div>

    </div>

</section>



<!-- =====================================================
     HOW IT WORKS
===================================================== -->

<section id="how">

    <div class="container">

        <div class="section-heading reveal">

            <div>

                <div class="section-label">
                    Simple Infrastructure
                </div>

                <h2>
                    Upload. Host. Grow.
                </h2>

            </div>


            <p>

                Fourty60 keeps your website
                deployment workflow simple and scalable.

            </p>

        </div>


        <div class="steps">


            <div class="step reveal">

                <div class="step-number">
                    01 / DEPLOY
                </div>

                <h3>
                    Upload
                </h3>

                <p>

                    Upload the client's website
                    into its own domain-named
                    folder on the server.

                </p>

            </div>


            <div class="step reveal">

                <div class="step-number">
                    02 / DETECT
                </div>

                <h3>
                    Automatic Detection
                </h3>

                <p>

                    Fourty60 scans the server
                    and automatically detects
                    valid website folders.

                </p>

            </div>


            <div class="step reveal">

                <div class="step-number">
                    03 / ONLINE
                </div>

                <h3>
                    Go Live
                </h3>

                <p>

                    The website automatically
                    becomes available through
                    its Fourty60 URL.

                </p>

            </div>


        </div>

    </div>

</section>



<!-- =====================================================
     CTA
===================================================== -->

<section id="contact">

    <div class="container">

        <div class="cta reveal">

            <div class="cta-content">

                <div class="section-label">
                    Fourty60
                </div>


                <h2>
                    One platform.
                    Multiple businesses.
                </h2>


                <p>

                    A centralized digital home for
                    the websites you build, host and manage.

                </p>


                <a
                    href="mailto:info@fourty60.net"
                    class="btn btn-primary"
                >

                    Get In Touch

                    <span>→</span>

                </a>

            </div>

        </div>

    </div>

</section>

</main>



<!-- =====================================================
     FOOTER
===================================================== -->

<footer>

    <div class="container footer-inner">

        <div class="footer-copy">

            © <?= $currentYear ?>
            Fourty60.
            All rights reserved.

        </div>


        <div class="footer-links">

            <a href="#clients">
                Websites
            </a>

            <a href="#how">
                How It Works
            </a>

            <a href="#contact">
                Contact
            </a>

        </div>

    </div>

</footer>



<script>

/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "active"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
    document.getElementById("header");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 25
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");

                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },
        {
            threshold: .08
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   WEBSITE SEARCH
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const clientCards =
    document.querySelectorAll(
        ".client-card"
    );


const noSearchResults =
    document.getElementById(
        "noSearchResults"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            const search =
                event.target.value
                    .toLowerCase()
                    .trim();


            let visibleCount = 0;


            clientCards.forEach(
                card => {

                    const searchableText =
                        card.dataset.search
                        || "";


                    const matches =
                        searchableText
                            .includes(search);


                    if (matches) {

                        card.style.display =
                            "";

                        visibleCount++;

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


            if (noSearchResults) {

                noSearchResults.style.display =
                    (
                        search &&
                        visibleCount === 0
                    )
                    ? "block"
                    : "none";

            }

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.querySelector(
        ".footer-copy"
    );


/*
 * Footer year is already rendered
 * server-side through PHP.
 */

</script>


</body>
</html>