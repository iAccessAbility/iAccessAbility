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
