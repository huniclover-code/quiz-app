import type { CategoryScore } from '../hooks/useQuiz'
import { CATEGORIES } from '../data/questions'

interface Props {
  score: number
  total: number
  categoryScores: CategoryScore[]
}

function getGrade(pct: number) {
  if (pct >= 90) return { label: 'S', color: 'text-yellow-400' }
  if (pct >= 70) return { label: 'A', color: 'text-emerald-400' }
  if (pct >= 50) return { label: 'B', color: 'text-blue-400' }
  return { label: 'C', color: 'text-gray-400' }
}

const CAT_COLOR: Record<string, string> = {
  python: 'bg-blue-500',
  java: 'bg-orange-500',
  c: 'bg-gray-500',
  sql: 'bg-emerald-500',
}

export default function ScoreSummary({ score, total, categoryScores }: Props) {
  const maxScore = total * 2.5
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  const grade = getGrade(pct)
  const showCategories = categoryScores.length > 1

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 점수 원형 */}
      <div className="flex flex-col items-center gap-1">
        <span className={`text-7xl font-black ${grade.color}`}>{grade.label}</span>
        <span className="text-3xl font-bold text-white">{score.toFixed(1)} <span className="text-gray-400 text-xl">/ {maxScore.toFixed(1)}점</span></span>
        <span className="text-gray-400 text-sm">정답률 {pct}%</span>
      </div>

      {/* 카테고리별 */}
      {showCategories && (
        <div className="w-full flex flex-col gap-3">
          {categoryScores.map((cs) => {
            const catPct = cs.total > 0 ? Math.round((cs.correct / cs.total) * 100) : 0
            const label = CATEGORIES.find((c) => c.id === cs.category)?.label ?? cs.category
            return (
              <div key={cs.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{label}</span>
                  <span className="text-gray-400">{cs.correct}/{cs.total} ({catPct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${CAT_COLOR[cs.category] ?? 'bg-blue-500'}`}
                    style={{ width: `${catPct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
