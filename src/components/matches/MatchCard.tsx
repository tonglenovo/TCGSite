// import {
//   ChevronDown,
//   ChevronUp,
// } from 'lucide-react'

// import AchievementBadge from './AchievementBadge'
// import DeckDisplay from './DeckDisplay'
// import EventBadge from './EventBadge'
// import MatchDetails from './MatchDetails'
// import ResultBadge from './ResultBadge'

// import MatchCardMobile from './MatchCardMobile'

// import type { MatchEvent } from '../../types/match'

// interface MatchCardProps {
//   match: MatchEvent
//   isExpanded: boolean
//   onToggle: () => void
// }

// /* =========================================================
//    DATE DISPLAY
// ========================================================= */

// function formatMatchDate(date: string) {
//   const parsedDate = new Date(`${date}T00:00:00`)

//   return parsedDate.toLocaleDateString('en-SG', {
//     weekday: 'short',
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   })
// }

// /* =========================================================
//    MATCH CARD
// ========================================================= */

// function MatchCard({
//   match,
//   isExpanded,
//   onToggle,
// }: MatchCardProps) {
//   const isWin = match.result === 'win'

//   return (
//     <div
//       className={`
//         overflow-hidden
//         rounded-2xl
//         border
//         shadow-sm
//         transition
//         ${
//           isWin
//             ? 'border-green-200 bg-green-50'
//             : 'border-red-200 bg-red-50'
//         }
//       `}
//     >
//       {/* =================================================
//           MAIN MATCH ROW
//       ================================================= */}

//       <button
//         type="button"
//         onClick={onToggle}
//         className="
//           w-full
//           p-5
//           text-left
//           transition
//           hover:bg-white/30
//         "
//       >
//         {/* =============================================
//             DESKTOP
//         ============================================= */}

//         <div
//           className="
//             hidden
//             items-center
//             gap-6
//             md:grid
//             md:grid-cols-[120px_1.3fr_1.2fr_100px_100px_1.2fr_1fr_30px]
//           "
//         >
//           {/* Date */}

//           <span className="text-sm font-medium text-gray-600">
//             {formatMatchDate(match.date)}
//           </span>

//           {/* Location */}

//           <span className="font-bold text-gray-900">
//             {match.location}
//           </span>

//           {/* Event Type */}

//           <div>
//             <EventBadge
//               eventType={match.eventType}
//             />
//           </div>

//           {/* Result */}

//           <div>
//             <ResultBadge
//               result={match.result}
//             />
//           </div>

//           {/* Score */}

//           <span className="text-lg font-bold text-gray-900">
//             {match.score}
//           </span>

//           {/* Deck */}

//           <DeckDisplay
//             colors={match.deckColors}
//             name={match.deckName}
//           />

//           {/* Achievement */}

//           <div>
//             <AchievementBadge
//               achievement={match.achievement}
//             />
//           </div>

//           {/* Expand Arrow */}

//           <div className="flex justify-end">
//             {isExpanded ? (
//               <ChevronUp size={22} />
//             ) : (
//               <ChevronDown size={22} />
//             )}
//           </div>
//         </div>

//         <MatchCardMobile
//           match={match}
//           isExpanded={isExpanded}
//         />
        
//       </button>

//       {/* =================================================
//           EXPANDED DETAILS
//       ================================================= */}

//       {isExpanded && (
//         <MatchDetails match={match} />
//       )}
//     </div>
//   )
// }

// export default MatchCard

import {
  ChevronDown,
  ChevronUp,
  Pencil,
} from 'lucide-react'

import AchievementBadge from './AchievementBadge'
import DeckDisplay from './DeckDisplay'
import EventBadge from './EventBadge'
import MatchDetails from './MatchDetails'
import ResultBadge from './ResultBadge'

import MatchCardMobile from './MatchCardMobile'

import type { MatchEvent } from '../../types/match'

interface MatchCardProps {
  match: MatchEvent
  isExpanded: boolean
  onToggle: () => void
  onEdit: () => void
}

/* =========================================================
   DATE DISPLAY
========================================================= */

function formatMatchDate(date: string) {
  const parsedDate =
    new Date(`${date}T00:00:00`)

  return parsedDate.toLocaleDateString(
    'en-SG',
    {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  )
}

/* =========================================================
   MATCH CARD
========================================================= */

function MatchCard({
  match,
  isExpanded,
  onToggle,
  onEdit,
}: MatchCardProps) {

  const isWin =
    match.result === 'win'

  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border
        shadow-sm
        transition
        ${
          isWin
            ? 'border-green-200 bg-green-50'
            : 'border-red-200 bg-red-50'
        }
      `}
    >

      {/* =================================================
          MAIN MATCH ROW
      ================================================= */}

      <button
        type="button"
        onClick={onToggle}
        className="
          w-full
          p-5
          text-left
          transition
          hover:bg-white/30
        "
      >

        {/* =============================================
            DESKTOP
        ============================================= */}

        <div
          className="
            hidden
            items-center
            gap-6
            md:grid
            md:grid-cols-[120px_1.3fr_1.2fr_100px_100px_1.2fr_1fr_30px]
          "
        >

          {/* Date */}

          <span
            className="
              text-sm
              font-medium
              text-gray-600
            "
          >
            {formatMatchDate(
              match.date
            )}
          </span>

          {/* Location */}

          <span
            className="
              font-bold
              text-gray-900
            "
          >
            {match.location}
          </span>

          {/* Event Type */}

          <div>
            <EventBadge
              eventType={
                match.eventType
              }
            />
          </div>

          {/* Result */}

          <div>
            <ResultBadge
              result={
                match.result
              }
            />
          </div>

          {/* Score */}

          <span
            className="
              text-lg
              font-bold
              text-gray-900
            "
          >
            {match.score}
          </span>

          {/* Deck */}

          <DeckDisplay
            colors={
              match.deckColors
            }
            name={
              match.deckName
            }
          />

          {/* Achievement */}

          <div>
            <AchievementBadge
              achievement={
                match.achievement
              }
            />
          </div>

          {/* Expand Arrow */}

          <div
            className="
              flex
              justify-end
            "
          >
            {isExpanded ? (
              <ChevronUp
                size={22}
              />
            ) : (
              <ChevronDown
                size={22}
              />
            )}
          </div>

        </div>

        {/* =============================================
            MOBILE
        ============================================= */}

        <MatchCardMobile
          match={match}
          isExpanded={
            isExpanded
          }
        />

      </button>

      {/* =================================================
          EXPANDED DETAILS
      ================================================= */}

      {isExpanded && (
        <div>

          <MatchDetails
            match={match}
          />

          {/* =============================================
              EDIT BUTTON
          ============================================= */}

          <div
            className="
              flex
              justify-end
              border-t
              border-black/5
              px-5
              py-4
            "
          >

            <button
              type="button"
              onClick={onEdit}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-purple-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-purple-700
              "
            >
              <Pencil
                size={16}
              />

              Edit Match
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default MatchCard