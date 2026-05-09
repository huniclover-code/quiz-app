import type { ScoreRecord } from '../utils/storage';

interface Props {
  records: ScoreRecord[];
  recentId?: string;
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

const MEDAL = ['🥇', '🥈', '🥉'];

export default function RankTable({ records, recentId }: Props) {
  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-5xl mb-3">📋</span>
        <p className="font-medium">아직 기록이 없습니다</p>
        <p className="text-sm mt-1">퀴즈를 완료하고 기록을 저장해보세요!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <th className="px-3 py-3 text-center w-12">순위</th>
            <th className="px-3 py-3 text-left">닉네임</th>
            <th className="px-3 py-3 text-center">점수</th>
            <th className="px-3 py-3 text-center">정답률</th>
            <th className="px-3 py-3 text-center hidden sm:table-cell">시간</th>
            <th className="px-3 py-3 text-center hidden sm:table-cell">날짜</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => {
            const isMe = r.id === recentId;
            return (
              <tr
                key={r.id}
                className={`border-t border-gray-100 transition-colors
                  ${isMe ? 'bg-indigo-50 font-semibold' : 'bg-white hover:bg-gray-50'}`}
              >
                <td className="px-3 py-3 text-center text-base">
                  {i < 3 ? MEDAL[i] : <span className="text-gray-400 font-bold">{i + 1}</span>}
                </td>
                <td className="px-3 py-3 text-gray-800">
                  {r.nickname}
                  {isMe && <span className="ml-1.5 text-xs text-indigo-500">(나)</span>}
                </td>
                <td className="px-3 py-3 text-center text-gray-700">{r.score}/{r.total}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`font-bold ${r.percentage >= 90 ? 'text-yellow-600' : r.percentage >= 70 ? 'text-blue-600' : r.percentage >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                    {r.percentage}%
                  </span>
                </td>
                <td className="px-3 py-3 text-center text-gray-500 hidden sm:table-cell">{fmt(r.duration)}</td>
                <td className="px-3 py-3 text-center text-gray-400 hidden sm:table-cell">{fmtDate(r.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
