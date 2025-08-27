(function() {
    const style = document.createElement("style");
    style.innerHTML = `
        @import "https://iaccessabilityservices.com/stylesheets/fonts.css";
        body.dyslexia-mode * {
            font-family: "OpenDyslexic" !important;
            line-height: 1.5;
            word-spacing: 0.1em;
        }
        #toggle-dyslexic {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            padding-top: 3px;
            background: rgba(30, 50, 200, 0.8);
            backdrop-filter: blur(2px);
            border: none;
            border-radius: 50%;
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        #toggle-dyslexic[aria-pressed="true"] {
            background: rgba(30, 100, 30, 0.8);
        }
        @media (hover: hover) {
            #toggle-dyslexic {
                transition: all 200ms ease;
            }
            #toggle-dyslexic:hover,
            #toggle-dyslexic:focus {
                scale: 1.2;
            }
        }
    `;
    document.head.appendChild(style);
    // --- 3. Create toggle button ---
    const btn = document.createElement("button");
    btn.id = "toggle-dyslexic";
    btn.innerHTML = '<img src="https://iaccessabilityservices.com/img/dys.svg" alt="" aria-hidden="true" style="width: 40px; height: 40px; display: block; margin: 0; padding: 0; box-sizing: border-box;">';
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Toggle OpenDyslexic font");
    // --- 4. Add button to body ---
    window.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(btn);
        // Restore saved state
        if (localStorage.getItem("dyslexiaMode") === "on") {
            document.body.classList.add("dyslexia-mode");
            btn.setAttribute("aria-pressed", "true");
        }
    });
    // --- 5. Toggle behavior ---
    btn.addEventListener("click", () => {
        const isActive = document.body.classList.toggle("dyslexia-mode");
        btn.setAttribute("aria-pressed", isActive);
        localStorage.setItem("dyslexiaMode", isActive ? "on" : "off");
    });
})();
