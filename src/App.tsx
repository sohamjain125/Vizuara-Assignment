import  { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StoryPage from './pages/StoryPage'
import ExercisePage from './pages/ExercisePage'
import InteractiveDemo from './pages/InteractiveDemo'
import { SentimentProvider } from './context/SentimentContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <SentimentProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
              <Route path="/story" element={<StoryPage setCurrentPage={setCurrentPage} />} />
              <Route path="/exercises" element={<ExercisePage setCurrentPage={setCurrentPage} />} />
              <Route path="/demo" element={<InteractiveDemo setCurrentPage={setCurrentPage} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SentimentProvider>
  )
}

export default App
