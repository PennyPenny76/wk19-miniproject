import { Workbox } from 'workbox-window';
import '../css/styles.css';

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register workbox service worker
  const workboxSW = new Workbox('./service-worker.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
  });
}

