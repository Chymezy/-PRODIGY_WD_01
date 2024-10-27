import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <LandingPage />
    </div>
  )
}

export default App
