import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'  // Import i18n configuration
import './index.css'

// Development-only accessibility testing
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  }).catch(err => {
    console.error('Error loading axe-core:', err);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
