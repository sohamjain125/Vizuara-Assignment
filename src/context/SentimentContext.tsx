import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface SentimentResult {
  text: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  keywords: string[]
}

interface SentimentContextType {
  sentimentResults: SentimentResult[]
  addSentimentResult: (result: SentimentResult) => void
  clearResults: () => void
  analyzeSentiment: (text: string) => SentimentResult
}

const SentimentContext = createContext<SentimentContextType | undefined>(undefined)

export const useSentiment = () => {
  const context = useContext(SentimentContext)
  if (context === undefined) {
    throw new Error('useSentiment must be used within a SentimentProvider')
  }
  return context
}

interface SentimentProviderProps {
  children: ReactNode
}

export const SentimentProvider: React.FC<SentimentProviderProps> = ({ children }) => {
  const [sentimentResults, setSentimentResults] = useState<SentimentResult[]>([])

  const addSentimentResult = (result: SentimentResult) => {
    setSentimentResults(prev => [...prev, result])
  }

  const clearResults = () => {
    setSentimentResults([])
  }

  // Simple sentiment analysis algorithm for educational purposes
  const analyzeSentiment = (text: string): SentimentResult => {
    const lowerText = text.toLowerCase()
    
    // Positive words
    const positiveWords = [
      'happy', 'joy', 'excellent', 'amazing', 'wonderful', 'great', 'good', 'love', 'like',
      'fantastic', 'brilliant', 'awesome', 'perfect', 'beautiful', 'nice', 'sweet', 'kind',
      'helpful', 'friendly', 'fun', 'exciting', 'delicious', 'comfortable', 'peaceful'
    ]
    
    // Negative words
    const negativeWords = [
      'sad', 'angry', 'terrible', 'awful', 'horrible', 'bad', 'hate', 'dislike', 'hate',
      'terrible', 'worst', 'ugly', 'mean', 'rude', 'boring', 'scary', 'painful',
      'uncomfortable', 'worried', 'scared', 'lonely', 'tired', 'hungry'
    ]
    
    let positiveCount = 0
    let negativeCount = 0
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) {
        positiveCount += (lowerText.match(new RegExp(word, 'g')) || []).length
      }
    })
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) {
        negativeCount += (lowerText.match(new RegExp(word, 'g')) || []).length
      }
    })
    
    let sentiment: 'positive' | 'negative' | 'neutral'
    let confidence: number
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive'
      confidence = Math.min(0.9, 0.5 + (positiveCount - negativeCount) * 0.1)
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative'
      confidence = Math.min(0.9, 0.5 + (negativeCount - positiveCount) * 0.1)
    } else {
      sentiment = 'neutral'
      confidence = 0.5
    }
    
    // Extract keywords (words that appear in our sentiment dictionaries)
    const keywords = [...new Set([
      ...positiveWords.filter(word => lowerText.includes(word)),
      ...negativeWords.filter(word => lowerText.includes(word))
    ])]
    
    return {
      text,
      sentiment,
      confidence,
      keywords
    }
  }

  const value: SentimentContextType = {
    sentimentResults,
    addSentimentResult,
    clearResults,
    analyzeSentiment
  }

  return (
    <SentimentContext.Provider value={value}>
      {children}
    </SentimentContext.Provider>
  )
}
