import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import CategoryCard from '../components/CategoryCard';
import { questions, type Category } from '../data/questions';

const CARD_META: {
  value: Category;
  label: string;
  icon: string;
  colorClass: string;
}[] = [
  { value: 'java',   label: 'Java',   icon: '☕', colorClass: 'border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-400' },
  { value: 'python', label: 'Python', icon: '🐍', colorClass: 'border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-400' },
  { value: 'linux',  label: 'Linux',  icon: '🐧', colorClass: 'border-green-200 bg-green-50 text-green-800 hover:border-green-400' },
  { value: 'sql',    label: 'SQL',    icon: '🗄️', colorClass: 'border-purple-200 bg-purple-50 text-purple-800 hover:border-purple-400' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const startQuiz = useQuizStore((s) => s.startQuiz);

  const handleStart = (category: string) => {
    startQuiz(category);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">📝</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
            프로그래밍 기능사 퀴즈
          </h1>
          <p className="text-gray-500 text-base">카테고리를 선택하고 실력을 테스트하세요</p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {CARD_META.map((cat) => (
            <CategoryCard
              key={cat.value}
              value={cat.value}
              label={cat.label}
              count={questions.filter((q) => q.category === cat.value).length}
              icon={cat.icon}
              colorClass={cat.colorClass}
              onClick={() => handleStart(cat.value)}
            />
          ))}
        </div>

        {/* All Challenge */}
        <button
          onClick={() => handleStart('all')}
          className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-lg font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          🚀 전체 도전 (40문제)
        </button>

        {/* Leaderboard Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/leaderboard')}
            className="text-sm text-indigo-500 hover:text-indigo-700 underline underline-offset-2 transition-colors"
          >
            지난 기록 보기 →
          </button>
        </div>
      </div>
    </div>
  );
}
