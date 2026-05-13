interface Props {
  label: string
  index: number
  selected: number | null
  correctIndex: number
  revealed: boolean
  onClick: (i: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function OptionButton({ label, index, selected, correctIndex, revealed, onClick }: Props) {
  const isSelected = selected === index
  const isCorrect = index === correctIndex

  let bg = 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200'
  if (revealed) {
    if (isCorrect) bg = 'bg-emerald-700 border-emerald-400 text-white'
    else if (isSelected && !isCorrect) bg = 'bg-red-700 border-red-400 text-white'
    else bg = 'bg-gray-800 border-gray-700 text-gray-500'
  } else if (isSelected) {
    bg = 'bg-blue-700 border-blue-400 text-white'
  }

  return (
    <button
      disabled={revealed}
      onClick={() => onClick(index)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer disabled:cursor-default ${bg}`}
    >
      <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-current text-sm font-bold">
        {LETTERS[index]}
      </span>
      <span className="text-sm leading-snug">{label}</span>
    </button>
  )
}
