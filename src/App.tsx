import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { DarkModeProvider } from './contexts/DarkModeContext'
import './index.css'
import BackToTop from './components/BackToTop'
import ErrorBoundary from './components/ErrorBoundary'

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <Navbar />
        <ErrorBoundary>
          <main className="flex-grow">
            <LandingPage />
          </main>
        </ErrorBoundary>
        <Footer />
        <BackToTop />
      </div>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NeuraNova",
          "url": "https://www.neuranova.com",
          "logo": "https://www.neuranova.com/logo.png",
          "description": "NeuraNova provides cutting-edge AI-powered analytics solutions to help businesses make data-driven decisions and achieve exponential growth.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 AI Street",
            "addressLocality": "Tech City",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-123-456-7890",
            "contactType": "customer service"
          }
        })}
      </script>
    </DarkModeProvider>
  )
}

export default App
