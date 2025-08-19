import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Sparkles, ArrowRight, BookOpen, Play, Zap } from 'lucide-react'

interface HomePageProps {
  setCurrentPage: (page: string) => void
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Story",
      description: "Follow Emma and Max on their adventure to understand emotions in text!",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Brain,
      title: "Fun Exercises",
      description: "Practice identifying emotions with engaging activities and games!",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Play,
      title: "Try It Yourself",
      description: "Test your skills with our interactive sentiment analysis tool!",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const learningObjectives = [
    "Understand what sentiment analysis means",
    "Learn to identify positive, negative, and neutral emotions",
    "Practice with real examples",
    "Build confidence in reading emotions from text"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
          />
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Emotion Detective!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          🕵️‍♀️ Ready to become a master at reading emotions from text? 
          Join Emma and Max on an exciting journey to learn about 
          <span className="font-bold text-purple-600"> Sentiment Analysis</span>!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/story"
            onClick={() => setCurrentPage('story')}
            className="interactive-button text-lg px-8 py-4 flex items-center space-x-2 group"
          >
            <BookOpen className="w-6 h-6" />
            <span>Start the Adventure!</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/demo"
            onClick={() => setCurrentPage('demo')}
            className="bg-white border-2 border-purple-500 text-purple-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-purple-50 transition-all duration-200 flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Try It Now!</span>
          </Link>
        </div>
      </motion.div>

      {/* What You'll Learn Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🎯 What You'll Learn Today
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {learningObjectives.map((objective, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-700 font-medium">{objective}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🚀 What Makes This Special?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Adventure?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join Emma and Max as they discover the magical world of reading emotions from text!
          </p>
          <Link
            to="/story"
            onClick={() => setCurrentPage('story')}
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Let's Go!</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage
