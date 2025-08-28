document.addEventListener('DOMContentLoaded', () => {
  // 1. Cache DOM elements (AFTER DOM is ready)
  // 2. Selecting the <nav> element
  const nav = document.querySelector('nav');
  // Selecting the <ul> list inside the <nav>
  const navLinks = document.querySelector('#nav-links');
  // Selecting the search bar input
  const searchBar = document.querySelector('.search-input');

  // 3. Create the hamburger button 
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-icon';
  hamburger.setAttribute('type', 'button');
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = `<img src="./images/mobile-menu.svg" alt="Menu" />`;
  nav.appendChild(hamburger);

  // 4. Function to update the hamburger menu icon based on state
  function updateIcon() {
    const img = hamburger.querySelector('img');
    const isOpen = nav.classList.contains('nav--open');
    img.src = isOpen ? './images/close-icon.svg' : './images/mobile-menu.svg';
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  /* 5. Apply responsive rules (mobile vs desktop) on load + resize
    Also hide/show the search bar based on screen size
  */

  function applyResponsiveNav() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        hamburger.style.display = 'block';
        searchBar.style.display = 'none';
    } else {
       hamburger.style.display = 'none';
       searchBar.style.display = 'block';
    }

    updateIcon();
  }

  // 6. Event listener to activate toggle in the hamburger between open and close on mobile
  hamburger.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.toggle('nav--open');
      updateIcon();
    }
  });

  // 7. Keep hamburger menu consistent when resizing
  window.addEventListener('resize', applyResponsiveNav);

  // 8. Calling the responsive function
  applyResponsiveNav();
});
