import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend,
} from 'recharts'
import { useQuizContext } from '../context/QuizContext'
import { useLeaderboard } from '../hooks/useLeaderboard'
import type { ScoreRecord } from '../hooks/useLeaderboard'
import { CATEGORIES } from '../data/questions'

// ── 유틸 ──────────────────────────────────────
function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function getGrade(pct: number) {
  if (pct >= 90) return { label: 'S', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400' }
  if (pct >= 70) return { label: 'A', color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400' }
  if (pct >= 50) return { label: 'B', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400' }
  return         { label: 'C', color: 'text-gray-400',   bg: 'bg-gray-400/10 border-gray-400' }
}

const CAT_BAR: Record<string, string> = {
  python: 'bg-blue-500', java: 'bg-orange-500', c: 'bg-gray-400', sql: 'bg-emerald-500',
}

// ── 컴포넌트 ──────────────────────────────────
export default function ResultPage() {
  const { state, totalQuestions, elapsedSeconds, dispatch } = useQuizContext()
  const { saveRecord, records } = useLeaderboard()
  const navigate = useNavigate()
  const saved = useRef(false)
  const [wrongOpen, setWrongOpen] = useState(false)

  const maxScore = totalQuestions * 2.5
  const pct = maxScore > 0 ? Math.round((state.score / maxScore) * 100) : 0
  const grade = getGrade(pct)
  const correctCount = state.answeredCount - state.wrongAnswers.length

  // 레이더 데이터
  const radarData = CATEGORIES.map((cat) => {
    const cs = state.categoryScores.find((s) => s.category === cat.id)
    const myPct = cs && cs.total > 0 ? Math.round((cs.correct / cs.total) * 100) : 0
    return { subject: cat.label, 내점수: myPct, 만점: 100 }
  })

  // 결과 진입 시 한 번만 저장
  useEffect(() => {
    if (saved.current || state.status !== 'finished' || !state.nickname) return
    saved.current = true
    const record: ScoreRecord = {
      id: `${Date.now()}-${Math.random()}`,
      nickname: state.nickname,
      score: pct,
      totalQuestions,
      elapsedSeconds,
      categoryScores: state.categoryScores,
      date: new Date().toLocaleDateString('ko-KR'),
    }
    saveRecord(record)
  }, [state.status]) // eslint-disable-line react-hooks/exhaustive-deps

  // 리더보드에서 내 순위
  const myRank = records.findIndex((r) => r.nickname === state.nickname) + 1

  function handleWrongRetry() {
    dispatch({ type: 'RESTART', wrongOnly: true })
    navigate('/quiz')
  }

  function handleHome() {
    dispatch({ type: 'GO_HOME' })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-12 animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-lg mx-auto px-4 pt-8 flex flex-col gap-8">

        {/* ── 헤더 ── */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">{state.nickname}님의 결과</p>
          <h1 className="text-2xl font-black text-white">퀴즈 완료!</h1>
          {myRank > 0 && <p className="text-gray-500 text-xs mt-1">현재 리더보드 {myRank}위</p>}
        </div>

        {/* ── 점수 카드 ── */}
        <div className={`rounded-2xl border-2 p-6 flex flex-col items-center gap-3 ${grade.bg}`}>
          <span className={`text-8xl font-black ${grade.color}`}>{grade.label}</span>
          <p className="text-white text-3xl font-bold">{pct}<span className="text-gray-400 text-lg font-normal">점 / 100점</span></p>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>정답 <strong className="text-white">{correctCount}</strong> / {totalQuestions}문제</span>
            <span>소요 <strong className="text-white">{formatTime(elapsedSeconds)}</strong></span>
          </div>
        </div>

        {/* ── 레이더 차트 ── */}
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-4">
          <h2 className="text-gray-300 font-semibold text-sm mb-3">카테고리별 분석</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Radar name="만점" dataKey="만점" stroke="#374151" fill="#374151" fillOpacity={0.3} />
              <Radar name="내 점수" dataKey="내점수" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.5} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#9CA3AF' }} />
            </RadarChart>
          </ResponsiveContainer>

          {/* 수평 progress bar */}
          <div className="mt-4 flex flex-col gap-3">
            {CATEGORIES.map((cat) => {
              const cs = state.categoryScores.find((s) => s.category === cat.id)
              if (!cs || cs.total === 0) return null
              const p = Math.round((cs.correct / cs.total) * 100)
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{cat.label}</span>
                    <span className="text-gray-400">{cs.correct}/{cs.total} ({p}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${CAT_BAR[cat.id]}`} style={{ width: `${p}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 오답 목록 ── */}
        {state.wrongAnswers.length > 0 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
            <button
              onClick={() => setWrongOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white transition-colors"
            >
              <span className="font-semibold text-sm">오답 목록 ({state.wrongAnswers.length}문제)</span>
              <span className="text-gray-500 text-lg">{wrongOpen ? '▲' : '▼'}</span>
            </button>
            {wrongOpen && (
              <ul className="divide-y divide-gray-800 px-4 pb-4 animate-[slideUp_0.2s_ease-out]">
                {state.wrongAnswers.map((w, i) => (
                  <li key={w.questionId} className="py-3">
                    <p className="text-gray-200 text-sm font-medium mb-1">Q{i + 1}. {w.question.split('\n')[0]}</p>
                    <p className="text-red-400 text-xs">내 답: {w.myAnswerText}</p>
                    <p className="text-emerald-400 text-xs">정답: {w.correctText}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ── 하단 버튼 ── */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/leaderboard')}
            className="w-full py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold text-sm transition-colors"
          >
            🏆 리더보드 보기
          </button>
          {state.wrongAnswers.length > 0 && (
            <button
              onClick={handleWrongRetry}
              className="w-full py-3.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-sm transition-colors"
            >
              틀린 문제만 다시 풀기 ({state.wrongAnswers.length}문제)
            </button>
          )}
          <button
            onClick={handleHome}
            className="w-full py-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-sm transition-colors"
          >
            처음으로
          </button>
        </div>

      </div>
    </div>
  )
}
