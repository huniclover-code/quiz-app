import type { Category } from '../data/questions';

interface Props {
  value: Category;
  label: string;
  count: number;
  icon: string;
  colorClass: string;
  onClick: () => void;
}

export default function CategoryCard({ label, count, icon, colorClass, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 transition-all duration-200
        hover:scale-105 hover:shadow-lg active:scale-100 cursor-pointer ${colorClass}`}
    >
      <span className="text-4xl">{icon}</span>
      <span className="text-xl font-bold">{label}</span>
      <span className="text-sm opacity-70">{count}문제</span>
    </button>
  );
}
