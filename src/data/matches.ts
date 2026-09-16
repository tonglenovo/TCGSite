import type { MatchEvent } from '../types/match'

export const matches: MatchEvent[] = [
  {
    id: 1,
    matchId: 'MAT-20260916-001',
    game: 'Gundam',

    date: '2026-09-16',
    location: 'HotSpot TCG',
    eventType: 'Shop Battle',

    result: 'win',
    score: '2-0',

    deckColors: ['blue', 'purple'],
    deckName: 'IBO SF',

    achievement: 'winner',

    deckImage: undefined,
    rewardImage: undefined,

    rounds: [
      {
        id: 1,
        opponent: 'LWJ',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'green'],
        deckName: 'OYNu',
      },
      {
        id: 2,
        opponent: 'Alyan',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'white'],
        deckName: 'Aggro Orb',
      },
    ],
  },

  {
    id: 2,
    matchId: 'MAT-20260913-001',
    game: 'Gundam',

    date: '2026-09-13',
    location: '1Collectibles',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '1-2',

    deckColors: ['blue', 'purple'],
    deckName: 'IBO SF',

    achievement: null,

    rounds: [
      {
        id: 1,
        opponent: 'Bye',
        result: 'win',
        score: '1-0',
        deckColors: ['white', 'white'],
        deckName: 'None',
      },
      {
        id: 2,
        opponent: 'JukeltheJester',
        result: 'loss',
        score: '0-1',
        deckColors: ['red', 'white'],
        deckName: 'Mobile Fighter',
      },
      {
        id: 3,
        opponent: 'LWJ',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'green'],
        deckName: 'OYNu',
      },
    ],
  },

  {
    id: 3,
    matchId: 'MAT-20260913-002',
    game: 'Gundam',

    date: '2026-09-13',
    location: 'Game Academia',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '2-1',

    deckColors: ['blue', 'purple'],
    deckName: 'IBO SF',

    achievement: null,

    rounds: [
      {
        id: 1,
        opponent: 'Desmond',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'white'],
        deckName: 'Blocker SF',
      },
      {
        id: 2,
        opponent: '[OPM] Lerz',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'purple'],
        deckName: 'Impulse IBO',
      },
      {
        id: 3,
        opponent: 'KaitoUryuu',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'red'],
        deckName: 'Phantom Pain',
      },
    ],
  },

  {
    id: 4,
    matchId: 'MAT-20260912-001',
    game: 'Gundam',

    date: '2026-09-12',
    location: 'Tefuda',
    eventType: '1st Anniversary Sealed Format Event',

    result: 'loss',
    score: '3-1',

    deckColors: ['blue', 'green'],
    deckName: 'Cyclops Team',

    achievement: null,

    rounds: [
      {
        id: 1,
        opponent: 'Ducky',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'white'],
        deckName: 'Blocker SF',
      },
      {
        id: 2,
        opponent: 'Rinka',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'white'],
        deckName: 'Aggro Orb',
      },
      {
        id: 3,
        opponent: 'Beaterator',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'purple'],
        deckName: 'IBO SF',
      },
      {
        id: 4,
        opponent: 'Tongwee',
        result: 'win',
        score: '1-0',
        deckColors: ['red', 'white'],
        deckName: 'Mobile Fighter',
      },
    ],
  },

  {
    id: 5,
    matchId: 'MAT-20260911-001',
    game: 'Gundam',

    date: '2026-09-11',
    location: 'Inferno Gaming',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '1-3',

    deckColors: ['blue', 'green'],
    deckName: 'Cyclops Team',

    achievement: null,

    rounds: [
      {
        id: 1,
        opponent: '[OPM] Lerz',
        result: 'loss',
        score: '0-1',
        deckColors: ['green', 'red'],
        deckName: 'Academy Ping',
      },
      {
        id: 2,
        opponent: 'Lowe',
        result: 'win',
        score: '1-0',
        deckColors: ['green', 'red'],
        deckName: 'Academy Ping',
      },
      {
        id: 3,
        opponent: '[OPM] Sheepie',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'green'],
        deckName: 'Londo',
      },
      {
        id: 4,
        opponent: '[OPM] TK',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'purple'],
        deckName: 'IBO SF',
      },
    ],
  },

  {
    id: 6,
    matchId: 'MAT-20260910-001',
    game: 'Gundam',

    date: '2026-09-10',
    location: 'Sentinel Game',
    eventType: 'Shop Battle',

    result: 'win',
    score: '2-0',

    deckColors: ['blue', 'white'],
    deckName: 'Blocker SF',

    achievement: 'winner',

    rounds: [
      {
        id: 1,
        opponent: 'LWJ',
        result: 'win',
        score: '1-0',
        deckColors: ['blue', 'green'],
        deckName: 'Londo Bell',
      },
      {
        id: 2,
        opponent: 'Andy',
        result: 'win',
        score: '1-0',
        deckColors: ['red', 'purple'],
        deckName: 'Impulse Ping',
      },
    ],
  },

  {
    id: 7,
    matchId: 'MAT-20260910-002',
    game: 'Gundam',

    date: '2026-09-10',
    location: 'Black Label',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '1-2',

    deckColors: ['red', 'white'],
    deckName: 'Mobile Fighter',

    achievement: null,

    rounds: [
      {
        id: 1,
        opponent: 'Puijh',
        result: 'loss',
        score: '0-1',
        deckColors: ['red', 'white'],
        deckName: 'Mobile Fighter',
      },
      {
        id: 2,
        opponent: 'FsGiAnT',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'green'],
        deckName: 'Londo Bell',
      },
      {
        id: 3,
        opponent: 'Bye',
        result: 'win',
        score: '1-0',
        deckColors: ['white', 'white'],
        deckName: 'None',
      },
    ],
  },

  {
    id: 8,
    matchId: 'MAT-20260909-001',
    game: 'Gundam',

    date: '2026-09-09',
    location: 'Hotspot TCG',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '0-1',

    deckColors: ['red', 'white'],
    deckName: 'Control Gq',

    achievement: 'lucky-draw',

    rounds: [
      {
        id: 1,
        opponent: 'G.M.',
        result: 'loss',
        score: '0-1',
        deckColors: ['blue', 'purple'],
        deckName: 'IBO SF',
      },
    ],
  },

  {
    id: 9,
    matchId: 'MAT-20260907-001',
    game: 'Gundam',

    date: '2026-09-07',
    location: 'Card Central',
    eventType: 'Shop Battle',

    result: 'loss',
    score: '1-1',

    deckColors: ['green', 'purple'],
    deckName: 'Aggro IBO Char',

    achievement: 'lucky-draw',

    rounds: [
      {
        id: 1,
        opponent: 'Edmund C',
        result: 'loss',
        score: '0-1',
        deckColors: ['green', 'purple'],
        deckName: 'Aggro IBO Char',
      },
      {
        id: 2,
        opponent: 'Hisqahn',
        result: 'win',
        score: '1-0',
        deckColors: ['green', 'purple'],
        deckName: 'Celestial Being',
      },
    ],
  },
]