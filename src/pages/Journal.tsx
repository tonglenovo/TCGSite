import { useState } from 'react'
import { CalendarDays, Plus, X, ImagePlus } from 'lucide-react'

interface JournalEntry {
  id: number
  title: string
  category: string
  date: string
  description: string
  images: string[]
}

const journals: JournalEntry[] = [
  {
    id: 1,
    title: 'My First TCG Event',
    category: 'TCG',
    date: '10 September 2026',
    description:
      'A memorable day playing games, meeting other players and enjoying the TCG community.',
    images: [
      'https://placehold.co/800x600?text=Photo+1',
      'https://placehold.co/800x600?text=Photo+2',
      'https://placehold.co/800x600?text=Photo+3',
    ],
  },
  {
    id: 2,
    title: 'Weekend Matches',
    category: 'Matches',
    date: '5 September 2026',
    description:
      'Some of the matches and moments from my weekend games.',
    images: [
      'https://placehold.co/800x600?text=Match+1',
      'https://placehold.co/800x600?text=Match+2',
    ],
  },
  {
    id: 3,
    title: 'New Cards Added',
    category: 'Collection',
    date: '1 September 2026',
    description:
      'A few new cards that I recently added to my collection.',
    images: [
      'https://placehold.co/800x600?text=Collection',
    ],
  },
]

function Journal() {
  const [isAddOpen, setIsAddOpen] = useState(false)



  return (
    <div
      className="
        relative
        w-full
        bg-linear-to-br
        from-purple-100
        via-white
        to-blue-100
        px-6 py-12
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Journal
          </h1>

          <p className="mt-2 text-gray-600">
            My latest TCG experiences, events and memories.
          </p>
        </div>

        {/* Journal Grid */}
        <div
          className="
            grid grid-cols-1
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {journals.map((journal) => (
            <article
              key={journal.id}
              className="
                overflow-hidden rounded-2xl
                border border-gray-200
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              {/* Images */}
              <div className="grid aspect-[4/3] grid-cols-2 gap-1 bg-gray-100">
                {journal.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`
                      relative overflow-hidden
                      ${
                        journal.images.length === 1
                          ? 'col-span-2 row-span-2'
                          : ''
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${journal.title} ${index + 1}`}
                      draggable={false}
                      onContextMenu={(event) =>
                        event.preventDefault()
                      }
                      className="
                        h-full w-full
                        select-none object-cover
                        transition duration-300
                        hover:scale-105
                      "
                    />

                    {/* Extra image count */}
                    {index === 3 &&
                      journal.images.length > 4 && (
                        <div
                          className="
                            absolute inset-0
                            flex items-center justify-center
                            bg-black/60
                            text-2xl font-bold text-white
                          "
                        >
                          +{journal.images.length - 4}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* Journal Information */}
              <div className="p-6">

                {/* Category */}
                <span
                  className="
                    inline-block
                    rounded-full
                    bg-purple-100
                    px-3 py-1
                    text-xs font-semibold
                    text-purple-700
                  "
                >
                  {journal.category}
                </span>

                {/* Title */}
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {journal.title}
                </h2>

                {/* Date */}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={16} />

                  <span>
                    {journal.date}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                  {journal.description}
                </p>

              </div>

            </article>
          ))}
        </div>

      </div>
    
        {/* Floating Add Button */}
        <button
        type="button"
        onClick={() => setIsAddOpen(true)}
        className="
            absolute bottom-6 right-6 z-30
            flex h-14 w-14
            items-center justify-center
            rounded-full
            bg-purple-600 text-white
            shadow-lg
            transition-all duration-200
            hover:scale-105
            hover:bg-purple-700
            hover:shadow-xl
        "
        aria-label="Add journal"
        >
        <Plus size={28} />
        </button>

        {/* Add Journal Modal */}
        {isAddOpen && (
        <div
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
            p-4
            "
        >
            <div
            className="
                max-h-[90vh] w-full max-w-2xl
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
            "
            >
            {/* Modal Header */}
            <div
                className="
                sticky top-0
                flex items-center justify-between
                border-b border-gray-200
                bg-white
                px-6 py-5
                "
            >
                <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Add Journal
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Create a new journal entry.
                </p>
                </div>

                <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    hover:text-gray-900
                "
                aria-label="Close"
                >
                <X size={24} />
                </button>
            </div>

            {/* Form */}
            <form className="space-y-6 p-6">

                {/* Title */}
                <div>
                <label
                    htmlFor="journal-title"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Title
                </label>

                <input
                    id="journal-title"
                    type="text"
                    placeholder="Enter journal title"
                    className="
                    w-full rounded-lg
                    border border-gray-300
                    px-4 py-3
                    outline-none
                    transition
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-100
                    "
                />
                </div>

                {/* Category + Date */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                    <label
                    htmlFor="journal-category"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                    Category
                    </label>

                    <select
                    id="journal-category"
                    className="
                        w-full rounded-lg
                        border border-gray-300
                        bg-white
                        px-4 py-3
                        outline-none
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                    "
                    >
                    <option value="">Select category</option>
                    <option value="TCG">TCG</option>
                    <option value="Matches">Matches</option>
                    <option value="Collection">Collection</option>
                    <option value="Event">Event</option>
                    <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label
                    htmlFor="journal-date"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                    Date
                    </label>

                    <input
                    id="journal-date"
                    type="date"
                    className="
                        w-full rounded-lg
                        border border-gray-300
                        px-4 py-3
                        outline-none
                        focus:border-purple-500
                        focus:ring-2
                        focus:ring-purple-100
                    "
                    />
                </div>

                </div>

                {/* Description */}
                <div>
                <label
                    htmlFor="journal-description"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="journal-description"
                    rows={5}
                    placeholder="Write about this journal entry..."
                    className="
                    w-full resize-none
                    rounded-lg
                    border border-gray-300
                    px-4 py-3
                    outline-none
                    transition
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-100
                    "
                />
                </div>

                {/* Multiple Images */}
                <div>
                <label
                    htmlFor="journal-images"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Images
                </label>

                <label
                    htmlFor="journal-images"
                    className="
                    flex cursor-pointer flex-col
                    items-center justify-center
                    rounded-xl
                    border-2 border-dashed border-gray-300
                    px-6 py-8
                    text-center
                    transition
                    hover:border-purple-400
                    hover:bg-purple-50
                    "
                >
                    <ImagePlus
                    size={32}
                    className="mb-3 text-purple-600"
                    />

                    <span className="font-medium text-gray-700">
                    Choose images
                    </span>

                    <span className="mt-1 text-sm text-gray-500">
                    You can select multiple images
                    </span>
                </label>

                <input
                    id="journal-images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                </div>

                {/* Actions */}
                <div
                className="
                    flex justify-end gap-3
                    border-t border-gray-200
                    pt-5
                "
                >
                <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="
                    rounded-lg
                    border border-gray-300
                    px-5 py-2.5
                    font-medium text-gray-700
                    transition
                    hover:bg-gray-100
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="
                    rounded-lg
                    bg-purple-600
                    px-5 py-2.5
                    font-medium text-white
                    transition
                    hover:bg-purple-700
                    "
                >
                    Publish
                </button>
                </div>

            </form>
            </div>
        </div>
        )}
    
    </div>

    
  )
}

export default Journal