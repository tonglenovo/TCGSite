import type { EventType } from '../../types/match'

const eventTypeStyles: Record<EventType, string> = {
  'Shop Battle':
    'bg-blue-100 text-blue-700 border-blue-200',

  'Newtype Challenge':
    'bg-purple-100 text-purple-700 border-purple-200',

  'Sealed Event':
    'bg-orange-100 text-orange-700 border-orange-200',

  '1st Anniversary Sealed Format Event':
    'bg-orange-100 text-orange-700 border-orange-200',
}

interface EventBadgeProps {
  eventType: EventType
}

function EventBadge({
  eventType,
}: EventBadgeProps) {
  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3 py-1
        text-xs font-semibold
        ${eventTypeStyles[eventType]}
      `}
    >
      {eventType}
    </span>
  )
}

export default EventBadge