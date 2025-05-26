if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service worker registered:', reg))
    .catch(err => console.error('Service worker registration failed:', err));
}

const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

if (isPWA) {
    document.getElementById('main-navbar').style.display = 'none';
    document.getElementById('pwa-navbar').style.display = 'block';
}

function updateThemeColor() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', isDark ? '#111' : '#eee');
    }
}
updateThemeColor();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);
