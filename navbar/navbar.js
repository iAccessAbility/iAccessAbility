document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".menu-toggle");
    const desktopMenu = document.querySelector(".desktop-nav");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;
    const site = document.querySelector(".site");
    const desktopLinks = desktopMenu.querySelectorAll("a");
    const mobileLinks = mobileMenu.querySelectorAll("a");
    function setupInitialTabIndexes() {
        desktopLinks.forEach(link => {
            link.setAttribute("tabindex", "0");
        });
        mobileLinks.forEach(link => {
            link.setAttribute("tabindex", "-1");
        });
        toggleButton.setAttribute("tabindex", "0");
    }
    setupInitialTabIndexes();
    toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
        toggleButton.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("open");
        mobileMenu.setAttribute("aria-hidden", isExpanded);
        if (isExpanded) {
            desktopLinks.forEach(link => {
                link.setAttribute("tabindex", "0");
            });
            mobileLinks.forEach(link => {
                link.setAttribute("tabindex", "-1");
            });
            toggleButton.setAttribute("tabindex", "0");
        } else {
            desktopLinks.forEach(link => {
                link.setAttribute("tabindex", "-1");
            });
            mobileLinks.forEach(link => {
                link.setAttribute("tabindex", "0");
            });
            toggleButton.setAttribute("tabindex", "0");
        }
        body.classList.toggle("no-scroll", !isExpanded);
        site.classList.toggle("menu-open", !isExpanded);
    });
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
             desktopLinks.forEach(link => {
                link.setAttribute("tabindex", "0");
            });
            mobileLinks.forEach(link => {
                link.setAttribute("tabindex", "-1");
            });
        });
    });
    document.addEventListener("click", (event) => {
        if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
             desktopLinks.forEach(link => {
                link.setAttribute("tabindex", "0");
            });
            mobileLinks.forEach(link => {
                link.setAttribute("tabindex", "-1");
            });
        }
    });
    mobileMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    window.addEventListener("scroll", () => {
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            body.classList.remove("no-scroll");
            site.classList.remove("menu-open");
            toggleButton.setAttribute("aria-expanded", "false");
             desktopLinks.forEach(link => {
                link.setAttribute("tabindex", "0");
            });
            mobileLinks.forEach(link => {
                link.setAttribute("tabindex", "-1");
            });
        }
    });
});
