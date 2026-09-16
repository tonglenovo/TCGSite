import type { DeckColor } from '../../types/match'

const deckColorStyles: Record<DeckColor, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  white: 'bg-white border border-gray-400',
}

interface DeckDisplayProps {
  colors: DeckColor[]
  name: string
}

function DeckDisplay({
  colors,
  name,
}: DeckDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {colors.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className={`
              h-3.5 w-3.5
              rounded-full
              ${deckColorStyles[color]}
            `}
          />
        ))}
      </div>

      <span className="font-medium text-gray-700">
        {name}
      </span>
    </div>
  )
}

export default DeckDisplay