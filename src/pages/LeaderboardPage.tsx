import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RankTable from '../components/RankTable';
import { getTopScores } from '../utils/storage';

const TABS: { value: string; label: string; emoji: string }[] = [
  { value: 'all',    label: '전체',   emoji: '🌐' },
  { value: 'java',   label: 'Java',   emoji: '☕' },
  { value: 'python', label: 'Python', emoji: '🐍' },
  { value: 'linux',  label: 'Linux',  emoji: '🐧' },
  { value: 'sql',    label: 'SQL',    emoji: '🗄️' },
];

interface LocationState {
  recentId?: string;
  category?: string;
}

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const [activeTab, setActiveTab] = useState<string>(state.category ?? 'all');
  const records = getTopScores(activeTab, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">🏆 리더보드</h1>
            <p className="text-gray-400 text-sm mt-0.5">상위 20위 기록</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
          >
            ← 홈으로
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 bg-white border border-gray-200 rounded-2xl p-1.5 mb-5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 min-w-max flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                ${activeTab === tab.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <RankTable records={records} recentId={state.recentId} />

        {/* Bottom */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all active:scale-95"
          >
            퀴즈 도전하기
          </button>
        </div>
      </div>
    </div>
  );
}
