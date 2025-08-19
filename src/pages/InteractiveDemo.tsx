import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSentiment } from '../context/SentimentContext'
import { Brain, MessageCircle, TrendingUp, TrendingDown, Minus, Sparkles, RotateCcw, History, Lightbulb } from 'lucide-react'

interface InteractiveDemoProps {
  setCurrentPage: (page: string) => void
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ setCurrentPage }) => {
  const { analyzeSentiment, addSentimentResult, sentimentResults, clearResults } = useSentiment()
  const [inputText, setInputText] = useState('')
  const [currentResult, setCurrentResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const exampleTexts = [
    "I love this amazing movie! It's absolutely wonderful!",
    "Today was terrible. Everything went wrong and I'm so frustrated.",
    "The weather is cloudy today. It might rain later.",
    "This food is delicious and the service is excellent!",
    "I can't believe how rude and mean that person was to me.",
    "The book was interesting and informative.",
    "I'm so excited about the party tomorrow!",
    "This is the worst day ever. I hate everything about it."
  ]

  const handleAnalyze = () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const result = analyzeSentiment(inputText)
      setCurrentResult(result)
      addSentimentResult(result)
      setIsAnalyzing(false)
    }, 1000)
  }

  const handleExampleClick = (example: string) => {
    setInputText(example)
    setCurrentResult(null)
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-8 h-8 text-green-600" />
      case 'negative':
        return <TrendingDown className="w-8 h-8 text-red-600" />
      default:
        return <Minus className="w-8 h-8 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'from-green-500 to-green-600'
      case 'negative':
        return 'from-red-500 to-red-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'Very Confident'
    if (confidence >= 0.6) return 'Confident'
    return 'Less Confident'
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🔍 Interactive Sentiment Analysis</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Now it's your turn! Try analyzing the emotions in your own text. 
          Type any message and see how our AI detective identifies the feelings!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Text Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <span>Enter Your Text</span>
            </h2>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type any message here... For example: 'I love this amazing day!'"
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  !inputText.trim() || isAnalyzing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'interactive-button'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Analyze Sentiment</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example Texts */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>Try These Examples</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-2">
              {exampleTexts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm text-gray-700"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>How Does It Work?</span>
            </h3>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <p>Our AI reads your text and looks for emotion words</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <p>It counts positive words (like 'love', 'amazing') and negative words (like 'hate', 'terrible')</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <p>Based on the balance, it decides if the text is positive, negative, or neutral</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Current Analysis Result */}
          {currentResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <span>Analysis Result</span>
              </h2>
              
              <div className="space-y-4">
                {/* Sentiment */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {getSentimentIcon(currentResult.sentiment)}
                  </div>
                  <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${getSentimentColor(currentResult.sentiment)} text-white font-bold text-xl capitalize`}>
                    {currentResult.sentiment} Sentiment
                  </div>
                </div>

                {/* Confidence */}
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Confidence Level</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getSentimentColor(currentResult.sentiment)}`}
                        style={{ width: `${currentResult.confidence * 100}%` }}
                      />
                    </div>
                    <span className={`font-bold ${getConfidenceColor(currentResult.confidence)}`}>
                      {Math.round(currentResult.confidence * 100)}%
                    </span>
                  </div>
                  <p className={`text-sm ${getConfidenceColor(currentResult.confidence)} font-medium`}>
                    {getConfidenceText(currentResult.confidence)}
                  </p>
                </div>

                {/* Keywords */}
                {currentResult.keywords.length > 0 && (
                  <div>
                    <p className="text-gray-600 mb-2">Key Emotion Words Found:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentResult.keywords.map((keyword: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Analysis History */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <History className="w-5 h-5 text-gray-600" />
                <span>Analysis History</span>
              </h3>
              <button
                onClick={clearResults}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                title="Clear History"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            {sentimentResults.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No analyses yet. Try analyzing some text above!</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {sentimentResults.slice().reverse().map((result, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getSentimentColor(result.sentiment)}`}>
                        {result.sentiment}
                      </span>
                      <span className="text-xs text-gray-500">
                        {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 truncate">
                      "{result.text}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Use strong emotion words for clearer results</li>
              <li>• Mix positive and negative words to see how the AI balances them</li>
              <li>• Try neutral statements to see how they're classified</li>
              <li>• Experiment with different writing styles and tones</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">🎉 You're Now a Sentiment Analysis Expert!</h3>
          <p className="text-lg mb-6 opacity-90">
            You've learned how to read emotions from text, just like Emma and Max! 
            Keep practicing and exploring different types of messages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentPage('home')
                window.scrollTo(0, 0)
              }}
              className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              Start Over
            </button>
            <button
              onClick={() => {
                setCurrentPage('story')
                window.scrollTo(0, 0)
              }}
              className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              Review the Story
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveDemo
