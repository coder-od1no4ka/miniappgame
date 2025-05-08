export type Gift = {
    id: string;
    name: string;
    type: 'nft' | 'stars' | 'item';
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    imageUrl: string;
    value: number; // For stars, this is the amount. For NFTs, this could be estimated value
    dropChance: number; // Percentage chance of dropping (0-100)
  };
  
  export type User = {
    id: string;
    username: string;
    avatarUrl: string;
    stars: number;
    spins: number;
    gifts: Gift[];
    gameWins: number;
  };
  
  export type LeaderboardEntry = {
    user: User;
    score: number; // Could be gifts count, spins count, etc.
  };
  
  export type GameResult = {
    id: string;
    gameType: 'roulette' | 'durak';
    timestamp: number;
    reward: Gift | null;
    starsWon: number;
    starsLost: number;
  };
  
  export type RouletteState = 'idle' | 'spinning' | 'result';