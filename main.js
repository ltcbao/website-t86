document.addEventListener('DOMContentLoaded', function () {
  // --- Load Header and Footer ---
  const loadComponent = (url, placeholderId) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          placeholder.innerHTML = data;
          // After loading header, initialize its components like the mobile menu
          if (placeholderId === 'header-placeholder') {
            initializeHeaderScripts();
          }
        }
      })
      .catch((error) => console.error(`Error loading ${url}:`, error));
  };

  // Assumes header.html and footer.html are in the same directory as contact.html
  loadComponent('header.html', 'header-placeholder');
  loadComponent('footer.html', 'footer-placeholder');

  // --- Initialize scripts for dynamically loaded content ---
  function initializeHeaderScripts() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  // --- Ripple Effect ---
  document.querySelectorAll('.ripple').forEach((button) => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600); // Corresponds to animation duration
    });
  });

  // --- Contact Form Submission ---
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc.');
        return;
      }
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted!', data);
      // In a real application, you would send 'data' to a server here.
      alert('Cảm ơn bạn! Tin nhắn của bạn đang được xử lý.');
      this.reset();
    });
  }
});
