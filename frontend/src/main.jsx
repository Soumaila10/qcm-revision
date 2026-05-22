import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('SW: Registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.error('SW: Registration failed:', err);
      });
  });
} else if (!import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (registrations.length > 0) {
      console.log(`SW: Found ${registrations.length} active service worker(s). Unregistering and clearing caches...`);
      const unregisterPromises = registrations.map(reg => reg.unregister());
      
      Promise.all(unregisterPromises).then(() => {
        if (window.caches) {
          caches.keys().then((keys) => {
            const deletePromises = keys.map(key => caches.delete(key));
            Promise.all(deletePromises).then(() => {
              console.log('SW: Caches cleared. Reloading page...');
              window.location.reload();
            });
          });
        } else {
          window.location.reload();
        }
      });
    }
  });
}

