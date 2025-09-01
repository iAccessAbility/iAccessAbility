const toggleGroups = ["iPhone", "iPad", "AppleWatch", "AirPods", "AppleTV", "HomePod"];
let currentCategory = null;
function toggleCategory(category) {
    currentCategory = category;
    for (let group of toggleGroups) {
        const elements = document.getElementsByClassName(group);
        for (let el of elements) {
            el.style.display = (group === category) ? (el.style.display === "block" ? "none" : "block") : "none";
        }
    }
}
function iPhoneToggle() { toggleCategory("iPhone"); }
function iPadToggle() { toggleCategory("iPad"); }
function AppleWatchToggle() { toggleCategory("AppleWatch"); }
function AirPodsToggle() { toggleCategory("AirPods"); }
function AppleTVToggle() { toggleCategory("AppleTV"); }
function HomePodToggle() { toggleCategory("HomePod"); }
const sheets = {
    iPhone: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=0&single=true&output=csv",
    iPad: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=1306517710&single=true&output=csv",
    AppleWatch: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=2104347561&single=true&output=csv",
    AirPods: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=874084650&single=true&output=csv",
    AppleTV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=1636405451&single=true&output=csv",
    HomePod: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsN6jKf07-m0JMknDST6FgnmepD9DX6I4G06PD-E3JRVSlJa50eeHJ0YC7056hMlIsM_qWMsxhPMId/pub?gid=1529167604&single=true&output=csv"
};
const displayNames = {
    iPhone: "iPhone",
    iPad: "iPad",
    AppleWatch: "Apple Watch",
    AirPods: "AirPods",
    AppleTV: "Apple TV",
    HomePod: "HomePod"
};
function loadSheet(sheetURL, category) {
    Papa.parse(sheetURL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            var rows = chunk.split("\n");
            const lastUpdatedRaw = rows[0].split(",")[0];
            window.lastUpdated = lastUpdatedRaw.replace("Updated: ", "").trim();
            rows.shift();
            return rows.join("\n");
        },
        complete: function(results) {
            const site = document.querySelector("main.site");
            const timeline = document.getElementById("timeline");
            const oldCards = document.querySelectorAll(`.timeline-card.${category}`);
            oldCards.forEach(card => card.remove());
            const oldFooter = document.querySelector(`.last-updated.${category}`);
            if (oldFooter) oldFooter.remove();
            let lastUpdated = "";
            if (results.data.length > 0) {
                const firstRow = results.data[0];
                const firstCellKey = Object.keys(firstRow)[0];
                lastUpdated = firstRow[firstCellKey];
            }
            results.data.forEach(item => {
                const card = document.createElement("div");
                card.className = `timeline-card ${category}`;
                card.innerHTML = `
                    ${item.Image ? `<img src="${item.Image}" alt="${displayNames} ${item.Model}">` : ""}
                    ${item.Model ? `<h2><strong>${displayNames[category]}</strong> ${item.Model}</h2>` : ""}
                    <hr>
                    <h3>${item.Tagline || ""}</h3>
                    <hr>
                    ${item["Initial Price"] ? `<p><strong>Retail Price:</strong> ${item["Initial Price"]}</p>` : ""}
                    ${item.Capacity ? `<p><strong>Capacity:</strong> ${item.Capacity}</p>` : ""}
                    ${item.Processor ? `<p><strong>Chipset:</strong> ${item.Processor}</p>` : ""}
                    ${item.Colors ? `<p><strong>Color:</strong> ${item.Colors}</p>` : ""}
                    ${item.iOS ? `<p><strong>iOS:</strong> ${item.iOS}</p>` : ""}
                    ${item.watchOS ? `<p><strong>watchOS:</strong> ${item.watchOS}</p>` : ""}
                    ${item.tvOS ? `<p><strong>tvOS:</strong> ${item.tvOS}</p>` : ""}
                    ${item["Software Version"] ? `<p><strong>Software Version:</strong> ${item["Software Version"]}</p>` : ""}
                    ${item["Display Type"] ? `<p><strong>Display:</strong> ${item["Display Type"]}</p>` : ""}
                    ${item["Battery mAh Capacity"] ? `<p><strong>Battery:</strong> ${item["Battery mAh Capacity"]}</p>` : ""}
                `;
                timeline.appendChild(card);
                formatCategoryDeviceLines(card);
            });
            if (lastUpdated) {
                const footer = document.createElement("footer");
                let parts = window.lastUpdated.split("/");
                let year = parseInt(parts[2], 10);
                let formattedDate = new Date(year, parseInt(parts[0], 10)-1, parseInt(parts[1], 10));
                if (year < 100) year += 2000;
                footer.id = "footer";
                footer.className = `last-updated ${category}`;
                footer.style.whiteSpace = "pre-wrap";
                footer.textContent = "Last Updated: " + formattedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) + "\n" + "Content Provided by Mactracker";
                site.appendChild(footer);
            }
            if (currentCategory) {
                const elements = document.getElementsByClassName(currentCategory);
                for (let el of elements) el.style.display = "block";
            }
        },
        error: function(err) {
            console.error(`Error loading ${category} sheet:`, err);
        }
    });
}
function formatCategoryDeviceLines(container) {
    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach(p => {
        if (p.classList.contains("split-center")) return;
        const strong = p.querySelector("strong");
        if (!strong) return;
        const strongText = strong.textContent.trim();
        if (!/:$/.test(strongText)) return;
        const deviceText = p.textContent.replace(strongText, "").trim();
        if (!deviceText) return;
        p.innerHTML = "";
        p.classList.add("split-center");
        const left = document.createElement("span");
        left.className = "left";
        const leftStrong = document.createElement("strong");
        leftStrong.textContent = strongText.replace(/:$/, "");
        left.appendChild(leftStrong);
        const divider = document.createElement("span");
        divider.className = "divider";
        divider.textContent = "";
        const right = document.createElement("span");
        right.className = "right";
        right.textContent = deviceText;
        p.appendChild(left);
        p.appendChild(divider);
        p.appendChild(right);
    });
}
function refreshAllSheets() {
    for (let category in sheets) {
        loadSheet(sheets[category], category);
    }
}
refreshAllSheets();
setInterval(refreshAllSheets, 30000);
