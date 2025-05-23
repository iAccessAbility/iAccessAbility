document.querySelectorAll('.card').forEach(card => {
    const zipUrl = card.getAttribute('data-download');
    if (zipUrl) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const slides = card.querySelectorAll(".wallpaper-slide");
        let current = 0;

        if (slides.length === 0) return;

        // Initially show the first image
        slides[current].classList.add("active");

        // Cycle through images
        setInterval(() => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        }, 3000); // change every 3 seconds
    });
});
