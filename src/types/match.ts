export type Result = 'win' | 'loss'

export type Game =
  | 'Gundam'
  | 'Riftbound'
  | 'Others'

export type EventType =
  | 'Shop Battle'
  | 'Newtype Challenge'
  | 'Sealed Event'
  | '1st Anniversary Sealed Format Event'

export type Achievement =
  | 'winner'
  | 'lucky-draw'
  | null

export type DeckColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'purple'
  | 'white'

export interface MatchRound {
  id: number
  opponent: string
  result: Result
  score: string
  deckColors: DeckColor[]
  deckName: string
}

export interface MatchEvent {
  id: number

  // Used later to link Match <-> Journal
  matchId: string

  game: Game

  // Store dates as YYYY-MM-DD
  date: string

  location: string
  eventType: EventType

  result: Result
  score: string

  deckColors: DeckColor[]
  deckName: string

  achievement: Achievement

  // Optional images
  deckImage?: string
  rewardImage?: string

  rounds: MatchRound[]
}