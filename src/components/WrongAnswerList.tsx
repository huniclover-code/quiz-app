import { useState } from 'react';
import type { Question } from '../data/questions';

interface Props {
  questions: Question[];
  answers: Record<string, number>;
}

function WrongItem({ q, chosen }: { q: Question; chosen: number }) {
  const [open, setOpen] = useState(true);
  const LETTERS = ['A', 'B', 'C', 'D'];

  return (
    <div className="border border-red-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors text-left"
      >
        <span className="text-sm font-medium text-gray-700 leading-snug">{q.question}</span>
        <span className="flex-shrink-0 text-gray-400 mt-0.5">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 py-3 bg-white space-y-2 text-sm">
          {/* 내 답 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-400 text-white flex items-center justify-center text-xs font-bold">✗</span>
            <span className="text-red-700">
              <span className="font-semibold">내 답 ({LETTERS[chosen]})</span>{' '}
              {q.options[chosen]}
            </span>
          </div>
          {/* 정답 */}
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-green-700">
              <span className="font-semibold">정답 ({LETTERS[q.answer]})</span>{' '}
              {q.options[q.answer]}
            </span>
          </div>
          {/* 해설 */}
          <div className="mt-2 pt-2 border-t border-gray-100 text-gray-600 leading-relaxed">
            💡 {q.explanation}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WrongAnswerList({ questions, answers }: Props) {
  const wrong = questions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] !== q.answer
  );

  if (!wrong.length) {
    return (
      <div className="text-center py-8 text-green-600 font-semibold">
        🎉 오답이 없습니다! 완벽합니다!
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
        오답 목록 ({wrong.length}문제)
      </h3>
      <div className="space-y-2">
        {wrong.map((q) => (
          <WrongItem key={q.id} q={q} chosen={answers[q.id]} />
        ))}
      </div>
    </div>
  );
}
