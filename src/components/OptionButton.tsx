interface Props {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean;
  revealed: boolean;
  onClick: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function OptionButton({ label, index, selected, correct, revealed, onClick }: Props) {
  let base =
    'w-full flex items-start gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 ';

  if (!revealed) {
    base += 'border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
  } else if (correct) {
    base += 'border-green-500 bg-green-50 text-green-800 cursor-default';
  } else if (selected) {
    base += 'border-red-400 bg-red-50 text-red-800 cursor-default';
  } else {
    base += 'border-gray-200 bg-white text-gray-400 cursor-default opacity-60';
  }

  return (
    <button className={base} onClick={onClick} disabled={revealed}>
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors
          ${!revealed ? 'border-gray-300 text-gray-500'
            : correct ? 'border-green-500 bg-green-500 text-white'
            : selected ? 'border-red-400 bg-red-400 text-white'
            : 'border-gray-300 text-gray-400'}`}
      >
        {revealed && correct ? '✓' : revealed && selected ? '✗' : LETTERS[index]}
      </span>
      <span className="pt-0.5 leading-snug">{label}</span>
    </button>
  );
}
