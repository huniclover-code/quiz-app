export interface ScoreRecord {
  id: string;
  nickname: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  duration: number;
  date: string;
}

const KEY = 'quiz_scores';

function readAll(): ScoreRecord[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as ScoreRecord[];
  } catch {
    return [];
  }
}

export function saveScore(record: ScoreRecord): void {
  const all = readAll();
  localStorage.setItem(KEY, JSON.stringify([record, ...all]));
}

export function getScores(category?: string): ScoreRecord[] {
  const all = readAll();
  if (!category || category === 'all') return all;
  return all.filter((r) => r.category === category);
}

export function getTopScores(category: string, limit = 20): ScoreRecord[] {
  return getScores(category === 'all' ? undefined : category)
    .sort((a, b) => b.percentage - a.percentage || a.duration - b.duration)
    .slice(0, limit);
}

export function clearScores(): void {
  localStorage.removeItem(KEY);
}
