import { useEffect, useRef } from 'react'

interface Props {
  isCorrect: boolean
  explanation: string
  onNext: () => void
  isLast: boolean
}

export default function FeedbackPanel({ isCorrect, explanation, onNext, isLast }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    btnRef.current?.focus()
  }, [])

  return (
    <div className="mt-4 rounded-xl border-2 border-gray-700 bg-gray-900 p-4 animate-[slideUp_0.25s_ease-out]">
      <p className={`font-bold text-base mb-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
        {isCorrect ? '✓ 정답입니다!' : '✗ 오답입니다'}
      </p>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{explanation}</p>
      <button
        ref={btnRef}
        onClick={onNext}
        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
      >
        {isLast ? '결과 보기' : '다음 문제 →'}
      </button>
    </div>
  )
}
