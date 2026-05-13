import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'
import QuestionCard from '../components/QuestionCard'

export default function QuizPage() {
  const { state, currentQuestion, totalQuestions, progressPercent, dispatch } = useQuizContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (state.status === 'finished') navigate('/result')
  }, [state.status, navigate])

  if (!currentQuestion) return null

  function handleSelect(i: number) {
    dispatch({ type: 'SELECT_ANSWER', index: i })
  }

  function handleNext() {
    dispatch({ type: 'NEXT_QUESTION' })
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col animate-[fadeIn_0.3s_ease-out]">
      {/* 상단 진행바 */}
      <div className="w-full h-1.5 bg-gray-800">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <button
          onClick={() => { if (confirm('홈으로 돌아가시겠습니까? 진행 내용이 사라집니다.')) dispatch({ type: 'GO_HOME' }) }}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          ← 홈
        </button>
        <span className="text-gray-300 text-sm font-semibold">{state.nickname}</span>
        <span className="text-blue-400 text-sm font-bold">{state.score.toFixed(1)}점</span>
      </div>

      {/* 문제 카드 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          <QuestionCard
            key={state.currentIndex}
            question={currentQuestion}
            index={state.currentIndex}
            total={totalQuestions}
            selectedAnswer={state.selectedAnswer}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  )
}
