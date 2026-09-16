import {
  Gift,
  Trophy,
} from 'lucide-react'

import type { Achievement } from '../../types/match'

interface AchievementBadgeProps {
  achievement: Achievement
}

function AchievementBadge({
  achievement,
}: AchievementBadgeProps) {
  if (!achievement) {
    return null
  }

  if (achievement === 'winner') {
    return (
      <span
        className="
          inline-flex items-center gap-1.5
          rounded-full
          bg-yellow-100
          px-3 py-1
          text-xs font-semibold
          text-yellow-700
        "
      >
        <Trophy size={14} />
        Winner
      </span>
    )
  }

  if (achievement === 'lucky-draw') {
    return (
      <span
        className="
          inline-flex items-center gap-1.5
          rounded-full
          bg-purple-100
          px-3 py-1
          text-xs font-semibold
          text-purple-700
        "
      >
        <Gift size={14} />
        Lucky Draw
      </span>
    )
  }

  return null
}

export default AchievementBadge