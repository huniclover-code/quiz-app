import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useQuiz } from './hooks/useQuiz'
import { QuizContext } from './context/QuizContext'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import LeaderboardPage from './pages/LeaderboardPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-[fadeIn_0.2s_ease-out]">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default function App() {
  const { state, currentQuestion, totalQuestions, progressPercent, elapsedSeconds, dispatch } = useQuiz()

  return (
    <QuizContext.Provider value={{
      state,
      currentQuestion,
      totalQuestions,
      progressPercent,
      elapsedSeconds,
      categoryScores: state.categoryScores,
      dispatch,
    }}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </QuizContext.Provider>
  )
}
