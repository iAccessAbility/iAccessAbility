const CACHE_NAME = 'support-articles-v1';
const FILES_TO_CACHE = [
  '/html/support-articles.html',
  '/html/articles/talkback-speech-android.html',
  '/html/articles/custom-ringtone-ios.html',
  '/html/articles/voiceover-rotor-ios.html',
  '/html/articles/talkback-menu-android.html',
  '/html/articles/locked-apple-account.html',
  '/html/articles/select-to-speak-android.html',
  '/html/articles/create-apple-account.html',
  '/html/articles/restart-iphone.html',
  '/html/articles/display-colors-ios.html',
  '/html/articles/quick-settings-panel-android.html',
  '/html/articles/dark-mode-ios.html',
  '/html/articles/getting-started-with-voiceover-for-ios.html',
  '/html/articles/display-colors-android.html',
  '/html/articles/braillekeyboard-android.html',
  '/html/articles/dark-theme-android.html',
  '/html/articles/getting-started-with-magnification-for-android.html',
  '/html/articles/text-size-android.html',
  '/html/articles/create-google-account.html',
  '/html/articles/control-center-ios.html',
  '/html/articles/talkback-gestures.html',
  '/html/articles/voiceover-speech-ios.html',
  '/html/articles/create-samsung-account.html',
  '/html/articles/shutdown-or-restart-mac.html',
  '/html/articles/accessibility-shortcut-ios.html',
  '/html/articles/force-restart-ipad.html',
  '/html/articles/forgot-apple-account.html',
  '/html/articles/shutdown-or-restart-google-pixel-phone.html',
  '/html/articles/restart-ipad.html',
  '/html/articles/force-restart-iphone.html',
  '/html/articles/voiceover-gestures.html',
  '/html/articles/spoken-content.html',
  '/html/articles/getting-started-with-zoom-for-mac.html',
  '/html/articles/text-size-ios.html',
  '/html/articles/getting-started-with-talkback.html',
  '/html/articles/custom-ringtone-android.html',
  '/html/articles/dark-theme-chrome-android.html',
  '/html/articles/braillescreeninput.html',
  '/html/articles/restart-apple-watch.html',
  '/html/articles/getting-started-with-zoom-for-ios.html',
  '/html/articles/forgot-apple-account-password.html',
  '/stylesheets/support-articles.css',
  '/javascript/register-sw.js',
  '/javascript/pwa.js',
  '/img/logo-colored.svg'
];

// Install and cache files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE).catch(err => {
        console.error('Caching failed', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate and clean old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Serve cached files if offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request)
        .then(fetchRes => {
          return fetchRes;
        });
    })
    .catch(() => {
      // Fallback: show support page if offline and request fails
      if (event.request.mode === 'navigate') {
        return caches.match('/html/support-articles.html');
      }
    })
  );
});
