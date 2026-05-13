import { createContext, useContext } from 'react'
import type { QuizState, QuizAction, CategoryScore } from '../hooks/useQuiz'
import type { Question } from '../data/questions'

interface QuizContextValue {
  state: QuizState
  currentQuestion: Question | null
  totalQuestions: number
  progressPercent: number
  elapsedSeconds: number
  categoryScores: CategoryScore[]
  dispatch: React.Dispatch<QuizAction>
}

export const QuizContext = createContext<QuizContextValue | null>(null)

export function useQuizContext() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuizContext must be used inside QuizContext.Provider')
  return ctx
}
