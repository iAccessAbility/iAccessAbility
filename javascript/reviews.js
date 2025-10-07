const reviewsSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSFojLFUKYoMzHyVgkbBxMyVjOY1n4vDwwmMt1ro_s2iBO_ty1jXFiuBh2N9rMhiTEI_4Q2PkQTX2B/pub?gid=1624005337&single=true&output=csv";

function loadReviews() {
    Papa.parse(reviewsSheetURL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            const container = document.getElementById("reviews-container");
            container.innerHTML = "";
            results.data.forEach(review => {
                let formattedDate = "";
                if (review.timestamp) {
                    const dateParts = review.timestamp.match(/\d{1,2}\/\d{1,2}\/\d{4}$/);
                    if (dateParts) {
                        const date = new Date(dateParts[0]);
                        if (!isNaN(date)) {
                            formattedDate = date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
                        }
                    }
                }
                let name = "Anonymous";
                if (review.Agreement && review.Agreement.trim() === "Yes" && review["First Name"]) {
                    name = review["First Name"].trim();
                }
                const article = document.createElement("article");
                article.className = "review";
                article.innerHTML = `
                    <header>
                        <h2>Service Received&#58; <span class="service-name">${review.Service || "Unknown"}</span></h2>
                    </header>
                    <div class="review-content">
                        <blockquote>
                            <p>${review.Review ? review.Review : ""}</p>
                        </blockquote>
                        <footer>
                            <cite>&#8212; ${name}</cite>
                            ${formattedDate ? `<span> &#124; ${formattedDate}</span>` : ""}
                        </footer>
                    </div>
                `;
                container.appendChild(article);
            });
        },
        error: function(err) {
            console.error("Error loading reviews:", err);
        }
    });
}
loadReviews();
setInterval(loadReviews, 10000);
