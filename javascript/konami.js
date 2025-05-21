(function() {
    // Konami Code Logic
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiIndex = 0;
    let timer = null;
    let isTouchDevice = false;
    let altKeyPressed = false;
    function createElements() {
        // Icon
        const iconContainer = document.createElement("div");
        iconContainer.id = "konami-icon";
        iconContainer.setAttribute("role", "button");
        iconContainer.setAttribute("aria-label", "Game Controller");
        iconContainer.setAttribute("tabindex", "0");
        iconContainer.innerHTML = '<img src="/img/game-controller.svg" alt="" aria-hidden="true" style="width: 30px; height: 30px; display: block; margin: 0; padding: 0; box-sizing: border-box; filter: invert();">';
        // Hint Bubble
        const hintBubble = document.createElement("div");
        hintBubble.id = "hint-bubble";
        hintBubble.innerHTML = "Some things are triggered with Alt/Option + Up...";
        // Popup
        const popup = document.createElement("div");
        popup.id = "konami-popup";
        popup.style.display = "none";
        popup.innerHTML = `
            <p class="konami">Are you curious enough???</p>
            <div class="konami-container">
                <div class="arrow" tabindex="0">↑</div>
                <div class="arrow" tabindex="0">↑</div>
                <div class="arrow" tabindex="0">↓</div>
                <div class="arrow" tabindex="0">↓</div>
                <div class="arrow" tabindex="0">←</div>
                <div class="arrow" tabindex="0">→</div>
                <div class="arrow" tabindex="0">←</div>
                <div class="arrow" tabindex="0">→</div>
                <div class="arrow" tabindex="0">B</div>
                <div class="arrow" tabindex="0">A</div>
            </div>
            <p class="konami" id="konami-message">Press Esc to close</p>
            <p class="konami" id="countdown-timer"></p>
        `;
        // Touch Controller
        const controller = document.createElement("div");
        controller.id = "touch-controller";
        controller.style.display = "none";
        controller.innerHTML = `
            <div class="button btn-arrow" data-key="ArrowUp">↑</div>
            <div class="button btn-arrow" data-key="ArrowDown">↓</div>
            <div class="button btn-arrow" data-key="ArrowLeft">←</div>
            <div class="button btn-arrow" data-key="ArrowRight">→</div>
            <div class="button btn-a" data-key="a">A</div>
            <div class="button btn-b" data-key="b">B</div>
            <div class="button btn-x" data-key="x">X</div>
            <div class="button btn-y" data-key="y">Y</div>
        `;
        // Append elements to body
        document.body.appendChild(iconContainer);
        document.body.appendChild(hintBubble);
        document.body.appendChild(popup);
        document.body.appendChild(controller);
        return {
            iconContainer,
            hintBubble,
            popup,
            controller
        };
    }
    // Add CSS Styles Dynamically
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (prefers-color-scheme: dark) {
                .site.blur {
                    filter: blur(5px);
                    transition: filter 0.3s ease, opacity 0.3s ease;
                    opacity: 0.5;
                }
                #konami-popup {
                    position: fixed !important;
                    top: 50% !important;
                    left: 50% !important;
                    max-width: 100%;
                    transform: translate(-50%, -50%) !important;
                    background: #000 !important;
                    padding: 20px !important;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
                    border-radius: 10px !important;
                    text-align: center !important;
                    z-index: 9999 !important;
                    color: white !important;
                }
                .konami-container {
                    display: flex !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    margin: 10px 0 !important;
                }
                .konami {
                    text-align: center !important;
                    font-family: Arial, Helvetica, sans-serif !important;
                    font-size: 20px !important;
                }
                .arrow {
                    width: 40px !important;
                    height: 40px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: #222 !important;
                    border-radius: 5px !important;
                    font-size: 20px !important;
                    font-weight: bold;
                    transition: background 0.3s ease !important;
                }
                .arrow.correct {
                    background: #388E3C !important; /* Green for correct */
                    color: #fff !important;
                }
                #touch-controller {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    z-index: 1001;
                }
                .button {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #222;
                    border: 2px #fff solid;
                    color: white;
                    border-radius: 50%;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease; /* */
                }
                .button:hover {
                    background: #222;
                    color: #fff;
                    transform: scale(1);
                }
                .button:active {
                    transform: scale(0.8);
                    transition-duration: 0ms;
                }
                .btn-arrow:active {
                    background: #fff;
                    color: #000;
                }
                .btn-a:active {
                    background: #00ff00;
                    color: #000;
                }
                .btn-b:active {
                    background: #ff0000;
                    color: #fff;
                }
                .btn-x:active {
                    background: #0000ff;
                    color: #fff;
                }
                .btn-y:active {
                    background: #ffff00;
                    color: #000;
                }
            }
            @media (prefers-color-scheme: light) {
                .site.blur {
                    filter: blur(5px);
                    transition: filter 0.3s ease, opacity 0.3s ease;
                    opacity: 0.5;
                }
                #konami-popup {
                    /* Light mode styles */
                    position: fixed !important;
                    top: 50% !important;
                    left: 50% !important;
                    max-width: 100%;
                    transform: translate(-50%, -50%) !important;
                    background: #fff !important;
                    padding: 20px !important;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
                    border-radius: 10px !important;
                    text-align: center !important;
                    color: #000 !important;
                    z-index: 9999 !important;
                }
                .konami-container {
                    display: flex !important;
                    justify-content: center !important;
                    gap: 10px !important;
                    margin: 10px 0 !important;
                }
                .konami {
                    text-align: center !important;
                    font-family: Arial, Helvetica, sans-serif !important;
                    font-size: 20px !important;
                }
                .arrow {
                    width: 40px !important;
                    height: 40px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: #ddd !important;
                    border-radius: 5px !important;
                    font-size: 20px !important;
                    font-weight: bold;
                    transition: background 0.3s ease !important;
                }
                .arrow.correct {
                    background: #4CFF50 !important; /* Green for correct */
                    color: #000 !important;
                }
                #touch-controller {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    z-index: 1001;
                }
                .button {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #eee;
                    border: 2px #000 solid;
                    color: #000;
                    border-radius: 50%;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                .btn-arrow:hover {
                    background: #000;
                    color: #fff;
                }
                .btn-a:hover {
                    background: #00ff00;
                }
                .btn-b:hover {
                    background: #ff0000;
                    color: #fff;
                }
                .btn-x:hover {
                    background: #0000ff;
                    color: #fff;
                }
                .btn-y:hover {
                    background: #ffff00;
                }
            }
            /* Add styles for the icon and hint bubble here, including responsiveness */
            #konami-icon {
                position: fixed;
                bottom: 20px;
                left: 80px;
                width: 50px;
                height: 50px;
                background-color: rgba(30, 50, 200, 0.8);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 24px;
                cursor: pointer;
                z-index: 1000;
            }
            #hint-bubble {
                position: fixed;
                bottom: 20px;
                left: 140px;
                background-color: rgba(30, 100, 200, 0.9);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                color: #fff;
                padding: 10px;
                font-size: 14px;
                border-radius: 10px;
                max-width: 200px;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 0.3s ease-in-out;
                z-index: 999;
                pointer-events: none;
            }
            #touch-controller {
                display: none; /* Hide on desktop */
            }
            @media (max-width: 768px) {
                #touch-controller {
                    display: ${isTouchDevice ? 'flex' : 'none'};
                    width: 70%;
                }
                #konami-icon {
                    bottom: 80px;
                    left: 20px;
                }
                #hint-bubble {
                    bottom: 80px;
                    left: 80px;
                }
            }
            @media (prefers-contrast: more) {
                #konami-icon,
                #hint-bubble {
                    border: solid #000;
                    background: #0063cc;
                    color: #fff !important;
                }
                #konami-popup {
                    border: solid;
                }
                @media (prefers-color-scheme: dark) {
                    #konami-icon,
                    #hint-bubble {
                        border: solid;
                        background: #0063cc;
                    }
                    #konami-popup {
                        border: solid;
                    }
                }
            }
        `;
        document.head.appendChild(style);
    }
    document.addEventListener("DOMContentLoaded", function () {
        // Check for touch support on initial load
        window.addEventListener('touchstart', function onFirstTouch() {
            isTouchDevice = true;
            addStyles();
            window.removeEventListener('touchstart', onFirstTouch, false);
        }, false);
        addStyles();
        const { iconContainer, hintBubble, popup, controller } = createElements();
        const konamiMessage = popup.querySelector("#konami-message");
        const countdownTimer = popup.querySelector("#countdown-timer");
        const arrows = popup.querySelectorAll(".arrow");
        const site = document.querySelector('.site');
        // Function to reset
        function resetKonamiCode() {
            konamiIndex = 0;
            arrows.forEach(arrow => arrow.classList.remove("correct"));
        }
        // Toggle visibility
        function toggleDisplay(event) {
            event.preventDefault();
            if (isTouchDevice) {
                resetKonamiCode();
                popup.style.display = (popup.style.display === "block") ? "none" : "block";
                controller.style.display = (controller.style.display === "flex") ? "none" : "flex";
                hintBubble.style.display = "none";
                if (popup.style.display === "block") {
                    site.classList.add("blur");
                } else {
                    site.classList.remove("blur");
                }
            } else {
                if (hintBubble.style.transform === "scaleX(0)") {
                    hintBubble.style.transform = "scaleX(1)";
                    hintBubble.style.pointerEvents = "auto";
                    hintBubble.setAttribute("aria-hidden", "false");
                    hintBubble.setAttribute("tabindex", "0");
                } else {
                    hintBubble.style.transform = "scaleX(0)";
                    hintBubble.style.pointerEvents = "none";
                    hintBubble.setAttribute("aria-hidden", "true");
                    hintBubble.setAttribute("tabindex", "-1");
                }
                if (popup.style.display === "block") {
                    site.classList.add("blur");
                } else {
                    site.classList.remove("blur");
                }
                if (popup.style.display === "block") {
                    site.classList.add("blur");
                } else {
                    site.classList.remove("blur");
                }
                site.classList.remove("blur");
                popup.style.display = "none";
                controller.style.display = "none";
                hintBubble.style.display = "block";
            }
        }
        // Check Konami Code
        function checkKonamiCode(key) {
            if (isTouchDevice) {
                controller.style.display = "flex";
            } else {
                controller.style.display = "none";
            }
            if (key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                arrows[konamiIndex].classList.add("correct");
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    konamiMessage.textContent = "Konami Code Entered!";
                    startCountdown();
                }
            } else {
                resetKonamiCode();
            }
        }
        // Countdown
        function startCountdown() {
            let countdown = 5;
            countdownTimer.textContent = countdown;
            clearInterval(timer);
            timer = setInterval(() => {
                countdown--;
                countdownTimer.textContent = "Redirecting in: " + countdown + " seconds...";
                if (countdown === 0) {
                    clearInterval(timer);
                    window.location.href = "/html/trivia.html";
                }
            }, 1000);
        }
        // Close Popup
        function closePopup() {
            site.classList.remove("blur");
            popup.style.display = "none";
            controller.style.display = "none";
            resetKonamiCode();
            clearInterval(timer);
            countdownTimer.textContent = "";
        }
        // Event listener for icon to toggle popup
        iconContainer.addEventListener("click", toggleDisplay);
        // Event listenter for enter key
        iconContainer.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                toggleDisplay(event);
            }
        });
        iconContainer.addEventListener("touchstart", toggleDisplay);
        // Event listener for Konami Message to dismiss Popup
        konamiMessage.addEventListener("click", closePopup);
        // Keydown event listener for keyboard input
        document.addEventListener("keydown", function (event) {
            // Check for the Escape key to close the popup
            if (event.key === "Escape") {
                closePopup();
                site.classList.remove("blur");
                return;
            }
            // Check for Alt + ArrowUp combination
            if (event.altKey && event.key === "ArrowUp") {
                event.preventDefault();
                site.classList.add("blur");
                popup.style.display = "block";
                controller.style.display = popup.style.display;
                checkKonamiCode("ArrowUp");
            } else if (konamiIndex > 0) {
                checkKonamiCode(event.key);
            }
        });
        // Event listener for keyup to handle Alt key release
        document.addEventListener("keyup", function(event) {
            if (event.key === "Alt") {
                altKeyPressed = false; // Reset Alt key state
            }
        });
        // Event listeners for touch controller buttons
        const buttons = controller.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const key = this.dataset.key;
                checkKonamiCode(key);
            });
        });
    });
})();
