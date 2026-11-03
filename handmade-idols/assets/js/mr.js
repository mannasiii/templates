
  // IntersectionObserver for scroll animation
  document.addEventListener("DOMContentLoaded", function () {
    const sbElements = document.querySelectorAll(".sb");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, {
      threshold: 0.2
    });

    sbElements.forEach((el) => observer.observe(el));
  });


  document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".sb, .sh");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, {
      threshold: 0.2
    });

    animatedElements.forEach((el) => observer.observe(el));
  });

  document.addEventListener("DOMContentLoaded", function () {
    const mrElements = document.querySelectorAll(".mr");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, {
      threshold: 0.3
    });

    mrElements.forEach((el) => observer.observe(el));
  });


  // 
  const images = document.querySelectorAll('.mr2');

images.forEach((img, i) => {
  setTimeout(() => {
    img.style.opacity = 1;
  }, i * 2000); // 2 seconds between each
});


 document.addEventListener('DOMContentLoaded', () => {
            const mainImage = document.getElementById('main-product-image');
            const thumbnails = document.querySelectorAll('.thumbnail');
            const messageBox = document.getElementById('message-box');
            const addToCartButton = document.querySelector('button.bg-violet-600');

            // Function to handle image swap
            const swapImage = (event) => {
                const newImgUrl = event.currentTarget.getAttribute('data-img-url');
                const newAlt = event.currentTarget.getAttribute('alt');

                // Update the main image source and alt text
                mainImage.src = newImgUrl;
                mainImage.alt = newAlt;

                // Update active state of thumbnails
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('border-violet-600', 'opacity-100');
                    thumb.classList.add('border-transparent', 'opacity-70');
                });

                // Set the clicked thumbnail as active
                event.currentTarget.classList.remove('border-transparent', 'opacity-70');
                event.currentTarget.classList.add('border-violet-600', 'opacity-100');
            };

            // Attach click listeners to all thumbnails
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', swapImage);
            });

            // Set the first thumbnail as active initially
            if (thumbnails.length > 0) {
                thumbnails[0].classList.remove('border-transparent', 'opacity-70');
                thumbnails[0].classList.add('border-violet-600', 'opacity-100');
            }

            // Function for the "Add to Cart" message box (instead of alert())
            addToCartButton.addEventListener('click', () => {
                messageBox.classList.remove('opacity-0', 'pointer-events-none');
                messageBox.classList.add('opacity-100');

                // Hide the message after 3 seconds
                setTimeout(() => {
                    messageBox.classList.remove('opacity-100');
                    messageBox.classList.add('opacity-0', 'pointer-events-none');
                }, 3000);
            });
        });



        // 
        const thumbnailButtons = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-img');
        const currentCaption = document.getElementById('current-view-caption');
        const featureOverlay = document.getElementById('feature-overlay');

        // Initial state check (handles the feature graphic visibility)
        function updateOverlayVisibility(caption) {
            // Show the feature graphic/text only for the main (first) image view
            if (caption.includes('Main Product View')) {
                featureOverlay.classList.remove('hidden');
            } else {
                featureOverlay.classList.add('hidden');
            }
        }

        // Set initial visibility
        updateOverlayVisibility(currentCaption.textContent);

        thumbnailButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 1. Get new image source and caption
                const newSrc = this.getAttribute('data-img-src');
                const newCaption = this.getAttribute('data-caption');

                // 2. Update the main image and caption
                mainImage.src = newSrc;
                currentCaption.textContent = newCaption;

                // 3. Update active state (border color) on thumbnails
                thumbnailButtons.forEach(btn => {
                    btn.classList.remove('border-blue-600', 'shadow-lg');
                    btn.classList.add('border-gray-200', 'shadow-md');
                });
                this.classList.remove('border-gray-200', 'shadow-md');
                this.classList.add('border-blue-600', 'shadow-lg');

                // 4. Update the feature overlay visibility
                updateOverlayVisibility(newCaption);
            });
        });




        