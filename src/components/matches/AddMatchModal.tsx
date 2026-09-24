import { useEffect, useState } from 'react'

import {
  ImagePlus,
  Plus,
  Trash2,
  X,
} from 'lucide-react'

import type {
  DeckColor,
  Game,
  MatchEvent,
} from '../../types/match'

import {
  eventTypes,
} from '../../data/eventTypes'

import type {
  EventType,
} from '../../data/eventTypes'

import { API_URL } from '../../config/api'

/* =========================================================
   PROPS
========================================================= */

interface AddMatchModalProps {
  isOpen: boolean
  onClose: () => void
  onMatchAdded: () => Promise<void>
  matchToEdit?: MatchEvent | null
}

/* =========================================================
   ROUND FORM TYPE
========================================================= */

interface RoundForm {
  id: number
  opponent: string
  score: string
  deckName: string
  deckColors: DeckColor[]
}

/* =========================================================
   DECK COLOUR OPTIONS
========================================================= */

const deckColorOptions: {
  value: DeckColor
  label: string
  circleClass: string
}[] = [
    {
      value: 'blue',
      label: 'Blue',
      circleClass: 'bg-blue-500',
    },
    {
      value: 'green',
      label: 'Green',
      circleClass: 'bg-green-500',
    },
    {
      value: 'red',
      label: 'Red',
      circleClass: 'bg-red-500',
    },
    {
      value: 'purple',
      label: 'Purple',
      circleClass: 'bg-purple-500',
    },
    {
      value: 'white',
      label: 'White',
      circleClass:
        'border border-gray-400 bg-white',
    },
  ]

/* =========================================================
   COMPONENT
========================================================= */

