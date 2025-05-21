(function() {
    let tabindexToggleState = localStorage.getItem("tabindexToggleState") === "true";
    const addedTabindexes = new Set();
    const originalTabindexes = new Map();
    function addTabindexToAll() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (
            el.getAttribute('aria-hidden') === 'true' ||
            tag === 'nav' ||
            tag === 'div' ||
            tag === 'footer' ||
            tag === 'section' ||
            tag === 'article' ||
            tag === 'ol' ||
            tag === 'ul' ||
            el.closest('nav') ||
            el.closest('#navbar') ||
            el.closest('.navbar')
        ){
            return;
        } if (el.hasAttribute('tabindex')) {
            originalTabindexes.set(el, el.getAttribute('tabindex'));
        } else {
            addedTabindexes.add(el);
            el.setAttribute('tabindex', '0');
        }
    });
}
    function restoreOriginalTabindexes() {
        addedTabindexes.forEach(el => {
            if (document.body.contains(el)) {
                el.removeAttribute('tabindex');
            }
        });
        originalTabindexes.forEach((value, el) => {
            if (document.body.contains(el)) {
                el.setAttribute('tabindex', value);
            }
        });
        addedTabindexes.clear();
        originalTabindexes.clear();
    }
    function applyState(state) {
        if (state) {
            addTabindexToAll();
            toggleButton.setAttribute("aria-label", "Reset");
            toggleButton.setAttribute("tabindex", "0");
            toggleButton.style.backgroundColor = "rgba(30, 100, 30, 0.8)";
            toggleButton.classList.add("active");
        } else {
            restoreOriginalTabindexes();
            toggleButton.setAttribute("aria-label", "Screen Reader Mode");
            toggleButton.setAttribute("tabindex", "1");
            toggleButton.style.backgroundColor = "rgba(30, 50, 200, 0.8)";
            toggleButton.classList.add("active");
        }
        tabindexToggleState = state;
        localStorage.setItem("tabindexToggleState", String(state));
    }
    function toggleTabindexes() {
        applyState(!tabindexToggleState);
    }

    const toggleButton = document.createElement("div");
    toggleButton.id = "tabindex-toggle";
    toggleButton.setAttribute("role", "button");
    toggleButton.setAttribute("aria-label", "Screen Reader Mode");
    toggleButton.setAttribute("tabindex", "1");
    toggleButton.innerHTML = '<img src="/img/accessibility-vo.svg" alt="" aria-hidden="true" style="width: 40px; height: 40px; display: block; margin: 0; padding: 0; box-sizing: border-box;">';
    Object.assign(toggleButton.style, {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "50px",
        height: "50px",
        backgroundColor: "rgba(30, 50, 200, 0.8)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: "9999",
    });
    const style = document.createElement("style");
    style.innerHTML = `
        @media (prefers-contrast: more) {
            #tabindex-toggle.high-contrast {
                overflow: "hidden",
                padding: "0",
                border: solid 4px #000;
                color: #fff !important;
            }

            @media (prefers-color-scheme: dark) {
                #tabindex-toggle.high-contrast {
                    overflow: "hidden",
                    padding: "0",
                    border: solid 4px #fff;
                    color: #fff !important;
                }
            }
        }
    `;
    if (window.matchMedia('(prefers-contrast: more)').matches) {
        toggleButton.classList.add('high-contrast');
    }
    document.head.appendChild(style);
    toggleButton.addEventListener("click", toggleTabindexes);
    toggleButton.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTabindexes();
        }
    });
    document.body.appendChild(toggleButton);
    applyState(tabindexToggleState);
})();
