import { User } from '@/types';
import { gifts } from './gifts';

export const users: User[] = [
  {
    id: '1',
    username: 'crypto_king',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    stars: 1250,
    spins: 78,
    gifts: [gifts[0], gifts[2], gifts[5]],
    gameWins: 12,
  },
  {
    id: '2',
    username: 'nft_collector',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    stars: 980,
    spins: 65,
    gifts: [gifts[1], gifts[3], gifts[6], gifts[9]],
    gameWins: 8,
  },
  {
    id: '3',
    username: 'lucky_star',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    stars: 2100,
    spins: 120,
    gifts: [gifts[4], gifts[7], gifts[8]],
    gameWins: 25,
  },
  {
    id: '4',
    username: 'digital_nomad',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
    stars: 750,
    spins: 42,
    gifts: [gifts[0], gifts[5], gifts[9]],
    gameWins: 5,
  },
  {
    id: '5',
    username: 'blockchain_guru',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    stars: 1800,
    spins: 95,
    gifts: [gifts[2], gifts[3], gifts[6], gifts[8]],
    gameWins: 18,
  },
  {
    id: '6',
    username: 'meta_explorer',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    stars: 1350,
    spins: 82,
    gifts: [gifts[1], gifts[4], gifts[7]],
    gameWins: 14,
  },
];

export const currentUser: User = {
  id: '7',
  username: 'telegram_user',
  avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop',
  stars: 500,
  spins: 25,
  gifts: [gifts[0], gifts[5]],
  gameWins: 3,
};