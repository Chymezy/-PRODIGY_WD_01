import React from 'react'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Footer from './components/Footer'
import { DarkModeProvider } from './contexts/DarkModeContext'
import AccessibilityWrapper from './components/AccessibilityWrapper'
import './index.css'
import BackToTop from './components/BackToTop'

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <DarkModeProvider>
        <AccessibilityWrapper>
          <Navbar />
          <LandingPage />
          <Footer />
          <BackToTop />
        </AccessibilityWrapper>
      </DarkModeProvider>
    </I18nextProvider>
  )
}

export default App
