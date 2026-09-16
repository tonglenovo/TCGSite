import { useState } from 'react'
import {
    BarChart3,
    ChevronDown,
    ChevronUp,
    Gift,
    Trophy,
} from 'lucide-react'

import DeckDisplay from './DeckDisplay'

import type {
    DeckColor,
    Game,
    MatchEvent,
} from '../../types/match'

interface MatchStatisticsProps {
    matches: MatchEvent[]
    selectedGame: Game | 'All'
}

function MatchStatistics({
    matches,
    selectedGame,
}: MatchStatisticsProps) {
    const [showDetails, setShowDetails] = useState(false)

    /* =====================================================
       STATISTICS
    ===================================================== */

    const totalEvents = matches.length

    const allRounds = matches.flatMap(
        (match) => match.rounds
    )

    const totalRounds = allRounds.length

    const roundWins = allRounds.filter(
        (round) => round.result === 'win'
    ).length

    const roundLosses = allRounds.filter(
        (round) => round.result === 'loss'
    ).length

    const roundWinRate =
        totalRounds === 0
            ? 0
            : (roundWins / totalRounds) * 100

    const uniqueDecks = new Set(
        matches.map((match) => match.deckName)
    ).size

    const winnerCount = matches.filter(
        (match) => match.achievement === 'winner'
    ).length

    const luckyDrawCount = matches.filter(
        (match) => match.achievement === 'lucky-draw'
    ).length

    /* =====================================================
       DECK USAGE
    ===================================================== */

    const deckUsage = Object.values(
        matches.reduce<
            Record<
                string,
                {
                    name: string
                    colors: DeckColor[]
                    count: number
                }
            >
        >((accumulator, match) => {
            const existingDeck =
                accumulator[match.deckName]

            if (existingDeck) {
                existingDeck.count += 1
            } else {
                accumulator[match.deckName] = {
                    name: match.deckName,
                    colors: match.deckColors,
                    count: 1,
                }
            }

            return accumulator
        }, {})
    ).sort((a, b) => b.count - a.count)

    const maximumDeckUsage =
        deckUsage.length > 0
            ? Math.max(
                ...deckUsage.map((deck) => deck.count)
            )
            : 0

    return (
        <section className="mb-10">
            <div
                className="
          overflow-hidden
          rounded-2xl
          border border-gray-200
          bg-white/80
          shadow-sm
          backdrop-blur-sm
        "
            >
                {/* =============================================
            HEADER
        ============================================= */}

                <div
                    className="
            border-b border-gray-200
            px-6 py-5
            sm:flex
            sm:items-center
            sm:justify-between
          "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-purple-100
                text-purple-600
              "
                        >
                            <BarChart3 size={20} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Current Season
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {selectedGame === 'All'
                                    ? 'Statistics for all games currently shown.'
                                    : `${selectedGame} statistics for the current season.`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =============================================
            OVERVIEW
        ============================================= */}

                <div
                    className="
            grid grid-cols-2
            divide-x divide-y divide-gray-200
            sm:grid-cols-4
          "
                >
                    <StatItem
                        label="Events"
                        value={totalEvents}
                    />

                    <StatItem
                        label="Rounds"
                        value={totalRounds}
                    />

                    <div className="bg-white px-5 py-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Round Record
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            <span className="text-green-600">
                                {roundWins}W
                            </span>

                            <span className="mx-2 text-gray-300">
                                /
                            </span>

                            <span className="text-red-600">
                                {roundLosses}L
                            </span>
                        </p>
                    </div>
                    <StatItem
                        label="Round Win Rate"
                        value={`${roundWinRate.toFixed(1)}%`}
                    />
                </div>

                <div
                    className="
            grid grid-cols-1
            divide-y divide-gray-200
            border-t border-gray-200
            sm:grid-cols-3
            sm:divide-x
            sm:divide-y-0
          "
                >
                    <StatItem
                        label="Decks Used"
                        value={uniqueDecks}
                    />

                    <StatItem
                        label="Winners"
                        value={winnerCount}
                        icon={<Trophy size={18} />}
                        iconClassName="text-yellow-600"
                    />

                    <StatItem
                        label="Lucky Draws"
                        value={luckyDrawCount}
                        icon={<Gift size={18} />}
                        iconClassName="text-purple-600"
                    />
                </div>

                {/* =============================================
            VIEW DETAILS
        ============================================= */}

                <button
                    type="button"
                    onClick={() =>
                        setShowDetails((current) => !current)
                    }
                    className="
            flex w-full
            items-center justify-center
            gap-2
            border-t border-gray-200
            px-6 py-4
            text-sm font-semibold
            text-purple-600
            transition
            hover:bg-purple-50
          "
                >
                    {showDetails
                        ? 'Hide Details'
                        : 'View Details'}

                    {showDetails ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </button>

                {/* =============================================
            DECK USAGE DETAILS
        ============================================= */}

                {showDetails && (
                    <div
                        className="
              border-t border-gray-200
              bg-gray-50/70
              px-6 py-6
            "
                    >
                        <h3 className="font-bold text-gray-900">
                            Deck Usage
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Number of events played with each deck.
                        </p>

                        {deckUsage.length === 0 ? (
                            <p className="mt-5 text-sm text-gray-500">
                                No deck usage data available.
                            </p>
                        ) : (
                            <div className="mt-5 space-y-5">
                                {deckUsage.map((deck) => {
                                    const barWidth =
                                        maximumDeckUsage === 0
                                            ? 0
                                            : (deck.count /
                                                maximumDeckUsage) *
                                            100

                                    return (
                                        <div key={deck.name}>
                                            <div
                                                className="
                          mb-2
                          flex items-center
                          justify-between
                          gap-4
                        "
                                            >
                                                <DeckDisplay
                                                    colors={deck.colors}
                                                    name={deck.name}
                                                />

                                                <span
                                                    className="
                            shrink-0
                            text-sm font-semibold
                            text-gray-600
                          "
                                                >
                                                    {deck.count}{' '}
                                                    {deck.count === 1
                                                        ? 'event'
                                                        : 'events'}
                                                </span>
                                            </div>

                                            <div
                                                className="
                          h-2
                          overflow-hidden
                          rounded-full
                          bg-gray-200
                        "
                                            >
                                                <div
                                                    className="
                            h-full
                            rounded-full
                            bg-purple-600
                            transition-all
                            duration-500
                          "
                                                    style={{
                                                        width: `${barWidth}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

/* =========================================================
   SMALL STAT ITEM
========================================================= */

interface StatItemProps {
    label: string
    value: string | number
    icon?: React.ReactNode
    iconClassName?: string
}

function StatItem({
    label,
    value,
    icon,
    iconClassName = '',
}: StatItemProps) {
    return (
        <div className="px-6 py-5">
            <div className="flex items-center gap-2">
                {icon && (
                    <span className={iconClassName}>
                        {icon}
                    </span>
                )}

                <p
                    className="
            text-xs font-bold
            uppercase tracking-wide
            text-gray-500
          "
                >
                    {label}
                </p>
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-900">
                {value}
            </p>
        </div>
    )
}

export default MatchStatistics