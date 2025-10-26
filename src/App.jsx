import { useState } from 'react'
import Home from './pages/Home'
import MajorasMaskGuide from './pages/MajorasMaskGuide'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'majoras-mask':
        return <MajorasMaskGuide onBack={() => setCurrentPage('home')} />
      case 'home':
      default:
        return <Home onNavigate={(gameId) => setCurrentPage(gameId)} />
    }
  }

  return (
    <div className="app">
      {renderPage()}
    </div>
  )
}

export default App
