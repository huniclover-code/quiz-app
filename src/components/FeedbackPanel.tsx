import { useEffect, useRef } from 'react';

interface Props {
  isCorrect: boolean;
  explanation: string;
  isLast: boolean;
  onNext: () => void;
}

export default function FeedbackPanel({ isCorrect, explanation, isLast, onNext }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  return (
    <div
      className={`mt-4 rounded-xl border-2 p-4 animate-[slideUp_0.25s_ease-out]
        ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-2xl ${isCorrect ? '' : ''}`}>
          {isCorrect ? '🎉' : '😅'}
        </span>
        <span className={`font-bold text-base ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? '정답입니다!' : '오답입니다.'}
        </span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{explanation}</p>
      <button
        ref={btnRef}
        onClick={onNext}
        className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:scale-95 transition-all"
      >
        {isLast ? '결과 보기 →' : '다음 문제 →'}
      </button>
    </div>
  );
}
