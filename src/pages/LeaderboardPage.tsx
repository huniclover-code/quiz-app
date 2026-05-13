import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { CATEGORIES } from '../data/questions'

const MEDAL = ['🥇', '🥈', '🥉']

function ConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-600 p-6 w-full max-w-xs flex flex-col gap-4">
        <h3 className="text-white font-bold text-center">기록을 모두 초기화할까요?</h3>
        <p className="text-gray-400 text-sm text-center">이 작업은 되돌릴 수 없습니다.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold text-sm transition-colors">취소</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors">초기화</button>
        </div>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const { state, dispatch } = useQuizContext()
  const { getRecords, clearRecords } = useLeaderboard()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const sorted = getRecords()
  const myNickname = state.nickname

  function handleClear() {
    clearRecords()
    setShowModal(false)
  }

  function handleRetry() {
    dispatch({ type: 'GO_HOME' })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-12 animate-[fadeIn_0.3s_ease-out]">
      {showModal && <ConfirmModal onConfirm={handleClear} onCancel={() => setShowModal(false)} />}

      <div className="max-w-lg mx-auto px-4 pt-8 flex flex-col gap-6">

        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">🏆 명예의 전당</h1>
          <p className="text-gray-500 text-sm mt-1">상위 {sorted.length}명의 기록</p>
        </div>

        {/* 리스트 */}
        {sorted.length === 0 ? (
          <div className="text-center text-gray-500 py-16">아직 기록이 없습니다.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {sorted.map((r, i) => {
              const isMe = r.nickname === myNickname
              const isMedal = i < 3
              return (
                <div
                  key={r.id}
                  className={`rounded-xl border px-4 py-3 flex items-center gap-3 transition-all ${
                    isMe
                      ? 'border-blue-500 bg-blue-950/40'
                      : isMedal
                        ? 'border-gray-600 bg-gray-800/60'
                        : 'border-gray-700 bg-gray-900'
                  }`}
                >
                  {/* 순위 */}
                  <span className="w-8 text-center text-lg shrink-0">
                    {isMedal ? MEDAL[i] : <span className="text-gray-500 text-sm font-bold">{i + 1}</span>}
                  </span>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm truncate ${isMe ? 'text-blue-300' : 'text-white'}`}>
                        {r.nickname}
                      </span>
                      {isMe && <span className="text-blue-400 text-xs shrink-0">← 내 기록</span>}
                    </div>
                    {/* 카테고리별 점수 */}
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {CATEGORIES.map((cat) => {
                        const cs = r.categoryScores.find((s) => s.category === cat.id)
                        if (!cs || cs.total === 0) return null
                        const p = Math.round((cs.correct / cs.total) * 100)
                        return (
                          <span key={cat.id} className="text-gray-500 text-xs">
                            {cat.label} <span className="text-gray-300">{p}%</span>
                          </span>
                        )
                      })}
                    </div>
                    <p className="text-gray-600 text-xs mt-0.5">{r.date}</p>
                  </div>

                  {/* 점수 */}
                  <div className="text-right shrink-0">
                    <p className={`text-lg font-black ${isMedal ? 'text-yellow-400' : 'text-white'}`}>{r.score}</p>
                    <p className="text-gray-500 text-xs">점</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleRetry}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors"
          >
            다시 도전하기
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 rounded-xl bg-transparent border border-gray-700 hover:border-red-600 text-gray-500 hover:text-red-400 font-semibold text-sm transition-colors"
          >
            기록 초기화
          </button>
        </div>

      </div>
    </div>
  )
}
