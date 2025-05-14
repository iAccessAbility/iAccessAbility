document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".menu-toggle");
    const desktopMenu = document.getElementById("desktop-nav");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;
    const site = document.querySelector(".site");
    const menuLinks = mobileMenu.querySelectorAll("a");

    if (desktopMenu) {
        const menuLinks = desktopMenu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.setAttribute("tabindex", "0");
        });
    }

    // Toggle the menu when the button is clicked
    toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

        toggleButton.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("open");

        // Toggle accessibility attributes
        mobileMenu.setAttribute("aria-hidden", isExpanded);
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.setAttribute("tabindex", isExpanded ? "-1" : "0");
        });

        // Prevent scrolling and apply blur when menu is open
        body.classList.toggle("no-scroll", !isExpanded);
        site.classList.toggle("menu-open", !isExpanded);
    });

    // Close the menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
        });
    });

    // Close the menu when the user clicks outside the menu
    document.addEventListener("click", (event) => {
        if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
        }
    });

    // Prevent clicks inside the menu from closing it
    mobileMenu.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from propagating to document
    });

    // Close the menu when the user scrolls outside the menu
    window.addEventListener("scroll", () => {
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
        }
    });
});
