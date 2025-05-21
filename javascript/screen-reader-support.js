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
            toggleButton.innerHTML = "Screen Reader Mode";
            toggleButton.setAttribute("aria-label", "Reset");
            toggleButton.setAttribute("tabindex", "0");
            toggleButton.style.backgroundColor = "rgba(30, 100, 30, 0.8)";
        } else {
            restoreOriginalTabindexes();
            toggleButton.innerHTML = "Screen Reader Mode";
            toggleButton.setAttribute("aria-label", "Screen Reader Mode");
            toggleButton.setAttribute("tabindex", "1");
            toggleButton.style.backgroundColor = "rgba(30, 100, 200, 0.8)";
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
    toggleButton.innerHTML = "Screen Reader Mode";
    Object.assign(toggleButton.style, {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "50px",
        height: "50px",
        backgroundColor: "rgba(30, 100, 200, 0.8)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        zIndex: "9999",
    });
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
