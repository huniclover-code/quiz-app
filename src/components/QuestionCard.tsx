import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Question } from '../data/questions';
import OptionButton from './OptionButton';
import FeedbackPanel from './FeedbackPanel';

interface Props {
  question: Question;
  selectedAnswer: number | null;
  isLast: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
}

const LANG_MAP: Record<string, string> = {
  java: 'java',
  python: 'python',
  linux: 'bash',
  sql: 'sql',
};

export default function QuestionCard({ question, selectedAnswer, isLast, onSelect, onNext }: Props) {
  const revealed = selectedAnswer !== null;
  const lang = LANG_MAP[question.category] ?? 'text';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-gray-800 font-medium text-base leading-relaxed mb-4">
        {question.question}
      </p>

      {question.code && (
        <div className="mb-5 rounded-lg overflow-hidden text-sm">
          <SyntaxHighlighter
            language={lang}
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: '0.5rem', fontSize: '0.82rem' }}
          >
            {question.code}
          </SyntaxHighlighter>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={opt}
            index={i}
            selected={selectedAnswer === i}
            correct={revealed && i === question.answer}
            revealed={revealed}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {revealed && (
        <FeedbackPanel
          isCorrect={selectedAnswer === question.answer}
          explanation={question.explanation}
          isLast={isLast}
          onNext={onNext}
        />
      )}
    </div>
  );
}
