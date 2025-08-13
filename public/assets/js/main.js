(function () {
  "use strict";

  console.log("main.js loaded");

  // Always-available toggle function (safe checks + debug logs)
  function mobileNavToogle() {
    const body = document.querySelector("body");
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    console.log("mobileNavToogle() called — body/mBtn:", !!body, !!mobileNavToggleBtn);

    if (body) {
      body.classList.toggle("mobile-nav-active");
      console.log("body.mobile-nav-active:", body.classList.contains("mobile-nav-active"));
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded fired");

    /**
     * Scrolled class
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
     * Attach listeners:
     *  - direct attach if element exists now
     *  - delegation on document so clicks are caught even if React re-renders DOM nodes
     */

    // direct attach (if element exists at this moment)
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
    if (mobileNavToggleBtn) {
      console.log("Attaching direct click listener to .mobile-nav-toggle");
      mobileNavToggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("direct: mobile-nav-toggle clicked");
        mobileNavToogle();
      });
    } else {
      console.log(".mobile-nav-toggle not found at DOMContentLoaded");
    }

    // Delegated handler (covers dynamically created/replaced buttons)
    document.addEventListener("click", function (e) {
      const clickedToggle = e.target.closest && e.target.closest(".mobile-nav-toggle");
      if (clickedToggle) {
        console.log("delegate: mobile toggle clicked (via document)");
        mobileNavToogle();
      }
    });

    // Hide mobile nav when clicking links inside #navmenu (delegated too)
    document.addEventListener("click", function (e) {
      const navLink = e.target.closest && e.target.closest("#navmenu a");
      if (navLink) {
        // only hide if menu is active
        if (document.querySelector(".mobile-nav-active")) {
          console.log("nav link clicked inside #navmenu — hiding mobile nav");
          mobileNavToogle();
        }
      }
    });

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector(".scroll-top");
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
