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
    </DarkModeProvider>
  )
}

export default App
