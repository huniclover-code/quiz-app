import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { CATEGORIES } from '../data/questions';

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    category,
    questions,
    currentIndex,
    selectedAnswer,
    isFinished,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    if (!questions.length) navigate('/');
  }, [questions, navigate]);

  useEffect(() => {
    if (isFinished) navigate('/result');
  }, [isFinished, navigate]);

  if (!questions.length) return null;

  const q = questions[currentIndex];
  const catMeta = CATEGORIES.find((c) => c.value === category);
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { resetQuiz(); navigate('/'); }}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            ← 홈으로
          </button>
          {catMeta ? (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${catMeta.color}`}>
              {catMeta.label}
            </span>
          ) : (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
              전체
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-5">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        {/* Question number */}
        <p className="text-xs text-gray-400 font-medium mb-3">
          문제 {currentIndex + 1} / {questions.length}
        </p>

        {/* Card — key 변경으로 언마운트/리마운트 → FeedbackPanel 애니메이션 재실행 */}
        <QuestionCard
          key={q.id}
          question={q}
          selectedAnswer={selectedAnswer}
          isLast={isLast}
          onSelect={selectAnswer}
          onNext={nextQuestion}
        />
      </div>
    </div>
  );
}
