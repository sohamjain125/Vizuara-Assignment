import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Trophy, Brain } from 'lucide-react'

interface ExercisePageProps {
  setCurrentPage: (page: string) => void
}

interface Exercise {
  id: number
  type: 'multiple-choice' | 'drag-drop' | 'fill-blank'
  question: string
  content: string
  options?: string[]
  correctAnswer: number | string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const ExercisePage: React.FC<ExercisePageProps> = ({ setCurrentPage }) => {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

  const exercises: Exercise[] = [
    {
      id: 1,
      type: 'multiple-choice',
      question: "What emotion does this message express?",
      content: "I love this movie! It's absolutely amazing and wonderful!",
      options: ["Positive", "Negative", "Neutral"],
      correctAnswer: 0,
      explanation: "Words like 'love', 'amazing', and 'wonderful' are all positive words that express happiness and excitement!",
      difficulty: 'easy'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: "How does this person feel about their day?",
      content: "Today was terrible. Everything went wrong and I'm so frustrated.",
      options: ["Happy", "Sad/Angry", "Indifferent"],
      correctAnswer: 1,
      explanation: "Words like 'terrible', 'wrong', and 'frustrated' show negative emotions. This person is clearly having a bad day.",
      difficulty: 'easy'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: "What's the emotion in this text?",
      content: "The weather is cloudy today. It might rain later.",
      options: ["Excited", "Sad", "Neutral"],
      correctAnswer: 2,
      explanation: "This text just gives information about the weather without expressing strong positive or negative feelings. It's neutral!",
      difficulty: 'easy'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: "Which word makes this sentence positive?",
      content: "The food was delicious and the service was excellent.",
      options: ["food", "delicious", "service", "excellent"],
      correctAnswer: 1,
      explanation: "Both 'delicious' and 'excellent' are positive words, but 'delicious' comes first and describes the food positively!",
      difficulty: 'medium'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: "What emotion is hidden in this message?",
      content: "I can't believe how rude and mean that person was to me.",
      options: ["Surprised", "Angry", "Happy", "Confused"],
      correctAnswer: 1,
      explanation: "Words like 'rude' and 'mean' show negative feelings, and the phrase 'I can't believe' suggests frustration or anger.",
      difficulty: 'medium'
    }
  ]

  const currentExerciseData = exercises[currentExercise]
  const isLastExercise = currentExercise === exercises.length - 1

  const handleAnswer = (answer: any) => {
    setUserAnswer(answer)
    setShowResult(true)
    
    if (answer === currentExerciseData.correctAnswer) {
      setScore(score + 1)
    }
    
    setCompletedExercises(prev => new Set(prev).add(currentExercise))
  }

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setUserAnswer(null)
      setShowResult(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-500'
      case 'medium': return 'from-yellow-400 to-orange-500'
      case 'hard': return 'from-red-400 to-red-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / exercises.length) * 100
    if (percentage >= 80) return "🎉 Amazing! You're a Sentiment Analysis expert!"
    if (percentage >= 60) return "👍 Great job! You're getting really good at this!"
    if (percentage >= 40) return "💪 Good effort! Keep practicing to improve!"
    return "📚 Keep learning! Review the story and try again!"
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🧠 Practice Exercises</h1>
        <p className="text-lg text-gray-600 mb-6">
          Test your skills with these fun exercises! Help Emma and Max become better at reading emotions.
        </p>
        
        {/* Progress and Score */}
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentExercise + 1}</div>
            <div className="text-sm text-gray-600">of {exercises.length}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((score / exercises.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">score</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Exercise Card */}
      <motion.div
        key={currentExercise}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        {/* Exercise Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Exercise {currentExercise + 1}</h2>
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(currentExerciseData.difficulty)} text-white font-semibold flex items-center space-x-2`}>
            <span>{getDifficultyIcon(currentExerciseData.difficulty)}</span>
            <span className="capitalize">{currentExerciseData.difficulty}</span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            {currentExerciseData.question}
          </h3>
          
          {/* Content Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-800 font-medium text-center">
              "{currentExerciseData.content}"
            </p>
          </div>
        </div>

        {/* Answer Options */}
        {!showResult && (
          <div className="space-y-3">
            {currentExerciseData.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Result */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg border-2 ${
              userAnswer === currentExerciseData.correctAnswer
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              {userAnswer === currentExerciseData.correctAnswer ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              <h4 className={`text-xl font-bold ${
                userAnswer === currentExerciseData.correctAnswer
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>
                {userAnswer === currentExerciseData.correctAnswer
                  ? '🎉 Correct!'
                  : '❌ Not quite right...'}
              </h4>
            </div>
            
            <p className={`text-lg ${
              userAnswer === currentExerciseData.correctAnswer
                ? 'text-green-700'
                : 'text-red-700'
            }`}>
              {currentExerciseData.explanation}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handlePrevious}
          disabled={currentExercise === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
            currentExercise === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {!isLastExercise ? (
          <button
            onClick={handleNext}
            disabled={!showResult}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              !showResult
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'interactive-button'
            }`}
          >
            <span>Next Exercise</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <Link
            to="/demo"
            onClick={() => setCurrentPage('demo')}
            className="interactive-button flex items-center space-x-2"
          >
            <span>Try the Interactive Demo!</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      {/* Exercise Navigation */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Jump to any exercise:</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {exercises.map((exercise, index) => (
            <button
              key={exercise.id}
              onClick={() => setCurrentExercise(index)}
              className={`w-12 h-12 rounded-full font-bold transition-all duration-200 flex items-center justify-center ${
                index === currentExercise
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : completedExercises.has(index)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {completedExercises.has(index) ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Final Score (when all exercises completed) */}
      {completedExercises.size === exercises.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-4">🎉 Exercise Complete!</h2>
          <p className="text-xl mb-4">{getScoreMessage()}</p>
          <p className="text-lg mb-6">
            Final Score: <span className="font-bold text-2xl">{score}</span> out of <span className="font-bold">{exercises.length}</span>
          </p>
          <Link
            to="/demo"
            onClick={() => setCurrentPage('demo')}
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Brain className="w-5 h-5" />
            <span>Try the Interactive Demo!</span>
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default ExercisePage
