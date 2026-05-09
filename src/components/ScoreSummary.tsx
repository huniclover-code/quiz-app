import type { Question } from '../data/questions';
import { CATEGORIES } from '../data/questions';

interface Props {
  score: number;
  total: number;
  duration: number;
  category: string;
  questions: Question[];
  answers: Record<string, number>;
}

interface Grade {
  label: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
}

function getGrade(pct: number): Grade {
  if (pct >= 90) return { label: 'S', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-400', emoji: '🏆' };
  if (pct >= 70) return { label: 'A', color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-400',   emoji: '🎯' };
  if (pct >= 50) return { label: 'B', color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-400',  emoji: '👍' };
  return               { label: 'C', color: 'text-gray-500',   bg: 'bg-gray-50',   border: 'border-gray-300',   emoji: '📚' };
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ScoreSummary({ score, total, duration, category, questions, answers }: Props) {
  const pct = Math.round((score / total) * 100);
  const grade = getGrade(pct);

  // 카테고리별 성적 (전체 도전 시)
  const catStats = CATEGORIES.map((cat) => {
    const qs = questions.filter((q) => q.category === cat.value);
    if (!qs.length) return null;
    const correct = qs.filter((q) => answers[q.id] === q.answer).length;
    return { ...cat, correct, total: qs.length, pct: Math.round((correct / qs.length) * 100) };
  }).filter(Boolean) as { value: string; label: string; color: string; correct: number; total: number; pct: number }[];

  return (
    <div className={`rounded-2xl border-2 ${grade.border} ${grade.bg} p-6 text-center`}>
      {/* Grade badge */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-4xl">{grade.emoji}</span>
        <span className={`text-6xl font-black ${grade.color}`}>{grade.label}</span>
      </div>

      {/* Score */}
      <p className="text-5xl font-extrabold text-gray-800 mb-1">
        {score} <span className="text-2xl text-gray-400 font-normal">/ {total}</span>
      </p>
      <p className={`text-2xl font-bold mb-1 ${grade.color}`}>{pct}%</p>
      <p className="text-sm text-gray-400 mb-5">⏱ 소요시간 {fmt(duration)}</p>

      {/* Category bars — 전체 도전 시에만 표시 */}
      {category === 'all' && catStats.length > 0 && (
        <div className="text-left space-y-2 mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">카테고리별 성적</p>
          {catStats.map((c) => (
            <div key={c.value}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-600">{c.label}</span>
                <span className="text-gray-500">{c.correct}/{c.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
