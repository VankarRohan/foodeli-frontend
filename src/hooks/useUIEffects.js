import { useEffect } from "react";

const useUIEffects = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

    const toggleScrolled = () => {
      if (!header) return;
      const classes = ["scroll-up-sticky", "sticky-top", "fixed-top"];
      const isSticky = classes.some((cls) => header.classList.contains(cls));
      if (!isSticky) return;

      if (window.scrollY > 100) {
        body.classList.add("scrolled");
      } else {
        body.classList.remove("scrolled");
      }
    };

    const toggleScrollTop = () => {
      if (!scrollTopBtn) return;
      if (window.scrollY > 100) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    };

    const handleScrollTopClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleMobileNav = () => {
      body.classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    };

    const handleNavLinkClick = () => {
      if (body.classList.contains("mobile-nav-active")) {
        toggleMobileNav();
      }
    };

    // Scroll handlers
    window.addEventListener("scroll", toggleScrolled);
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("load", toggleScrolled);
    window.addEventListener("load", toggleScrollTop);

    // Scroll-top button click
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", handleScrollTopClick);
    }

    // Mobile nav toggle
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", toggleMobileNav);
    }

    // Hash link nav
    document.querySelectorAll("#navmenu a").forEach((el) => {
      el.addEventListener("click", handleNavLinkClick);
    });

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
      window.removeEventListener("scroll", toggleScrollTop);
      window.removeEventListener("load", toggleScrolled);
      window.removeEventListener("load", toggleScrollTop);
      if (scrollTopBtn) scrollTopBtn.removeEventListener("click", handleScrollTopClick);
      if (mobileNavToggleBtn) mobileNavToggleBtn.removeEventListener("click", toggleMobileNav);
    };
  }, []);
};

export default useUIEffects;