function AddMatchModal({
  isOpen,
  onClose,
  onMatchAdded,
  matchToEdit = null,
}: AddMatchModalProps) {

  const isEditing =
    matchToEdit !== null

  /* =======================================================
     SUBMIT STATE
  ======================================================= */

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [submitError, setSubmitError] =
    useState('')

  /* =======================================================
     EVENT INFORMATION
  ======================================================= */

  const [game, setGame] =
    useState<Game>('Gundam')

  const [date, setDate] =
    useState('')

  const [time, setTime] =
    useState('')

  const [location, setLocation] =
    useState('')

  const [eventType, setEventType] =
    useState<EventType>('Shop Battle')

  /* =======================================================
     MATCH RESULT
  ======================================================= */

  const [score, setScore] =
    useState('')

  const [deckName, setDeckName] =
    useState('')

  const [deckColors, setDeckColors] =
    useState<DeckColor[]>([])

  /* =======================================================
     ACHIEVEMENT
  ======================================================= */

  const [achievement, setAchievement] =
    useState<
      'winner' |
      'lucky-draw' |
      null
    >(null)

  /* =======================================================
     IMAGES
  ======================================================= */

  const [deckImage, setDeckImage] =
    useState<File | null>(null)

  const [rewardImage, setRewardImage] =
    useState<File | null>(null)

  const [
    deckImagePreview,
    setDeckImagePreview,
  ] = useState<string | null>(null)

  const [
    rewardImagePreview,
    setRewardImagePreview,
  ] = useState<string | null>(null)

  /* =======================================================
     ROUNDS
  ======================================================= */

  const [rounds, setRounds] =
    useState<RoundForm[]>([
      {
        id: 1,
        opponent: '',
        score: '',
        deckName: '',
        deckColors: [],
      },
    ])

  /* =======================================================
 LOAD MATCH WHEN EDITING
======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (!matchToEdit) {
      return
    }

    setGame(matchToEdit.game)

    setDate(
      matchToEdit.date ??
      matchToEdit.playedAt.slice(0, 10)
    )

    // Convert MongoDB UTC time back to Singapore time.
    const playedDate =
      new Date(matchToEdit.playedAt)

    const singaporeTime =
      playedDate.toLocaleTimeString(
        'en-GB',
        {
          timeZone: 'Asia/Singapore',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      )

    setTime(singaporeTime)

    setLocation(
      matchToEdit.location
    )

    setEventType(
      matchToEdit.eventType as EventType
    )

    setScore(
      matchToEdit.score
    )

    setDeckName(
      matchToEdit.deckName
    )

    setDeckColors(
      [...matchToEdit.deckColors]
    )

    setAchievement(
      matchToEdit.achievement ?? null
    )

    setRounds(
      matchToEdit.rounds.map(
        (round, index) => ({
          id:
            round.id ??
            index + 1,

          opponent:
            round.opponent,

          score:
            round.score,

          deckName:
            round.deckName,

          deckColors:
            [...round.deckColors],
        })
      )
    )

    setSubmitError('')

  }, [
    isOpen,
    matchToEdit,
  ])


  /* =======================================================
     DECK IMAGE PREVIEW
  ======================================================= */

  useEffect(() => {
    if (!deckImage) {
      setDeckImagePreview(null)
      return
    }

    const previewUrl =
      URL.createObjectURL(deckImage)

    setDeckImagePreview(previewUrl)

    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [deckImage])

  /* =======================================================
     REWARD IMAGE PREVIEW
  ======================================================= */

  useEffect(() => {
    if (!rewardImage) {
      setRewardImagePreview(null)
      return
    }

    const previewUrl =
      URL.createObjectURL(rewardImage)

    setRewardImagePreview(previewUrl)

    return () => {
      URL.revokeObjectURL(previewUrl)
    }
  }, [rewardImage])

  /* =======================================================
     DECK COLOUR
  ======================================================= */

  const toggleDeckColor = (
    color: DeckColor
  ) => {
    setDeckColors((current) => {

      if (current.includes(color)) {
        return current.filter(
          (item) => item !== color
        )
      }

      // Maximum 2 colours
      if (current.length >= 2) {
        return current
      }

      return [
        ...current,
        color,
      ]
    })
  }

  /* =======================================================
     ROUND COLOUR
  ======================================================= */

  const toggleRoundColor = (
    roundId: number,
    color: DeckColor
  ) => {
    setRounds((currentRounds) =>
      currentRounds.map((round) => {

        if (round.id !== roundId) {
          return round
        }

        if (
          round.deckColors.includes(color)
        ) {
          return {
            ...round,

            deckColors:
              round.deckColors.filter(
                (item) =>
                  item !== color
              ),
          }
        }

        // Maximum 2 colours
        if (
          round.deckColors.length >= 2
        ) {
          return round
        }

        return {
          ...round,

          deckColors: [
            ...round.deckColors,
            color,
          ],
        }
      })
    )
  }

  /* =======================================================
     ADD ROUND
  ======================================================= */

  const addRound = () => {

    const nextId =
      rounds.length === 0
        ? 1
        : Math.max(
          ...rounds.map(
            (round) => round.id
          )
        ) + 1

    setRounds((current) => [
      ...current,
      {
        id: nextId,
        opponent: '',
        score: '',
        deckName: '',
        deckColors: [],
      },
    ])
  }

  /* =======================================================
     REMOVE ROUND
  ======================================================= */

  const removeRound = (
    roundId: number
  ) => {
    setRounds((current) =>
      current.filter(
        (round) =>
          round.id !== roundId
      )
    )
  }

  /* =======================================================
     UPDATE ROUND
  ======================================================= */

  const updateRound = (
    roundId: number,
    field:
      | 'opponent'
      | 'score'
      | 'deckName',
    value: string
  ) => {
    setRounds((current) =>
      current.map((round) => {

        if (round.id !== roundId) {
          return round
        }

        return {
          ...round,
          [field]: value,
        }
      })
    )
  }

  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  const isFormValid =
    date.trim() !== '' &&
    time.trim() !== '' &&
    location.trim() !== '' &&
    eventType.trim() !== '' &&
    score.trim() !== '' &&
    deckName.trim() !== '' &&
    deckColors.length > 0 &&
    rounds.length > 0 &&
    rounds.every(
      (round) =>
        round.opponent.trim() !== '' &&
        round.score.trim() !== ''
    )

  /* =======================================================
   RESET FORM
======================================================= */

  const resetForm = () => {
    // Event information
    setGame('Gundam')
    setDate('')
    setTime('')
    setLocation('')
    setEventType('Shop Battle')

    // Match result
    setScore('')
    setDeckName('')
    setDeckColors([])

    // Achievement
    setAchievement(null)

    // Images
    setDeckImage(null)
    setRewardImage(null)
    setDeckImagePreview(null)
    setRewardImagePreview(null)

    // Rounds
    setRounds([
      {
        id: 1,
        opponent: '',
        score: '',
        deckName: '',
        deckColors: [],
      },
    ])

    // Error
    setSubmitError('')
  }


  const handleClose = () => {
    if (isSubmitting) {
      return
    }

    resetForm()
    onClose()
  }

  /* =======================================================
     SUBMIT
  ======================================================= */


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (
      !isFormValid ||
      isSubmitting
    ) {
      return
    }

    /* =====================================================
       RESULT RULE
  
       x-0 = WIN
       anything else = LOSS
    ===================================================== */

    const result =
      score
        .trim()
        .endsWith('-0')
        ? 'win'
        : 'loss'

    /* =====================================================
       COMPLETE ROUND DATA
    ===================================================== */

    const completedRounds =
      rounds.map((round) => ({
        ...round,

        result:
          round.score
            .trim()
            .endsWith('-0')
            ? 'win'
            : 'loss',
      }))

    /* =====================================================
       PLAYED AT
  
       Singapore UTC+8
    ===================================================== */

    const playedAt =
      `${date}T${time}:00+08:00`

    /* =====================================================
       MATCH DATA
    ===================================================== */

    const matchData = {
      game,

      date,
      time,
      playedAt,

      location,
      eventType,

      result,
      score,

      deckColors,
      deckName,

      achievement,

      rounds:
        completedRounds,
    }

    /* =====================================================
       ADD OR EDIT
    ===================================================== */

    const requestUrl =
      isEditing
        ? `${API_URL}/api/matches/${matchToEdit.id}`
        : `${API_URL}/api/matches`

    const requestMethod =
      isEditing
        ? 'PATCH'
        : 'POST'

    try {

      setIsSubmitting(true)
      setSubmitError('')

      const response =
        await fetch(
          requestUrl,
          {
            method:
              requestMethod,

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(
                matchData
              ),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          (
            isEditing
              ? 'Failed to update match'
              : 'Failed to add match'
          )
        )
      }

      if (isEditing) {

        console.log(
          'Match updated in MongoDB:',
          data
        )

      } else {

        console.log(
          'Match saved to MongoDB:',
          data
        )

      }

      // Get latest MongoDB data.
      await onMatchAdded()

      // Clear old form.
      resetForm()

      // Close modal.
      onClose()

    } catch (error) {

      console.error(
        isEditing
          ? 'Failed to update match:'
          : 'Failed to add match:',
        error
      )

      if (
        error instanceof Error
      ) {

        setSubmitError(
          error.message
        )

      } else {

        setSubmitError(
          isEditing
            ? 'Failed to update match'
            : 'Failed to add match'
        )

      }

    } finally {

      setIsSubmitting(false)

    }
  }

  /* =======================================================
     CLOSED
  ======================================================= */

  if (!isOpen) {
    return null
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        px-4 py-6
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          flex
          max-h-[90vh]
          w-full max-w-4xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-center justify-between
            border-b border-gray-200
            px-6 py-5
          "
        >

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-gray-900
            "
            >
              {isEditing
                ? 'Edit Match'
                : 'Add Match'}
            </h2>

            <p
              className="
              mt-1
              text-sm
              text-gray-500
            "
            >
              {isEditing
                ? 'Update this TCG match record.'
                : 'Add a new TCG match record.'}
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label={
              isEditing
                ? 'Close edit match'
                : 'Close add match'
            }
          >
            <X size={22} />
          </button>

        </div>

        {/* =================================================
            SCROLLABLE BODY
        ================================================= */}

        <div
          className="
            overflow-y-auto
            px-6 py-6
          "
        >

          <div className="space-y-8">

            {/* =============================================
                EVENT INFORMATION
            ============================================= */}

            <section>

              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Event Information
              </h3>

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                {/* Game */}

                <FormField label="Game">

                  <select
                    value={game}
                    onChange={(event) => {
                      setGame(event.target.value as Game)
                    }}
                    className={inputClass}
                  >
                    <option value="Gundam">Gundam</option>
                    <option value="Riftbound">Riftbound</option>
                    <option value="Others">Others</option>
                  </select>

                </FormField>

                {/* Date */}

                <FormField label="Date">

                  <input
                    type="date"
                    value={date}
                    onChange={(event) =>
                      setDate(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />

                </FormField>

                {/* Time */}

                <FormField label="Time">

                  <input
                    type="time"
                    value={time}
                    onChange={(event) =>
                      setTime(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />

                </FormField>

                {/* Location */}

                <FormField label="Location">

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(
                        event.target.value
                      )
                    }
                    placeholder="HotSpot TCG"
                    className={inputClass}
                  />

                </FormField>

                {/* Event Type */}

                <FormField label="Event Type">

                  <select
                    value={eventType}
                    onChange={(event) =>
                      setEventType(event.target.value as EventType)
                    }
                    className={inputClass}
                  >

                    {eventTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}

                  </select>

                </FormField>

              </div>

            </section>

            {/* =============================================
                MATCH RESULT
            ============================================= */}

            <section>

              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Match Result
              </h3>

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                {/* Score */}

                <FormField label="Score">

                  <input
                    type="text"
                    value={score}
                    onChange={(event) =>
                      setScore(
                        event.target.value
                      )
                    }
                    placeholder="2-0"
                    className={inputClass}
                  />

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-400
                    "
                  >
                    A score ending in -0 is
                    automatically considered
                    a win.
                  </p>

                </FormField>

                {/* Deck Name */}

                <FormField label="Deck Name">

                  <input
                    type="text"
                    value={deckName}
                    onChange={(event) =>
                      setDeckName(
                        event.target.value
                      )
                    }
                    placeholder="IBO SF"
                    className={inputClass}
                  />

                </FormField>

              </div>

              {/* Deck Colours */}

              <div className="mt-4">

                <p
                  className="
                    mb-2
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  Deck Colours
                </p>

                <ColorSelector
                  selectedColors={
                    deckColors
                  }
                  onToggle={
                    toggleDeckColor
                  }
                />

                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-400
                  "
                >
                  Select 1 colour for mono
                  or up to 2 colours.
                </p>

              </div>

            </section>

            {/* =============================================
                ACHIEVEMENT
            ============================================= */}

            <section>

              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Achievement
              </h3>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <AchievementButton
                  active={
                    achievement === null
                  }
                  onClick={() => {
                    setAchievement(null)
                    setRewardImage(null)
                  }}
                >
                  None
                </AchievementButton>

                <AchievementButton
                  active={
                    achievement ===
                    'winner'
                  }
                  onClick={() =>
                    setAchievement(
                      'winner'
                    )
                  }
                >
                  🏆 Winner
                </AchievementButton>

                <AchievementButton
                  active={
                    achievement ===
                    'lucky-draw'
                  }
                  onClick={() =>
                    setAchievement(
                      'lucky-draw'
                    )
                  }
                >
                  🎁 Lucky Draw
                </AchievementButton>

              </div>

            </section>

            {/* =============================================
                IMAGES
            ============================================= */}

            <section>

              <h3
                className="
                  mb-4
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Images
              </h3>

              <div
                className={`
                  grid
                  gap-4
                  ${achievement !== null
                    ? 'md:grid-cols-2'
                    : 'grid-cols-1'
                  }
                `}
              >

                <ImageUpload
                  label="Deck Image"
                  image={deckImage}
                  preview={
                    deckImagePreview
                  }
                  onChange={
                    setDeckImage
                  }
                  onRemove={() =>
                    setDeckImage(null)
                  }
                />

                {achievement !== null && (

                  <ImageUpload
                    label="Reward Image"
                    image={rewardImage}
                    preview={
                      rewardImagePreview
                    }
                    onChange={
                      setRewardImage
                    }
                    onRemove={() =>
                      setRewardImage(null)
                    }
                  />

                )}

              </div>

            </section>

            {/* =============================================
                ROUNDS
            ============================================= */}

            <section>

              <div className="mb-4">

                <h3
                  className="
                    text-lg
                    font-bold
                    text-gray-900
                  "
                >
                  Rounds
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                  "
                >
                  Add each opponent you
                  played.
                </p>

              </div>

              {/* Round Cards */}

              <div className="space-y-4">

                {rounds.map(
                  (round, index) => (

                    <div
                      key={round.id}
                      className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-5
                      "
                    >

                      {/* Round Header */}

                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p
                          className="
                            font-bold
                            text-gray-900
                          "
                        >
                          Round {index + 1}
                        </p>

                        {rounds.length > 1 && (

                          <button
                            type="button"
                            onClick={() =>
                              removeRound(
                                round.id
                              )
                            }
                            className="
                              flex
                              h-9 w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-red-500
                              transition
                              hover:bg-red-50
                            "
                            aria-label={
                              `Remove round ${index + 1
                              }`
                            }
                          >
                            <Trash2
                              size={18}
                            />
                          </button>

                        )}

                      </div>

                      {/* Round Inputs */}

                      <div
                        className="
                          grid
                          gap-4
                          md:grid-cols-3
                        "
                      >

                        {/* Opponent */}

                        <FormField
                          label="Opponent"
                        >

                          <input
                            type="text"
                            value={
                              round.opponent
                            }
                            onChange={(
                              event
                            ) =>
                              updateRound(
                                round.id,
                                'opponent',
                                event.target
                                  .value
                              )
                            }
                            placeholder="Opponent"
                            className={
                              inputClass
                            }
                          />

                        </FormField>

                        {/* Score */}

                        <FormField
                          label="Score"
                        >

                          <input
                            type="text"
                            value={
                              round.score
                            }
                            onChange={(
                              event
                            ) =>
                              updateRound(
                                round.id,
                                'score',
                                event.target
                                  .value
                              )
                            }
                            placeholder="1-0"
                            className={
                              inputClass
                            }
                          />

                        </FormField>

                        {/* Opponent Deck */}

                        <FormField
                          label="Opponent Deck"
                        >

                          <input
                            type="text"
                            value={
                              round.deckName
                            }
                            onChange={(
                              event
                            ) =>
                              updateRound(
                                round.id,
                                'deckName',
                                event.target
                                  .value
                              )
                            }
                            placeholder="OYNu"
                            className={
                              inputClass
                            }
                          />

                        </FormField>

                      </div>

                      {/* Opponent Colours */}

                      <div className="mt-4">

                        <p
                          className="
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-700
                          "
                        >
                          Opponent Deck Colours
                        </p>

                        <ColorSelector
                          selectedColors={
                            round.deckColors
                          }
                          onToggle={(
                            color
                          ) =>
                            toggleRoundColor(
                              round.id,
                              color
                            )
                          }
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* Add Round */}

              <div
                className="
                  mt-4
                  flex
                  justify-center
                "
              >

                <button
                  type="button"
                  onClick={addRound}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-purple-50
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-purple-600
                    transition
                    hover:bg-purple-100
                  "
                >

                  <Plus size={17} />

                  Add Round

                </button>

              </div>

            </section>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-gray-200
            bg-white
            px-6 py-4
          "
        >

          {/* Error */}

          {submitError && (

            <p
              className="
                mr-auto
                text-sm
                font-medium
                text-red-500
              "
            >
              {submitError}
            </p>

          )}

          {/* Cancel */}

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              rounded-lg
              border
              border-gray-300
              px-5 py-2.5
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              !isFormValid ||
              isSubmitting
            }
            className={`
              rounded-lg
              px-5 py-2.5
              text-sm
              font-semibold
              text-white
              transition
              ${isFormValid &&
                !isSubmitting
                ? `
                      bg-purple-600
                      hover:bg-purple-700
                    `
                : `
                      cursor-not-allowed
                      bg-purple-300
                    `
              }
            `}
          >

            {isSubmitting
              ? (
                isEditing
                  ? 'Saving...'
                  : 'Adding...'
              )
              : (
                isEditing
                  ? 'Save Changes'
                  : 'Add Match'
              )}

          </button>

        </div>

      </form>

    </div>
  )
}

/* =========================================================
   FORM FIELD
========================================================= */

interface FormFieldProps {
  label: string
  children: React.ReactNode
}

function FormField({
  label,
  children,
}: FormFieldProps) {

  return (
    <label className="block">

      <span
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-gray-700
        "
      >
        {label}
      </span>

      {children}

    </label>
  )
}

/* =========================================================
   COLOUR SELECTOR
========================================================= */

interface ColorSelectorProps {
  selectedColors: DeckColor[]

  onToggle: (
    color: DeckColor
  ) => void
}

function ColorSelector({
  selectedColors,
  onToggle,
}: ColorSelectorProps) {

  return (
    <div
      className="
        flex
        flex-wrap
        gap-2
      "
    >

      {deckColorOptions.map(
        (color) => {

          const selected =
            selectedColors.includes(
              color.value
            )

          return (

            <button
              key={color.value}
              type="button"
              onClick={() =>
                onToggle(
                  color.value
                )
              }
              className={`
                flex
                items-center
                gap-2
                rounded-full
                border
                px-3 py-2
                text-sm
                font-medium
                transition
                ${selected
                  ? `
                        border-purple-400
                        bg-purple-50
                        text-purple-700
                      `
                  : `
                        border-gray-200
                        bg-white
                        text-gray-600
                        hover:border-gray-300
                      `
                }
              `}
            >

              <span
                className={`
                  h-3 w-3
                  rounded-full
                  ${color.circleClass}
                `}
              />

              {color.label}

            </button>

          )
        }
      )}

    </div>
  )
}

/* =========================================================
   ACHIEVEMENT BUTTON
========================================================= */

interface AchievementButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function AchievementButton({
  active,
  onClick,
  children,
}: AchievementButtonProps) {

  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-full
        border
        px-4 py-2
        text-sm
        font-semibold
        transition
        ${active
          ? `
                border-purple-400
                bg-purple-50
                text-purple-700
              `
          : `
                border-gray-200
                bg-white
                text-gray-600
                hover:border-purple-300
              `
        }
      `}
    >

      {children}

    </button>
  )
}

/* =========================================================
   IMAGE UPLOAD
========================================================= */

interface ImageUploadProps {
  label: string

  image: File | null

  preview: string | null

  onChange: (
    file: File | null
  ) => void

  onRemove: () => void
}

function ImageUpload({
  label,
  image,
  preview,
  onChange,
  onRemove,
}: ImageUploadProps) {

  return (
    <div>

      <p
        className="
          mb-2
          text-sm
          font-semibold
          text-gray-700
        "
      >
        {label}
      </p>

      {!preview ? (

        /* Upload Area */

        <label
          className="
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            border-gray-300
            bg-gray-50
            px-5 py-10
            text-center
            transition
            hover:border-purple-400
            hover:bg-purple-50
          "
        >

          <ImagePlus
            size={28}
            className="text-gray-400"
          />

          <span
            className="
              mt-3
              text-sm
              font-semibold
              text-gray-700
            "
          >
            Choose image
          </span>

          <span
            className="
              mt-1
              text-xs
              text-gray-400
            "
          >
            JPG, PNG or WebP
          </span>

          <input
            type="file"
            accept="
              image/jpeg,
              image/png,
              image/webp
            "
            className="hidden"
            onChange={(event) => {

              const file =
                event.target
                  .files?.[0]

              if (file) {
                onChange(file)
              }

            }}
          />

        </label>

      ) : (

        /* Image Preview */

        <div
          className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
          "
        >

          <img
            src={preview}
            alt={label}
            className="
              h-48
              w-full
              object-cover
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              px-4 py-3
            "
          >

            <p
              className="
                min-w-0
                truncate
                text-sm
                text-gray-600
              "
            >
              {image?.name}
            </p>

            <button
              type="button"
              onClick={onRemove}
              className="
                shrink-0
                text-sm
                font-semibold
                text-red-500
                hover:text-red-600
              "
            >
              Remove
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

/* =========================================================
   SHARED INPUT STYLE
========================================================= */

const inputClass = `
  w-full
  rounded-lg
  border
  border-gray-300
  bg-white
  px-4
  py-2.5
  text-sm
  text-gray-900
  outline-none
  transition
  placeholder:text-gray-400
  focus:border-purple-500
  focus:ring-2
  focus:ring-purple-100
`

export default AddMatchModal