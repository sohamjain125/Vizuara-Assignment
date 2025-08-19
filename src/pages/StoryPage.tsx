import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Heart, Brain, MessageCircle, Sparkles, BookOpen } from 'lucide-react'

interface StoryPageProps {
  setCurrentPage: (page: string) => void
}

interface StoryStep {
  id: number
  title: string
  content: string
  character: 'emma' | 'max' | 'narrator'
  emotion?: 'positive' | 'negative' | 'neutral'
  exercise?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
}

const StoryPage: React.FC<StoryPageProps> = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showExercise, setShowExercise] = useState(false)
  const [exerciseAnswer, setExerciseAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const storySteps: StoryStep[] = [
    {
      id: 1,
      title: "The Mysterious Messages",
      content: "Emma and Max were best friends who loved solving puzzles. One day, they found a mysterious box with strange messages inside. 'I love this amazing day!' said one. 'This is terrible and awful!' said another. 'The weather is cloudy today.' said a third.",
      character: 'narrator',
      emotion: 'neutral'
    },
    {
      id: 2,
      title: "Emma's Discovery",
      content: "Emma noticed something interesting! 'Look Max, these messages have different feelings! The first one makes me happy, the second one makes me sad, and the third one... well, it's just okay.'",
      character: 'emma',
      emotion: 'positive'
    },
    {
      id: 3,
      title: "Max's Question",
      content: "Max scratched his head. 'But how do we know what feeling each message has? And why is this important?' Emma smiled. 'That's exactly what we're going to learn today!'",
      character: 'max',
      emotion: 'neutral'
    },
    {
      id: 4,
      title: "The Magic of Words",
      content: "Emma explained: 'Some words are like happy sunshine - they make us feel good! Words like 'love', 'amazing', 'wonderful' are positive. Other words are like storm clouds - they make us feel bad. Words like 'terrible', 'awful', 'hate' are negative.'",
      character: 'emma',
      emotion: 'positive'
    },
    {
      id: 5,
      title: "Neutral Words",
      content: "Max nodded. 'And some words don't really make us feel anything special, like 'cloudy' or 'today'?' 'Exactly!' said Emma. 'Those are neutral words. They just give us information without strong feelings.'",
      character: 'max',
      emotion: 'positive'
    },
    {
      id: 6,
      title: "Time to Practice!",
      content: "Now let's practice what we've learned! Can you help Emma and Max identify the emotions in these messages?",
      character: 'narrator',
      emotion: 'neutral',
      exercise: {
        question: "What emotion does this message have: 'I love ice cream, it's delicious!'?",
        options: ["Positive (Happy)", "Negative (Sad)", "Neutral (Okay)"],
        correctAnswer: 0,
        explanation: "Great job! Words like 'love' and 'delicious' are positive words that make us feel happy and excited!"
      }
    }
  ]

  const currentStoryStep = storySteps[currentStep]
  const isLastStep = currentStep === storySteps.length - 1

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowExercise(false)
      setExerciseAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowExercise(false)
      setExerciseAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleExerciseAnswer = (answerIndex: number) => {
    setExerciseAnswer(answerIndex)
    setShowExplanation(true)
  }

  const getCharacterAvatar = (character: string) => {
    switch (character) {
      case 'emma':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white font-bold text-xl">E</span>
          </div>
        )
      case 'max':
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white font-bold text-xl">M</span>
          </div>
        )
      default:
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        )
    }
  }

  const getCharacterName = (character: string) => {
    switch (character) {
      case 'emma': return 'Emma'
      case 'max': return 'Max'
      default: return 'Narrator'
    }
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      {/* Story Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📖 Emma & Max's Adventure</h2>
          <span className="text-sm text-gray-600">Step {currentStep + 1} of {storySteps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / storySteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Story Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="story-card mb-8"
      >
        <div className="flex items-start space-x-4">
          {getCharacterAvatar(currentStoryStep.character)}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {currentStoryStep.title}
              </h3>
              {currentStoryStep.emotion && (
                <span className={`emotion-badge ${
                  currentStoryStep.emotion === 'positive' ? 'positive-emotion' :
                  currentStoryStep.emotion === 'negative' ? 'negative-emotion' : 'neutral-emotion'
                }`}>
                  {currentStoryStep.emotion}
                </span>
              )}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              {currentStoryStep.content}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              — {getCharacterName(currentStoryStep.character)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Exercise Section */}
      {currentStoryStep.exercise && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="exercise-card mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">🧠 Time to Practice!</h3>
            <p className="text-gray-600">Help Emma and Max by answering this question:</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {currentStoryStep.exercise.question}
            </h4>

            <div className="space-y-3 mb-6">
              {currentStoryStep.exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleExerciseAnswer(index)}
                  disabled={exerciseAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    exerciseAnswer === null
                      ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      : exerciseAnswer === index
                      ? index === currentStoryStep.exercise!.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === currentStoryStep.exercise!.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  exerciseAnswer === currentStoryStep.exercise!.correctAnswer
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-red-100 border border-red-300'
                }`}
              >
                <h5 className={`font-bold mb-2 ${
                  exerciseAnswer === currentStoryStep.exercise!.correctAnswer
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {exerciseAnswer === currentStoryStep.exercise!.correctAnswer
                    ? '🎉 Correct!'
                    : '❌ Not quite right...'}
                </h5>
                <p className={`text-sm ${
                  exerciseAnswer === currentStoryStep.exercise!.correctAnswer
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}>
                  {currentStoryStep.exercise!.explanation}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
            currentStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex space-x-4">
          {isLastStep ? (
            <Link
              to="/exercises"
              onClick={() => setCurrentPage('exercises')}
              className="interactive-button flex items-center space-x-2"
            >
              <span>Continue to Exercises</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <button
              onClick={handleNext}
              className="interactive-button flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-12 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {storySteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryPage
