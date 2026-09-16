import { useState } from 'react'
import {
  Plus,
} from 'lucide-react'

import MatchStatistics from '../components/matches/MatchStatistics'
import MatchCard from '../components/matches/MatchCard'
import AddMatchModal from '../components/matches/AddMatchModal'

import { matches } from '../data/matches'

import type {
  Game, 
} from '../types/match'

/* =========================================================
   MATCHES PAGE
========================================================= */

function Matches() {
  const [expandedMatch, setExpandedMatch] =
    useState<number | null>(null)

  const [selectedGame, setSelectedGame] =
    useState<Game | 'All'>('All')

  const [isAddMatchOpen, setIsAddMatchOpen] =
    useState(false)

  const toggleMatch = (id: number) => {
    setExpandedMatch((current) =>
      current === id ? null : id
    )
  }

  /* Filter matches based on selected game */

  const filteredMatches =
    selectedGame === 'All'
      ? matches
      : matches.filter(
          (match) => match.game === selectedGame
        )

  return (
    <div
      className="
        relative
        min-h-full
        w-full
        bg-linear-to-br
        from-purple-100
        via-white
        to-blue-100
        px-4 py-12
        pb-28
        sm:px-6
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Matches
          </h1>

          <p className="mt-2 text-gray-600">
            My TCG match and event records.
          </p>

          {/* Game Tabs */}

          <div className="mt-6 flex flex-wrap gap-2">
            {(
              [
                'All',
                'Gundam',
                'Riftbound',
                'Others',
              ] as const
            ).map((game) => (
              <button
                key={game}
                type="button"
                onClick={() => {
                  setSelectedGame(game)
                  setExpandedMatch(null)
                }}
                className={`
                  rounded-full
                  px-5 py-2
                  text-sm font-semibold
                  transition
                  ${
                    selectedGame === game
                      ? `
                        bg-purple-600
                        text-white
                        shadow-sm
                      `
                      : `
                        border border-gray-200
                        bg-white
                        text-gray-600
                        hover:border-purple-300
                        hover:text-purple-600
                      `
                  }
                `}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            CURRENT SEASON STATISTICS
        ================================================= */}

        <MatchStatistics
          matches={filteredMatches}
          selectedGame={selectedGame}
        />

        {/* =================================================
            MATCH LIST
        ================================================= */}

        <div className="space-y-4">

          {/* Empty State */}

          {filteredMatches.length === 0 && (
            <div
              className="
                rounded-2xl
                border border-gray-200
                bg-white/70
                px-6 py-16
                text-center
                shadow-sm
              "
            >
              <h2 className="text-xl font-bold text-gray-800">
                No matches yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                No {selectedGame} match records have been added yet.
              </p>
            </div>
          )}

          {/* Match Rows */}

          {filteredMatches.map((match) => (
            <MatchCard
              key={match.matchId}
              match={match}
              isExpanded={expandedMatch === match.id}
              onToggle={() => toggleMatch(match.id)}
            />
          ))}

        </div>
      </div>

      {/* =================================================
          FLOATING ADD MATCH BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() => setIsAddMatchOpen(true)}
        className="
          absolute
          bottom-6 right-6
          flex h-14 w-14
          items-center justify-center
          rounded-full
          bg-purple-600
          text-white
          shadow-lg
          transition-all
          duration-200
          hover:scale-105
          hover:bg-purple-700
          hover:shadow-xl
        "
        aria-label="Add match"
      >
        <Plus size={28} />
      </button>

      <AddMatchModal
        isOpen={isAddMatchOpen}
        onClose={() => setIsAddMatchOpen(false)}
      />

    </div>
    
  )
}

export default Matches