import { useEffect, useRef, useState } from 'react'

import {
  Plus,
} from 'lucide-react'

import MatchStatistics from '../components/matches/MatchStatistics'
import MatchCard from '../components/matches/MatchCard'
import AddMatchModal from '../components/matches/AddMatchModal'

// import { matches } from '../data/matches'

import type {
  Game,
  MatchEvent,
} from '../types/match'

import { API_URL } from '../config/api'

/* =========================================================
   MATCHES PAGE
========================================================= */

function Matches() {

  /* =======================================================
     STATE
  ======================================================= */

  const [matches, setMatches] =
    useState<MatchEvent[]>([])
  const [isLoading, setIsLoading] =
    useState(true)
  const [error, setError] =
    useState<string | null>(null)

  const [expandedMatch, setExpandedMatch] =
    useState<number | null>(null)

  const [selectedGame, setSelectedGame] =
    useState<Game | 'All'>('All')

  const [isAddMatchOpen, setIsAddMatchOpen] =
    useState(false)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/api/matches`)

        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }

        const data: MatchEvent[] = await response.json()

        setMatches(data)
      } catch (error) {
        console.error('Error fetching matches:', error)

        setError('Unable to load matches.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  /* =======================================================
     MATCH REFERENCES

     Stores the HTML element for every match card.

     Example:
     matchRefs.current[1]
     matchRefs.current[2]
     matchRefs.current[3]

     This allows us to automatically scroll to a match
     after it has been opened.
  ======================================================= */

  const matchRefs =
    useRef<Record<number, HTMLDivElement | null>>({})

  /* =======================================================
     TOGGLE MATCH
  ======================================================= */

  const toggleMatch = (id: number) => {

    setExpandedMatch((current) => {

      /*
        Clicking the currently opened match:
        close it.
      */

      if (current === id) {
        return null
      }

      /*
        Clicking another match:
        close the old match and open this one.
      */

      return id
    })
  }

  /* =======================================================
     AUTO SCROLL TO OPENED MATCH
  ======================================================= */

  useEffect(() => {

    /*
      Nothing is expanded,
      so there is nowhere to scroll.
    */

    if (expandedMatch === null) {
      return
    }

    /*
      Give React a short moment to:

      1. Close the previous card
      2. Open the new card
      3. Recalculate the page layout

      Then scroll to the newly opened card.
    */

    const timeout = setTimeout(() => {

      const matchElement =
        matchRefs.current[expandedMatch]

      if (!matchElement) {
        return
      }

      matchElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

    }, 150)

    return () => {
      clearTimeout(timeout)
    }

  }, [expandedMatch])

  /* =======================================================
     FILTER MATCHES
  ======================================================= */

  const filteredMatches =
    selectedGame === 'All'
      ? matches
      : matches.filter(
        (match) => match.game === selectedGame
      )

  /* =======================================================
     RENDER
  ======================================================= */

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
        px-4
        py-12
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

          {/* ===============================================
              GAME TABS
          =============================================== */}

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
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  transition

                  ${selectedGame === game
                    ? `
                        bg-purple-600
                        text-white
                        shadow-sm
                      `
                    : `
                        border
                        border-gray-200
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

          {/* Loading State */}

          {isLoading && (
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
              <p className="font-semibold text-gray-700">
                Loading matches...
              </p>
            </div>
          )}

          {/* Error State */}

          {error && !isLoading && (
            <div
              className="
                rounded-2xl
                border border-red-200
                bg-red-50
                px-6 py-16
                text-center
                shadow-sm
              "
            >
              <h2 className="text-xl font-bold text-red-700">
                Unable to load matches
              </h2>

              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* ===============================================
              EMPTY STATE
          =============================================== */}

          {!isLoading &&
            !error &&
            filteredMatches.length === 0 && (

              <div
                className="
                rounded-2xl
                border
                border-gray-200
                bg-white/70
                px-6
                py-16
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

          {/* ===============================================
              MATCH ROWS
          =============================================== */}

          {!isLoading &&
            !error &&
            filteredMatches.map((match) => (

              /*
                This wrapper gives every MatchCard
                its own reference.
  
                scroll-mt-24 leaves space above the card
                so the sticky navbar doesn't cover it.
              */

              <div
                key={match.matchId}
                ref={(element) => {
                  matchRefs.current[match.id] = element
                }}
                className="scroll-mt-24"
              >

                <MatchCard
                  match={match}
                  isExpanded={
                    expandedMatch === match.id
                  }
                  onToggle={() =>
                    toggleMatch(match.id)
                  }
                />

              </div>

            ))}

        </div>

      </div>

      {/* =================================================
          FLOATING ADD MATCH BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsAddMatchOpen(true)
        }
        className="
          fixed
          bottom-4
          right-4
          flex
          h-14
          w-14
          items-center
          justify-center
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

      {/* =================================================
          ADD MATCH MODAL
      ================================================= */}

      <AddMatchModal
        isOpen={isAddMatchOpen}
        onClose={() =>
          setIsAddMatchOpen(false)
        }
      />

    </div>
  )
}

export default Matches