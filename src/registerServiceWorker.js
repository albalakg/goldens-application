/* eslint-disable no-console */

import { register } from 'register-service-worker'

// Removed only in production
// if (process.env.APP_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      //
    },
    registered () {
      //
    },
    cached () {
      //
    },
    updatefound () {
      //
    },
    updated () {
      //
    },
    offline () {
      //
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
// }
