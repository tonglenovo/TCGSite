import type { Result } from '../../types/match'

interface ResultBadgeProps {
  result: Result
}

function ResultBadge({
  result,
}: ResultBadgeProps) {
  const isWin = result === 'win'

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3 py-1
        text-xs font-bold
        ${
          isWin
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }
      `}
    >
      {isWin ? 'WIN' : 'LOSS'}
    </span>
  )
}

export default ResultBadge