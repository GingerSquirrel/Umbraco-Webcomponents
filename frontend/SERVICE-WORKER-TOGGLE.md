# Service Worker Development Toggle

This project includes a service worker toggle system for local development, making it easy to disable the service worker when needed for debugging or testing.

## Methods to Disable Service Worker

### 1. Environment Variable (Permanent for session)
Create a `.env` file in the `frontend` directory:
```bash
VITE_DISABLE_SW=true
```

### 2. Development Tools Panel (Runtime toggle)
In development mode, a floating dev tools panel appears in the top-right corner that allows you to:
- Toggle service worker on/off with persistence across page reloads
- Clear all caches
- Hard reload the page

### 3. Browser Console (Manual toggle)
You can manually control the service worker via the browser console:

```javascript
// Disable service worker
PWAUtils.toggleServiceWorker(true);

// Enable service worker
PWAUtils.toggleServiceWorker(false);

// Check if disabled
PWAUtils.isServiceWorkerDisabledLocally();

// Unregister all service workers
PWAUtils.unregisterServiceWorker();
```

### 4. localStorage (Direct browser storage)
The toggle state is persisted in localStorage:
```javascript
// Disable
localStorage.setItem('sw-disabled', 'true');

// Enable
localStorage.setItem('sw-disabled', 'false');

// Or remove the setting entirely
localStorage.removeItem('sw-disabled');
```

## How It Works

The service worker registration is controlled by `PWAUtils.isServiceWorkerDisabledLocally()` which checks:

1. **Runtime flag**: Class property set by the dev tools toggle
2. **localStorage**: User preference persisted across sessions (`sw-disabled` key)
3. **Environment variable**: Build-time configuration (`VITE_DISABLE_SW`)

If any of these indicate the service worker should be disabled, registration is skipped entirely.

## Development Tools Panel

The dev tools panel only appears in development mode (`import.meta.env.DEV`) and provides:

- **Service Worker Toggle**: Enable/disable with visual feedback
- **Clear Cache**: Remove all cached data
- **Hard Reload**: Force a complete page refresh
- **Status Indicators**: Visual confirmation of current state

## Benefits

- **No code changes needed** for temporary debugging
- **Persistent preferences** across development sessions  
- **Multiple control methods** for different workflows
- **Visual feedback** in development environment
- **Production safety** - dev tools are excluded from production builds

## Common Use Cases

- **Debugging network requests** without cache interference
- **Testing offline functionality** by toggling SW on/off
- **Development iteration** without cache persistence
- **SSL certificate issues** in local HTTPS development
- **Component hot-reloading** without service worker conflicts

The system is designed to be developer-friendly while maintaining the benefits of service workers in production environments.
