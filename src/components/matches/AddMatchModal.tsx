import { X } from 'lucide-react'

interface AddMatchModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddMatchModal({
  isOpen,
  onClose,
}: AddMatchModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        px-4 py-6
      "
    >
      {/* Modal */}

      <div
        className="
          flex
          max-h-[90vh]
          w-full max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            flex items-center justify-between
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

        {/* Body */}

        <div className="overflow-y-auto px-6 py-6">
          <div
            className="
              rounded-xl
              border border-dashed border-gray-300
              bg-gray-50
              px-6 py-16
              text-center
            "
          >
            <p className="font-semibold text-gray-700">
              Add Match Form
            </p>

            <p className="mt-1 text-sm text-gray-500">
              We will build the form here next.
            </p>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex justify-end gap-3
            border-t border-gray-200
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
              text-sm font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled
            className="
              cursor-not-allowed
              rounded-lg
              bg-purple-300
              px-5 py-2.5
              text-sm font-semibold
              text-white
            "
          >
            Add Match
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddMatchModal