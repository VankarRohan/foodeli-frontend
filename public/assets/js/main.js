(function () {
  "use strict";

  // ✅ Always define mobileNavToogle safely
  function mobileNavToogle() {
    const body = document.querySelector("body");
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    if (body) {
      body.classList.toggle("mobile-nav-active");
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");
      if (!selectHeader || (!selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top"))) return;

      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    }

    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    /**
     * Mobile nav toggle button click
     */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
    if (mobileNavToggleBtn) {
      // ✅ Runs only when DOM is ready, so works after deployment
      mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    const navLinks = document.querySelectorAll("#navmenu a");
    if (navLinks.length) {
      navLinks.forEach((navmenu) => {
        navmenu.addEventListener("click", () => {
          if (document.querySelector(".mobile-nav-active")) {
            mobileNavToogle();
          }
        });
      });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      function toggleScrollTop() {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      }
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      window.addEventListener("load", toggleScrollTop);
      document.addEventListener("scroll", toggleScrollTop);
    }

    /**
     * Sign in / Sign up form toggle
     */
    const imgBtn = document.querySelector('.img__btn');
    if (imgBtn) {
      imgBtn.addEventListener('click', function () {
        const cont = document.querySelector('.cont');
        if (cont) {
          cont.classList.toggle('s--signup');
        }
      });
    }

  });

})();
