import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'
import { CATEGORIES } from '../data/questions'
import type { Category } from '../data/questions'

export default function HomePage() {
  const { dispatch } = useQuizContext()
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [selected, setSelected] = useState<Category[]>([])

  function toggleCategory(id: Category) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    )
  }

  function handleStart() {
    if (!nickname.trim() || selected.length === 0) return
    dispatch({ type: 'START_QUIZ', categories: selected, nickname: nickname.trim() })
    navigate('/quiz')
  }

  const CAT_STYLE: Record<Category, string> = {
    python: 'border-blue-500 data-[active=true]:bg-blue-600 data-[active=true]:border-blue-400',
    java: 'border-orange-500 data-[active=true]:bg-orange-600 data-[active=true]:border-orange-400',
    c: 'border-gray-500 data-[active=true]:bg-gray-600 data-[active=true]:border-gray-400',
    sql: 'border-emerald-500 data-[active=true]:bg-emerald-600 data-[active=true]:border-emerald-400',
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-2">💻 프로그래밍 기능사</h1>
          <p className="text-gray-400">파이썬 · 자바 · C · SQL 퀴즈</p>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-semibold">닉네임</label>
          <input
            type="text"
            maxLength={12}
            placeholder="이름을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 text-sm font-semibold">
            과목 선택 <span className="text-gray-500 font-normal">(복수 선택 가능)</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selected.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  data-active={isActive}
                  onClick={() => toggleCategory(cat.id)}
                  className={`py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 text-white bg-gray-800 ${CAT_STYLE[cat.id]}`}
                >
                  {cat.label}
                  {isActive && <span className="ml-1 text-xs">✓</span>}
                </button>
              )
            })}
          </div>
          {selected.length > 0 && (
            <p className="text-gray-500 text-xs text-right">
              총 {selected.length * 10}문제
            </p>
          )}
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStart}
          disabled={!nickname.trim() || selected.length === 0}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-black text-lg transition-colors"
        >
          퀴즈 시작
        </button>
      </div>
    </div>
  )
}
