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
} from '../../types/match'

import {
  eventTypes,
} from '../../data/eventTypes'

import type {
  EventType,
} from '../../data/eventTypes'

/* =========================================================
   PROPS
========================================================= */

interface AddMatchModalProps {
  isOpen: boolean
  onClose: () => void
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
    circleClass: 'border border-gray-400 bg-white',
  },
]

/* =========================================================
   COMPONENT
========================================================= */

function AddMatchModal({
  isOpen,
  onClose,
}: AddMatchModalProps) {

  /* =======================================================
     EVENT INFORMATION
  ======================================================= */

  const [game, setGame] =
    useState<Game>('Gundam')

  const [date, setDate] =
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
                (item) => item !== color
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
     SUBMIT
  ======================================================= */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

    /*
      Your rule:

      x-0 = WIN
      anything else = LOSS
    */

    const result =
      score.trim().endsWith('-0')
        ? 'win'
        : 'loss'

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

    const newMatch = {
      game,
      date,
      location,
      eventType,

      result,
      score,

      deckColors,
      deckName,

      achievement,

      deckImage,
      rewardImage,

      rounds: completedRounds,
    }

    console.log(
      'New Match:',
      newMatch
    )

    /*
      Later we will replace this with:

      FormData
          ↓
      Express
          ↓
      MongoDB
    */

    onClose()
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

            <h2 className="text-2xl font-bold text-gray-900">
              Add Match
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new TCG match record.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
            aria-label="Close add match"
          >
            <X size={22} />
          </button>

        </div>

        {/* =================================================
            SCROLLABLE BODY
        ================================================= */}

        <div className="overflow-y-auto px-6 py-6">

          <div className="space-y-8">

            {/* =============================================
                EVENT INFORMATION
            ============================================= */}

            <section>

              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Event Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">

                {/* Game */}

                <FormField label="Game">

                  <select
                    value={game}
                    onChange={(event) =>
                      setGame(
                        event.target.value as Game
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Gundam">
                      Gundam
                    </option>

                    <option value="Riftbound">
                      Riftbound
                    </option>

                    <option value="Others">
                      Others
                    </option>
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
                      setEventType(
                        event.target.value as EventType
                      )
                    }
                    className={inputClass}
                  >
                    {eventTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>

                </FormField>

              </div>

            </section>

            {/* =============================================
                MATCH RESULT
            ============================================= */}

            <section>

              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Match Result
              </h3>

              <div className="grid gap-4 md:grid-cols-2">

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

                  <p className="mt-1 text-xs text-gray-400">
                    A score ending in -0 is automatically considered a win.
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

                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Deck Colours
                </p>

                <ColorSelector
                  selectedColors={deckColors}
                  onToggle={toggleDeckColor}
                />

                <p className="mt-2 text-xs text-gray-400">
                  Select 1 colour for mono or up to 2 colours.
                </p>

              </div>

            </section>

            {/* =============================================
                ACHIEVEMENT
            ============================================= */}

            <section>

              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Achievement
              </h3>

              <div className="flex flex-wrap gap-2">

                {/* None */}

                <AchievementButton
                  active={achievement === null}
                  onClick={() => {
                    setAchievement(null)
                    setRewardImage(null)
                  }}
                >
                  None
                </AchievementButton>

                {/* Winner */}

                <AchievementButton
                  active={
                    achievement === 'winner'
                  }
                  onClick={() =>
                    setAchievement('winner')
                  }
                >
                  🏆 Winner
                </AchievementButton>

                {/* Lucky Draw */}

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

              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Images
              </h3>

              <div
                className={`
                  grid
                  gap-4
                  ${
                    achievement !== null
                      ? 'md:grid-cols-2'
                      : 'grid-cols-1'
                  }
                `}
              >

                {/* Deck Image */}

                <ImageUpload
                  label="Deck Image"
                  image={deckImage}
                  preview={deckImagePreview}
                  onChange={setDeckImage}
                  onRemove={() =>
                    setDeckImage(null)
                  }
                />

                {/* Reward Image */}

                {achievement !== null && (
                  <ImageUpload
                    label="Reward Image"
                    image={rewardImage}
                    preview={rewardImagePreview}
                    onChange={setRewardImage}
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

              {/* Round Header */}

              <div className="mb-4">

                <h3 className="text-lg font-bold text-gray-900">
                  Rounds
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add each opponent you played.
                </p>

              </div>

              {/* ===========================================
                  ROUND CARDS
              =========================================== */}

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

                      {/* Round Number */}

                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <p className="font-bold text-gray-900">
                          Round {index + 1}
                        </p>

                        {/* Delete Round */}

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
                            aria-label={`Remove round ${
                              index + 1
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>

                        )}

                      </div>

                      {/* Round Inputs */}

                      <div className="grid gap-4 md:grid-cols-3">

                        {/* Opponent */}

                        <FormField label="Opponent">

                          <input
                            type="text"
                            value={
                              round.opponent
                            }
                            onChange={(event) =>
                              updateRound(
                                round.id,
                                'opponent',
                                event.target.value
                              )
                            }
                            placeholder="Opponent"
                            className={inputClass}
                          />

                        </FormField>

                        {/* Score */}

                        <FormField label="Score">

                          <input
                            type="text"
                            value={
                              round.score
                            }
                            onChange={(event) =>
                              updateRound(
                                round.id,
                                'score',
                                event.target.value
                              )
                            }
                            placeholder="1-0"
                            className={inputClass}
                          />

                        </FormField>

                        {/* Opponent Deck */}

                        <FormField label="Opponent Deck">

                          <input
                            type="text"
                            value={
                              round.deckName
                            }
                            onChange={(event) =>
                              updateRound(
                                round.id,
                                'deckName',
                                event.target.value
                              )
                            }
                            placeholder="OYNu"
                            className={inputClass}
                          />

                        </FormField>

                      </div>

                      {/* Opponent Deck Colours */}

                      <div className="mt-4">

                        <p className="mb-2 text-sm font-semibold text-gray-700">
                          Opponent Deck Colours
                        </p>

                        <ColorSelector
                          selectedColors={
                            round.deckColors
                          }
                          onToggle={(color) =>
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

              {/* ===========================================
                  ADD ROUND BUTTON - NOW AT BOTTOM
              =========================================== */}

              <div className="mt-4 flex justify-center">

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
            justify-end
            gap-3
            border-t
            border-gray-200
            bg-white
            px-6 py-4
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border border-gray-300
              px-5 py-2.5
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`
              rounded-lg
              px-5 py-2.5
              text-sm
              font-semibold
              text-white
              transition
              ${
                isFormValid
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
            Add Match
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
    <div className="flex flex-wrap gap-2">

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
                onToggle(color.value)
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
                ${
                  selected
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
        ${
          active
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

      <p className="mb-2 text-sm font-semibold text-gray-700">
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
                event.target.files?.[0]

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