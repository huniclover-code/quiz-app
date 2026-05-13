import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Question, Category } from '../data/questions'
import OptionButton from './OptionButton'
import FeedbackPanel from './FeedbackPanel'

interface Props {
  question: Question
  index: number
  total: number
  selectedAnswer: number | null
  onSelect: (i: number) => void
  onNext: () => void
}

const LANG_MAP: Record<Category, string> = {
  python: 'python',
  java: 'java',
  c: 'c',
  sql: 'sql',
}

const CATEGORY_BADGE: Record<Category, string> = {
  python: 'bg-blue-800 text-blue-200',
  java: 'bg-orange-800 text-orange-200',
  c: 'bg-gray-700 text-gray-200',
  sql: 'bg-emerald-800 text-emerald-200',
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: '하',
  medium: '중',
  hard: '상',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-emerald-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
}

export default function QuestionCard({ question, index, total, selectedAnswer, onSelect, onNext }: Props) {
  const revealed = selectedAnswer !== null

  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${CATEGORY_BADGE[question.category]}`}>
            {question.category.toUpperCase()}
          </span>
          <span className={`text-xs font-semibold ${DIFFICULTY_COLOR[question.difficulty]}`}>
            난이도: {DIFFICULTY_LABEL[question.difficulty]}
          </span>
        </div>
        <span className="text-gray-400 text-sm">{index + 1} / {total}</span>
      </div>

      {/* 문제 */}
      <p className="text-gray-100 text-base leading-relaxed whitespace-pre-line">{question.question}</p>

      {/* 코드 블록 */}
      {question.code && (
        <SyntaxHighlighter
          language={LANG_MAP[question.category]}
          style={vscDarkPlus}
          customStyle={{ borderRadius: '0.75rem', fontSize: '0.82rem', margin: 0 }}
        >
          {question.code}
        </SyntaxHighlighter>
      )}

      {/* 선택지 */}
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            index={i}
            selected={selectedAnswer}
            correctIndex={question.answer}
            revealed={revealed}
            onClick={onSelect}
          />
        ))}
      </div>

      {/* 피드백 */}
      {revealed && (
        <FeedbackPanel
          isCorrect={selectedAnswer === question.answer}
          explanation={question.explanation}
          onNext={onNext}
          isLast={index === total - 1}
        />
      )}
    </div>
  )
}
