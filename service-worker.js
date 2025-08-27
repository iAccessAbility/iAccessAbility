const CACHE_NAME = 'support-articles-v1';
const FILES_TO_CACHE = [
  'https://support.iaccessabilityservices.com/html/support-articles.html',
  'https://support.iaccessabilityservices.com/articles/talkback-speech-android.html',
  'https://support.iaccessabilityservices.com/articles/custom-ringtone-ios.html',
  'https://support.iaccessabilityservices.com/articles/voiceover-rotor-ios.html',
  'https://support.iaccessabilityservices.com/articles/talkback-menu-android.html',
  'https://support.iaccessabilityservices.com/articles/locked-apple-account.html',
  'https://support.iaccessabilityservices.com/articles/select-to-speak-android.html',
  'https://support.iaccessabilityservices.com/articles/create-apple-account.html',
  'https://support.iaccessabilityservices.com/articles/restart-iphone.html',
  'https://support.iaccessabilityservices.com/articles/display-colors-ios.html',
  'https://support.iaccessabilityservices.com/articles/quick-settings-panel-android.html',
  'https://support.iaccessabilityservices.com/articles/dark-mode-ios.html',
  'https://support.iaccessabilityservices.com/articles/getting-started-with-voiceover-for-ios.html',
  'https://support.iaccessabilityservices.com/articles/display-colors-android.html',
  'https://support.iaccessabilityservices.com/articles/braillekeyboard-android.html',
  'https://support.iaccessabilityservices.com/articles/dark-theme-android.html',
  'https://support.iaccessabilityservices.com/articles/getting-started-with-magnification-for-android.html',
  'https://support.iaccessabilityservices.com/articles/text-size-android.html',
  'https://support.iaccessabilityservices.com/articles/create-google-account.html',
  'https://support.iaccessabilityservices.com/articles/control-center-ios.html',
  'https://support.iaccessabilityservices.com/articles/talkback-gestures.html',
  'https://support.iaccessabilityservices.com/articles/voiceover-speech-ios.html',
  'https://support.iaccessabilityservices.com/articles/create-samsung-account.html',
  'https://support.iaccessabilityservices.com/articles/shutdown-or-restart-mac.html',
  'https://support.iaccessabilityservices.com/articles/accessibility-shortcut-ios.html',
  'https://support.iaccessabilityservices.com/articles/force-restart-ipad.html',
  'https://support.iaccessabilityservices.com/articles/forgot-apple-account.html',
  'https://support.iaccessabilityservices.com/articles/shutdown-or-restart-google-pixel-phone.html',
  'https://support.iaccessabilityservices.com/articles/restart-ipad.html',
  'https://support.iaccessabilityservices.com/articles/force-restart-iphone.html',
  'https://support.iaccessabilityservices.com/articles/voiceover-gestures.html',
  'https://support.iaccessabilityservices.com/articles/spoken-content.html',
  'https://support.iaccessabilityservices.com/articles/getting-started-with-zoom-for-mac.html',
  'https://support.iaccessabilityservices.com/articles/text-size-ios.html',
  'https://support.iaccessabilityservices.com/articles/getting-started-with-talkback.html',
  'https://support.iaccessabilityservices.com/articles/custom-ringtone-android.html',
  'https://support.iaccessabilityservices.com/articles/dark-theme-chrome-android.html',
  'https://support.iaccessabilityservices.com/articles/braillescreeninput.html',
  'https://support.iaccessabilityservices.com/articles/restart-apple-watch.html',
  'https://support.iaccessabilityservices.com/articles/getting-started-with-zoom-for-ios.html',
  'https://support.iaccessabilityservices.com/articles/forgot-apple-account-password.html',
  'https://support.iaccessabilityservices.com/stylesheets/support-articles.css',
  'https://support.iaccessabilityservices.com/javascripts/pwa.js',
  'https://iaccessabilityservices.com/img/logo-colored.svg',
  // media
  'https://support.iaccessabilityservices.com/media/images/remove-a-control.png',
  'https://support.iaccessabilityservices.com/media/images/edit-controls-ios-17-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/add-a-control.png',
  'https://support.iaccessabilityservices.com/media/images/ios-dark-mode-light.png',
  'https://support.iaccessabilityservices.com/media/images/touch-id-top-button-iphone-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-mode-dark.png',
  'https://support.iaccessabilityservices.com/media/images/iphone-garageband-screenshot-1.png',
  'https://support.iaccessabilityservices.com/media/images/mac-restart-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/pixel-chrome-dark-theme-checkbox-dark.png',
  'https://support.iaccessabilityservices.com/media/images/iphone-garageband-screenshot-2.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-eye-comfort-shield-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/iphone-x-force-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/.DS_Store',
  'https://support.iaccessabilityservices.com/media/images/galaxy-screen-mode-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/pixel-chrome-dark-theme-checkbox-enable-dark.png',
  'https://support.iaccessabilityservices.com/media/images/create-google-account-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/ios-dark-mode-control-center.png',
  'https://support.iaccessabilityservices.com/media/images/ios-dark-mode-dark.png',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-mode-light.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-filter-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/mac-shutdown-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-inversion-dark.PNG',
  'https://support.iaccessabilityservices.com/media/images/accessbility-shortcuts-settings-dark.png',
  'https://support.iaccessabilityservices.com/media/images/face-id-iphone-power-button.png',
  'https://support.iaccessabilityservices.com/media/images/no-home-button-ipad-power-button.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-high-contrast-fonts-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/bsi-activation-gesture-screenshot-dark.png',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-correction-light.PNG',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-inversion-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/edit-controls-ios-17-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/resize-a-control.png',
  'https://support.iaccessabilityservices.com/media/images/touch-id-iphone-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-adjustment-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/iphone-8-force-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/ipad-home-button-restart.png',
  'https://support.iaccessabilityservices.com/media/images/rotor-counter-clockwise-dark.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-schedule-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/access-controls-no-home-button.png',
  'https://support.iaccessabilityservices.com/media/images/accessbility-shortcuts-settings-light.png',
  'https://support.iaccessabilityservices.com/media/images/mac-restart-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/pixel-night-light-light.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-dark-theme-quick-settings.png',
  'https://support.iaccessabilityservices.com/media/images/pixel-extra-dim-dark.png',
  'https://support.iaccessabilityservices.com/media/images/ipad-9-force-restart.jpg',
  'https://support.iaccessabilityservices.com/media/images/pixel-dark-theme-light.png',
  'https://support.iaccessabilityservices.com/media/images/apple-watch-dark.png',
  'https://support.iaccessabilityservices.com/media/images/access-controls-with-home-button.png',
  'https://support.iaccessabilityservices.com/media/images/face-id-iphone-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/edit-controls.png',
  'https://support.iaccessabilityservices.com/media/images/apple-watch-light.png',
  'https://support.iaccessabilityservices.com/media/images/ios-18-iphone-15-pro-device-setup-create-a-free-apple-account.png',
  'https://support.iaccessabilityservices.com/media/images/iphone-5-force-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-adjustment-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/galaxy-high-contrast-fonts-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-quick-settings-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/rotor-counter-clockwise-light.png',
  'https://support.iaccessabilityservices.com/media/images/ios-dark-mode-schedule-light.png',
  'https://support.iaccessabilityservices.com/media/images/mac-shutdown-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/ios-dark-mode-schedule-dark.png',
  'https://support.iaccessabilityservices.com/media/images/ipad-pro-force-restart.jpg',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-contrast-dark.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-chrome-dark-theme-checkbox-enable-light.png',
  'https://support.iaccessabilityservices.com/media/images/ios-18-iphone-15-pro-app-store-my-account-create-new-apple-account.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-screen-mode-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/create-google-account-dark.jpeg',
  'https://support.iaccessabilityservices.com/media/images/bsi-activation-gesture-screenshot-light.png',
  'https://support.iaccessabilityservices.com/media/images/home-button-iphone-power-button.png',
  'https://support.iaccessabilityservices.com/media/images/rearrange-controls.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/galaxy-edit-quick-settings-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-correction-dark.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-extra-dim-light.png',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-contrast-light.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-edit-quick-settings.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-inversion-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/iphone-7-force-restart.PNG',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-quick-settings-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/pixel-dark-theme-dark.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-eye-comfort-shield-light.jpg',
  'https://support.iaccessabilityservices.com/media/images/ipad-pro-face-id-restart.png',
  'https://support.iaccessabilityservices.com/media/images/galaxy-color-filter-dark.jpg',
  'https://support.iaccessabilityservices.com/media/images/galaxy-dark-mode-schedule-light.jpeg',
  'https://support.iaccessabilityservices.com/media/images/access-controls-on-ipad.png',
  'https://support.iaccessabilityservices.com/media/images/pixel-night-light-dark.PNG',
  'https://support.iaccessabilityservices.com/media/images/pixel-color-inversion-light.PNG',
  'https://support.iaccessabilityservices.com/media/images/galaxy-edit-quick-settings-dark.jpg',
  'https://support.iaccessabilityservices.com/media/videos/install-ringtone-google-pixel.mp4',
  'https://support.iaccessabilityservices.com/media/videos/install-text-tone-google-pixel.mp4',
  'https://support.iaccessabilityservices.com/articles.json',
  'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2',
  'https://iaccessabilityservices.com/javascript/dyslexic.js',
  'https://iaccessabilityservices.com/stylesheets/fonts.css'
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
        return caches.match('https://support.iaccessabilityservices.com/html/support-articles.html');
      }
    })
  );
});
