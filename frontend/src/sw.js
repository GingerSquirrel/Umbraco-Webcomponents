const CACHE_NAME = 'webcomponents-pwa-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Core assets to cache immediately (App Shell)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/icon-512x512-maskable.png'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Cache all JS/CSS files (includes bundled web components)
  webcomponents: /\.(js|css)$/,
  // Cache images and SVGs used by components
  images: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
  // Cache fonts (including Google Fonts)
  fonts: /\.(woff|woff2|ttf|eot)$/
};

// Google Fonts domains to cache
const GOOGLE_FONTS_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Check if URL is a Google Font
function isGoogleFont(url) {
  return GOOGLE_FONTS_DOMAINS.some(domain => url.includes(domain));
}

// Debug function to inspect cache contents
async function debugCacheContents() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const requests = await cache.keys();
    console.log('🔍 Cache contents:', requests.map(req => req.url));
    
    // Specifically check for Google Fonts
    const googleFonts = requests.filter(req => isGoogleFont(req.url));
    console.log('🔤 Google Fonts in cache:', googleFonts.map(req => req.url));
    
    return googleFonts;
  } catch (error) {
    console.error('Failed to debug cache:', error);
    return [];
  }
}

// Helper function to cache dynamic assets (like Vite-generated files)
async function cacheViteAssets() {
  try {
    const response = await fetch('/');
    const html = await response.text();
    
    // Extract asset URLs from the HTML (Vite injects these)
    const jsMatches = html.match(/\/assets\/[^"']+\.js/g);
    const cssMatches = html.match(/\/assets\/[^"']+\.css/g);
    
    const assetUrls = [...(jsMatches || []), ...(cssMatches || [])];
    
    if (assetUrls.length > 0) {
      const cache = await caches.open(STATIC_CACHE);
      console.log('Precaching Vite assets:', assetUrls);
      
      // Cache each asset
      for (const url of assetUrls) {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn('Failed to cache asset:', url, error);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to precache Vite assets:', error);
  }
}

// Helper function to validate and cache manifest icons
async function validateAndCacheIcons() {
  try {
    const manifestResponse = await fetch('/manifest.json');
    const manifest = await manifestResponse.json();
    
    if (manifest.icons && Array.isArray(manifest.icons)) {
      const cache = await caches.open(STATIC_CACHE);
      console.log('Validating and caching manifest icons...');
      
      for (const icon of manifest.icons) {
        try {
          const iconUrl = icon.src;
          console.log('Checking icon:', iconUrl);
          
          const iconResponse = await fetch(iconUrl);
          if (iconResponse.ok) {
            await cache.put(iconUrl, iconResponse.clone());
            console.log('✅ Cached icon:', iconUrl);
          } else {
            console.warn('❌ Failed to fetch icon (status ' + iconResponse.status + '):', iconUrl);
          }
        } catch (error) {
          console.warn('❌ Error caching icon:', icon.src, error);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to validate manifest icons:', error);
  }
}

// Helper function to preload Google Fonts
async function preloadGoogleFonts() {
  // Inter font URLs from your fonts.scss
  const fontUrls = [
    'https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvsYwYL8g.woff2', // latin-ext
    'https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcviYwY.woff2'     // latin
  ];

  try {
    const cache = await caches.open(STATIC_CACHE);
    console.log('Precaching Google Fonts:', fontUrls);
    
    for (const fontUrl of fontUrls) {
      try {
        // Create a proper request object
        const request = new Request(fontUrl, {
          mode: 'cors',
          credentials: 'omit'
        });
        
        const response = await fetch(request);
        
        if (response && response.status === 200) {
          // Clone the response to ensure it can be stored
          const responseClone = response.clone();
          await cache.put(request, responseClone);
          console.log('Successfully cached Google Font:', fontUrl);
        } else {
          console.warn('Failed to fetch font (status ' + response.status + '):', fontUrl);
        }
      } catch (error) {
        console.warn('Failed to preload font:', fontUrl, error);
      }
    }
  } catch (error) {
    console.warn('Failed to preload Google Fonts:', error);
  }
}

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache static assets (excluding icons, we'll validate those separately)
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('Caching core static assets');
          const coreAssets = STATIC_ASSETS.filter(asset => !asset.startsWith('/icons/'));
          return cache.addAll(coreAssets);
        }),
      // Validate and cache manifest icons separately
      validateAndCacheIcons(),
      // Cache dynamic Vite-generated assets (web components bundle)
      cacheViteAssets(),
      // Preload Google Fonts
      preloadGoogleFonts()
    ])
    .then(() => {
      console.log('All assets cached successfully');
      return self.skipWaiting();
    })
    .catch((error) => {
      console.error('Failed to cache assets:', error);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Keep current version caches, delete old ones
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Debug cache contents after activation
        debugCacheContents();
        return self.clients.claim();
      })
  );
});

// Fetch event with smart caching for web components
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Handle Google Fonts specifically with enhanced offline support
  if (isGoogleFont(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('✅ Serving Google Font from cache:', event.request.url);
            return cachedResponse;
          }

          // If not in cache and we're likely offline, try to match by URL string
          return caches.open(STATIC_CACHE)
            .then((cache) => {
              return cache.keys().then((requests) => {
                // Find matching font in cache by URL
                const matchingRequest = requests.find(req => req.url === event.request.url);
                if (matchingRequest) {
                  console.log('✅ Found Google Font in cache by URL match:', event.request.url);
                  return cache.match(matchingRequest);
                }
                
                // Try to fetch from network if online
                console.log('🌐 Attempting to fetch Google Font from network:', event.request.url);
                return fetch(event.request, {
                  mode: 'cors',
                  credentials: 'omit'
                })
                .then((response) => {
                  if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    cache.put(event.request, responseToCache)
                      .then(() => {
                        console.log('✅ Cached Google Font from network:', event.request.url);
                      })
                      .catch((error) => {
                        console.error('❌ Failed to cache Google Font:', error);
                      });
                    return response;
                  }
                  throw new Error('Font fetch failed with status: ' + response.status);
                })
                .catch((error) => {
                  console.error('❌ Failed to fetch Google Font (likely offline):', event.request.url, error);
                  // Return a fallback - could be a system font or empty response
                  return new Response('', { 
                    status: 200, 
                    statusText: 'OK',
                    headers: { 'Content-Type': 'font/woff2' }
                  });
                });
              });
            });
        })
    );
    return;
  }

  // Skip caching for other non-same-origin requests (external APIs, CDNs)
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Fetch from network
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            const pathname = url.pathname;

            // Determine caching strategy based on resource type
            let cacheToUse = DYNAMIC_CACHE;
            
            if (CACHE_STRATEGIES.webcomponents.test(pathname)) {
              // Cache JS/CSS files (web components bundle) with high priority
              cacheToUse = STATIC_CACHE;
              console.log('Caching web component asset:', pathname);
            } else if (CACHE_STRATEGIES.images.test(pathname)) {
              // Cache images used by components
              console.log('Caching image asset:', pathname);
            } else if (CACHE_STRATEGIES.fonts.test(pathname)) {
              // Cache fonts
              console.log('Caching font asset:', pathname);
            }

            // Cache the response
            caches.open(cacheToUse)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.error('Failed to cache response:', error);
              });

            return response;
          })
          .catch((error) => {
            console.error('Fetch failed for:', event.request.url, error);
            
            // Try to return cached version as fallback
            return caches.match(event.request)
              .then((fallbackResponse) => {
                if (fallbackResponse) {
                  console.log('Serving fallback from cache:', event.request.url);
                  return fallbackResponse;
                }
                
                // If it's an HTML request and we're offline, serve the main page
                if (event.request.headers.get('accept').includes('text/html')) {
                  return caches.match('/');
                }
                
                throw error;
              });
          });
      })
  );
});