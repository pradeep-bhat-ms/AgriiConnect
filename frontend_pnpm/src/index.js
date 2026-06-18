import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import store from './store'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// Suppress deprecated google.maps.Marker warnings in the console
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('google.maps.Marker is deprecated')
  ) {
    return;
  }
  originalWarn(...args);
};

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
