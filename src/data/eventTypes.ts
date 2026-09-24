export const eventTypes = [
  'Shop Battle',
  'Newtype Challenge',
  '1st Anniversary Sealed Format Event',
  'Tournament',
  'Others',
] as const

export type EventType =
  (typeof eventTypes)[number]