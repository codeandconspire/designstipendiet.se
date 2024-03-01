/* eslint-env serviceworker */

self.addEventListener('install', function(e) {
  self.skipWaiting()
})

self.addEventListener('activate', function(e) {
  self.registration.unregister()
})
