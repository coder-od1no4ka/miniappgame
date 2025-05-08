import { GameResult } from '@/types';
import { gifts } from './gifts';

export const gameResults: GameResult[] = [
  {
    id: '1',
    gameType: 'roulette',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    reward: gifts[0],
    starsWon: 0,
    starsLost: 10,
  },
  {
    id: '2',
    gameType: 'roulette',
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    reward: gifts[5],
    starsWon: 10,
    starsLost: 10,
  },
  {
    id: '3',
    gameType: 'durak',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    reward: null,
    starsWon: 25,
    starsLost: 0,
  },
  {
    id: '4',
    gameType: 'roulette',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    reward: gifts[2],
    starsWon: 0,
    starsLost: 10,
  },
  {
    id: '5',
    gameType: 'durak',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    reward: null,
    starsWon: 0,
    starsLost: 15,
  },
];