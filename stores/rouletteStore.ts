import { create } from 'zustand';
import { Gift, RouletteState } from '@/types';
import { gifts } from '@/mocks/gifts';

interface RouletteStore {
  spinCost: number;
  availableGifts: Gift[];
  rouletteState: RouletteState;
  selectedGift: Gift | null;
  setRouletteState: (state: RouletteState) => void;
  setSelectedGift: (gift: Gift | null) => void;
  spinRoulette: () => Promise<Gift>;
}

export const useRouletteStore = create<RouletteStore>((set, get) => ({
  spinCost: 10,
  availableGifts: gifts,
  rouletteState: 'idle',
  selectedGift: null,
  
  setRouletteState: (state) => set({ rouletteState: state }),
  setSelectedGift: (gift) => set({ selectedGift: gift }),
  
  spinRoulette: async () => {
    set({ rouletteState: 'spinning' });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calculate result based on drop chances
    const random = Math.random() * 100;
    let cumulativeChance = 0;
    
    let selectedGift: Gift | null = null;
    
    for (const gift of get().availableGifts) {
      cumulativeChance += gift.dropChance;
      if (random <= cumulativeChance) {
        selectedGift = gift;
        break;
      }
    }
    
    // Fallback to first gift if somehow nothing was selected
    if (!selectedGift) {
      selectedGift = get().availableGifts[0];
    }
    
    set({ 
      selectedGift,
      rouletteState: 'result'
    });
    
    return selectedGift;
  }
}));