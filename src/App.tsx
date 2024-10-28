import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { DarkModeProvider } from './contexts/DarkModeContext'
import './index.css'
import BackToTop from './components/BackToTop'

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        {/* Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-purple-700"
        >
          Skip to main content
        </a>

        <header role="banner" aria-label="Site header">
          <Navbar />
        </header>

        <main id="main-content" tabIndex={-1} aria-label="Main content">
          <LandingPage />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </DarkModeProvider>
  )
}

export default App
