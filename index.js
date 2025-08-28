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
  // Adding the menu list to the toggle 
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
        navLinks.style.left = "-100%"; // Hide menu by default on mobile
        mobileList();  // This allows the desktop styles to not be changed
      }else {
       hamburger.style.display = 'none';
       searchBar.style.display = 'block';
    }

    updateIcon();
  }

  // 6. Event listener to activate toggle in the hamburger between open and close on mobile
  hamburger.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.toggle('nav--open');
      if (nav.classList.contains('nav--open')) {
        navLinks.style.left = "0";
      } else {
        navLinks.style.left = "-100%";
      }
      updateIcon();
    }
  });

  // 7. Keep hamburger menu consistent when resizing
  window.addEventListener('resize', applyResponsiveNav);

  // 8. Calling the responsive function
  applyResponsiveNav();

  // Creating and styling the menu list that will display on toggle of the button
function mobileList() {
  navLinks.style.display ="flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "75px";
 navLinks.style.left = "-100%";
  navLinks.style.width = "70%";
  navLinks.style.padding = "1rem";
  navLinks.style.backgroundColor = "#fff";
  navLinks.style.boxShadow = "0px 4px 16px 0px #0000001a";
  navLinks.style.zIndex = "1000";
  navLinks.style.transition = "left 0.3s ease";
  searchBar.style.display = "flex";

  // Appending the search bar to the navlist
  if (!navLinks.contains(searchBar)) {
      navLinks.appendChild(searchBar);
    }
  
}


});
