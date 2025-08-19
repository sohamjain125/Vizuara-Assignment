import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, BookOpen, Play, Home } from 'lucide-react'

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
    { path: '/story', label: 'Story', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { path: '/exercises', label: 'Exercises', icon: Brain, color: 'from-green-500 to-green-600' },
    { path: '/demo', label: 'Try It!', icon: Play, color: 'from-orange-500 to-orange-600' }
  ]

  return (
    <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-400 to-purple-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Emotion Detective
              </h1>
              <p className="text-sm text-gray-600 font-medium">Learn Sentiment Analysis!</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setCurrentPage(item.label.toLowerCase())}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(() => {
                  switch (currentPage) {
                    case 'home': return 25
                    case 'story': return 50
                    case 'exercises': return 75
                    case 'demo': return 100
                    default: return 25
                  }
                })()}%` 
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">
            {currentPage === 'home' && 'Getting Started...'}
            {currentPage === 'story' && 'Learning the Story...'}
            {currentPage === 'exercises' && 'Practicing...'}
            {currentPage === 'demo' && 'Ready to Explore!'}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
