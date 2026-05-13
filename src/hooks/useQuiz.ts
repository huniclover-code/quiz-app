import { useReducer } from 'react'
import type { Category, Question } from '../data/questions'
import { getQuestionsByCategory } from '../data/questions'

// ── 타입 ──────────────────────────────────────
export interface CategoryScore {
  category: Category
  correct: number
  total: number
}

export interface WrongAnswer {
  questionId: string
  question: string
  myAnswerIndex: number
  correctIndex: number
  myAnswerText: string
  correctText: string
}

export interface QuizState {
  status: 'idle' | 'playing' | 'finished'
  nickname: string
  questions: Question[]
  currentIndex: number
  selectedAnswer: number | null
  isCorrect: boolean | null
  score: number
  categoryScores: CategoryScore[]
  answeredCount: number
  wrongAnswers: WrongAnswer[]
  startedAt: number | null
  finishedAt: number | null
}

// ── 액션 ──────────────────────────────────────
export type QuizAction =
  | { type: 'START_QUIZ'; categories: Category[]; nickname: string }
  | { type: 'SELECT_ANSWER'; index: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESTART'; wrongOnly?: boolean }
  | { type: 'GO_HOME' }

// ── 초기 상태 ─────────────────────────────────
const initialState: QuizState = {
  status: 'idle',
  nickname: '',
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  isCorrect: null,
  score: 0,
  categoryScores: [],
  answeredCount: 0,
  wrongAnswers: [],
  startedAt: null,
  finishedAt: null,
}

// ── 유틸 ──────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCategoryScores(categories: Category[]): CategoryScore[] {
  return categories.map((category) => ({ category, correct: 0, total: 0 }))
}

// ── 리듀서 ────────────────────────────────────
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ': {
      const pool = getQuestionsByCategory(action.categories)
      const shuffled = shuffle(pool)
      return {
        ...initialState,
        status: 'playing',
        nickname: action.nickname,
        questions: shuffled,
        categoryScores: buildCategoryScores(action.categories),
        startedAt: Date.now(),
      }
    }

    case 'SELECT_ANSWER': {
      if (state.selectedAnswer !== null) return state
      const q = state.questions[state.currentIndex]
      const correct = action.index === q.answer

      const updatedCategoryScores = state.categoryScores.map((cs) =>
        cs.category === q.category
          ? { ...cs, correct: cs.correct + (correct ? 1 : 0), total: cs.total + 1 }
          : cs,
      )

      const updatedWrongAnswers = correct
        ? state.wrongAnswers
        : [
            ...state.wrongAnswers,
            {
              questionId: q.id,
              question: q.question,
              myAnswerIndex: action.index,
              correctIndex: q.answer,
              myAnswerText: q.options[action.index],
              correctText: q.options[q.answer],
            },
          ]

      return {
        ...state,
        selectedAnswer: action.index,
        isCorrect: correct,
        score: correct ? state.score + 2.5 : state.score,
        answeredCount: state.answeredCount + 1,
        categoryScores: updatedCategoryScores,
        wrongAnswers: updatedWrongAnswers,
      }
    }

    case 'NEXT_QUESTION': {
      const isLast = state.currentIndex >= state.questions.length - 1
      if (isLast) {
        return {
          ...state,
          status: 'finished',
          selectedAnswer: null,
          isCorrect: null,
          finishedAt: Date.now(),
        }
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selectedAnswer: null,
        isCorrect: null,
      }
    }

    case 'FINISH_QUIZ':
      return { ...state, status: 'finished', finishedAt: Date.now() }

    case 'RESTART': {
      const pool = action.wrongOnly
        ? state.questions.filter((q) => state.wrongAnswers.some((w) => w.questionId === q.id))
        : state.questions
      const categories = Array.from(new Set(pool.map((q) => q.category)))
      return {
        ...initialState,
        status: 'playing',
        nickname: state.nickname,
        questions: shuffle(pool),
        categoryScores: buildCategoryScores(categories),
        startedAt: Date.now(),
      }
    }

    case 'GO_HOME':
      return { ...initialState }

    default:
      return state
  }
}

// ── 훅 ────────────────────────────────────────
export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const currentQuestion = state.questions[state.currentIndex] ?? null
  const totalQuestions = state.questions.length
  const progressPercent =
    totalQuestions > 0 ? Math.round((state.answeredCount / totalQuestions) * 100) : 0

  const elapsedSeconds =
    state.startedAt && state.finishedAt
      ? Math.floor((state.finishedAt - state.startedAt) / 1000)
      : state.startedAt
        ? Math.floor((Date.now() - state.startedAt) / 1000)
        : 0

  return {
    state,
    currentQuestion,
    totalQuestions,
    progressPercent,
    elapsedSeconds,
    dispatch,
  }
}
