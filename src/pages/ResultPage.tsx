import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import ScoreSummary from '../components/ScoreSummary';
import WrongAnswerList from '../components/WrongAnswerList';
import { saveScore } from '../utils/storage';

export default function ResultPage() {
  const navigate = useNavigate();
  const { category, questions, answers, startTime, startQuiz, resetQuiz } = useQuizStore();

  const [nickname, setNickname] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 결과 없이 직접 접근 방지
  useEffect(() => {
    if (!questions.length) navigate('/');
  }, [questions, navigate]);

  if (!questions.length) return null;

  const score = questions.filter((q) => answers[q.id] === q.answer).length;
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const duration = Math.round((Date.now() - startTime) / 1000);

  const handleSave = () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    const id = crypto.randomUUID();
    saveScore({
      id,
      nickname: trimmed,
      category,
      score,
      total,
      percentage,
      duration,
      date: new Date().toISOString(),
    });
    setSavedId(id);
    setSaved(true);
  };

  const handleRetry = () => {
    startQuiz(category);
    navigate('/quiz');
  };

  const handleHome = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">퀴즈 완료!</h1>
          <p className="text-gray-400 text-sm mt-1">결과를 확인하고 기록을 저장하세요</p>
        </div>

        {/* Score summary */}
        <ScoreSummary
          score={score}
          total={total}
          duration={duration}
          category={category}
          questions={questions}
          answers={answers}
        />

        {/* Nickname save */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          {!saved ? (
            <>
              <p className="text-sm font-semibold text-gray-600 mb-3">닉네임을 입력하고 기록을 저장하세요</p>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="닉네임 입력"
                  maxLength={12}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
                />
                <button
                  onClick={handleSave}
                  disabled={!nickname.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  기록 저장
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-green-600 font-semibold text-sm">✅ 기록이 저장되었습니다!</p>
              <button
                onClick={() => navigate('/leaderboard', { state: { recentId: savedId, category } })}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95"
              >
                리더보드 보기 →
              </button>
            </div>
          )}
        </div>

        {/* Wrong answer list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <WrongAnswerList questions={questions} answers={answers} />
        </div>

        {/* Bottom buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 py-3 rounded-xl border-2 border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all active:scale-95"
          >
            🔄 재도전
          </button>
          <button
            onClick={handleHome}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all active:scale-95"
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
