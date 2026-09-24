export const eventTypes = [
  'Shop Battle',
  'Newtype Challenge',
  '1st Anniversary Sealed Format Event',
  'Serial Card Challenge',
  'Tournament',
  'Others',
] as const

export type EventType =
  (typeof eventTypes)[number]