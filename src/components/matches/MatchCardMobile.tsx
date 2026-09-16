import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

import AchievementBadge from './AchievementBadge'
import DeckDisplay from './DeckDisplay'
import EventBadge from './EventBadge'
import ResultBadge from './ResultBadge'

import type { MatchEvent } from '../../types/match'

interface MatchCardMobileProps {
  match: MatchEvent
  isExpanded: boolean
}

function formatMatchDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`)

  return parsedDate.toLocaleDateString('en-SG', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function MatchCardMobile({
  match,
  isExpanded,
}: MatchCardMobileProps) {
  return (
    <div className="md:hidden">
      {/* Location + Result */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {match.location}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {formatMatchDate(match.date)}
          </p>
        </div>

        <ResultBadge result={match.result} />
      </div>

      {/* Event Type */}

      <div className="mt-4">
        <EventBadge eventType={match.eventType} />
      </div>

      {/* Score + Deck */}

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-500">
            Score
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900">
            {match.score}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-gray-500">
            Deck
          </p>

          <div className="mt-1">
            <DeckDisplay
              colors={match.deckColors}
              name={match.deckName}
            />
          </div>
        </div>
      </div>

      {/* Achievement + Expand Arrow */}

      <div className="mt-5 flex items-center justify-between">
        <AchievementBadge
          achievement={match.achievement}
        />

        {isExpanded ? (
          <ChevronUp size={22} />
        ) : (
          <ChevronDown size={22} />
        )}
      </div>
    </div>
  )
}

export default MatchCardMobile