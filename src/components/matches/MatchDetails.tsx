import AchievementBadge from './AchievementBadge'
import DeckDisplay from './DeckDisplay'
import ResultBadge from './ResultBadge'

import type { MatchEvent } from '../../types/match'

interface MatchDetailsProps {
  match: MatchEvent
}

function MatchDetails({
  match,
}: MatchDetailsProps) {
  return (
    <div
      className="
        border-t
        border-gray-200/70
        bg-white/70
        px-5 py-5
      "
    >
      {/* =========================================
          MATCH ID
      ========================================= */}

      <div className="mb-5">
        <span className="text-xs font-semibold text-gray-400">
          Match ID: {match.matchId}
        </span>
      </div>

      {/* =========================================
          DESKTOP ROUND HEADER
      ========================================= */}

      <div
        className="
          mb-3
          hidden
          grid-cols-[100px_1.5fr_120px_100px_1.5fr]
          gap-6
          px-3
          text-xs
          font-bold
          uppercase
          tracking-wide
          text-gray-500
          md:grid
        "
      >
        <span>Round</span>
        <span>Opponent</span>
        <span>Result</span>
        <span>Score</span>
        <span>Opponent Deck</span>
      </div>

      {/* =========================================
          ROUNDS
      ========================================= */}

      <div className="divide-y divide-gray-200">
        {match.rounds.map((round, index) => (
          <div
            key={round.id}
            className="
              py-4
              md:grid
              md:grid-cols-[100px_1.5fr_120px_100px_1.5fr]
              md:items-center
              md:gap-6
              md:px-3
            "
          >
            {/* Desktop Round */}

            <span className="hidden font-semibold text-gray-700 md:block">
              Round {index + 1}
            </span>

            {/* Mobile Round Header */}

            <div className="mb-4 flex items-center justify-between md:hidden">
              <span className="font-bold text-gray-900">
                Round {index + 1}
              </span>

              <ResultBadge
                result={round.result}
              />
            </div>

            {/* Opponent */}

            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                  md:hidden
                "
              >
                Opponent
              </p>

              <span className="font-medium text-gray-900">
                {round.opponent}
              </span>
            </div>

            {/* Desktop Result */}

            <div className="hidden md:block">
              <ResultBadge
                result={round.result}
              />
            </div>

            {/* Score */}

            <div className="mt-3 md:mt-0">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                  md:hidden
                "
              >
                Score
              </p>

              <span className="font-bold text-gray-900">
                {round.score}
              </span>
            </div>

            {/* Opponent Deck */}

            <div className="mt-3 md:mt-0">
              <p
                className="
                  mb-1
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                  md:hidden
                "
              >
                Opponent Deck
              </p>

              <DeckDisplay
                colors={round.deckColors}
                name={round.deckName}
              />
            </div>
          </div>
        ))}
      </div>

      {/* =========================================
          DECK + REWARD
      ========================================= */}

      <div
        className={`
          mt-6
          grid grid-cols-1
          gap-6
          border-t border-gray-200
          pt-6
          ${
            match.achievement
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-1'
          }
        `}
      >
        {/* =====================================
            DECK USED
        ===================================== */}

        <div>
          <h3 className="font-bold text-gray-900">
            Deck Used
          </h3>

          <div className="mt-2">
            <DeckDisplay
              colors={match.deckColors}
              name={match.deckName}
            />
          </div>

          {/* Deck Image */}

          <div
            className="
              mt-4
              aspect-video
              overflow-hidden
              rounded-xl
              border border-gray-200
              bg-gray-100
            "
          >
            {match.deckImage ? (
              <img
                src={match.deckImage}
                alt={`${match.deckName} deck list`}
                draggable={false}
                onContextMenu={(event) =>
                  event.preventDefault()
                }
                className="
                  h-full
                  w-full
                  select-none
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex h-full
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  text-gray-400
                "
              >
                <span className="text-sm font-medium">
                  Deck list image
                </span>

                <span className="text-xs">
                  No image added
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =====================================
            REWARD
            Only show when achievement exists
        ===================================== */}

        {match.achievement && (
          <div>
            <h3 className="font-bold text-gray-900">
              Reward
            </h3>

            <div className="mt-2 min-h-6">
              <AchievementBadge
                achievement={match.achievement}
              />
            </div>

            {/* Reward Image */}

            <div
              className="
                mt-4
                aspect-video
                overflow-hidden
                rounded-xl
                border border-gray-200
                bg-gray-100
              "
            >
              {match.rewardImage ? (
                <img
                  src={match.rewardImage}
                  alt={`${match.location} reward`}
                  draggable={false}
                  onContextMenu={(event) =>
                    event.preventDefault()
                  }
                  className="
                    h-full
                    w-full
                    select-none
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex h-full
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    text-gray-400
                  "
                >
                  <span className="text-sm font-medium">
                    Reward image
                  </span>

                  <span className="text-xs">
                    No image added
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchDetails