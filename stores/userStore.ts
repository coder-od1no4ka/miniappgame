import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Gift, GameResult } from '@/types';
import { currentUser } from '@/mocks/users';
import { gameResults } from '@/mocks/gameResults';

interface UserState {
  user: User;
  gameHistory: GameResult[];
  addStars: (amount: number) => void;
  removeStars: (amount: number) => void;
  addGift: (gift: Gift) => void;
  addGameResult: (result: GameResult) => void;
  incrementSpins: () => void;
  incrementGameWins: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: currentUser,
      gameHistory: gameResults,
      addStars: (amount) => 
        set((state) => ({
          user: { ...state.user, stars: state.user.stars + amount }
        })),
      removeStars: (amount) => 
        set((state) => ({
          user: { ...state.user, stars: Math.max(0, state.user.stars - amount) }
        })),
      addGift: (gift) => 
        set((state) => ({
          user: { ...state.user, gifts: [...state.user.gifts, gift] }
        })),
      addGameResult: (result) => 
        set((state) => ({
          gameHistory: [result, ...state.gameHistory]
        })),
      incrementSpins: () => 
        set((state) => ({
          user: { ...state.user, spins: state.user.spins + 1 }
        })),
      incrementGameWins: () => 
        set((state) => ({
          user: { ...state.user, gameWins: state.user.gameWins + 1 }
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);