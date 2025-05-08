import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: '1',
    name: 'Common NFT',
    type: 'nft',
    rarity: 'common',
    imageUrl: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=200&auto=format&fit=crop',
    value: 10,
    dropChance: 30,
  },
  {
    id: '2',
    name: 'Uncommon NFT',
    type: 'nft',
    rarity: 'uncommon',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200&auto=format&fit=crop',
    value: 25,
    dropChance: 15,
  },
  {
    id: '3',
    name: 'Rare NFT',
    type: 'nft',
    rarity: 'rare',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=200&auto=format&fit=crop',
    value: 50,
    dropChance: 8,
  },
  {
    id: '4',
    name: 'Epic NFT',
    type: 'nft',
    rarity: 'epic',
    imageUrl: 'https://images.unsplash.com/photo-1646467860129-0a7e5e0c5d3f?q=80&w=200&auto=format&fit=crop',
    value: 100,
    dropChance: 3,
  },
  {
    id: '5',
    name: 'Legendary NFT',
    type: 'nft',
    rarity: 'legendary',
    imageUrl: 'https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?q=80&w=200&auto=format&fit=crop',
    value: 250,
    dropChance: 1,
  },
  {
    id: '6',
    name: '10 Stars',
    type: 'stars',
    rarity: 'common',
    imageUrl: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=200&auto=format&fit=crop',
    value: 10,
    dropChance: 20,
  },
  {
    id: '7',
    name: '25 Stars',
    type: 'stars',
    rarity: 'uncommon',
    imageUrl: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=200&auto=format&fit=crop',
    value: 25,
    dropChance: 10,
  },
  {
    id: '8',
    name: '50 Stars',
    type: 'stars',
    rarity: 'rare',
    imageUrl: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=200&auto=format&fit=crop',
    value: 50,
    dropChance: 5,
  },
  {
    id: '9',
    name: '100 Stars',
    type: 'stars',
    rarity: 'epic',
    imageUrl: 'https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=200&auto=format&fit=crop',
    value: 100,
    dropChance: 2,
  },
  {
    id: '10',
    name: 'Digital Sticker Pack',
    type: 'item',
    rarity: 'common',
    imageUrl: 'https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=200&auto=format&fit=crop',
    value: 5,
    dropChance: 6,
  },
];

export const getRarityColor = (rarity: Gift['rarity']) => {
  switch (rarity) {
    case 'common':
      return '#8A9AA9';
    case 'uncommon':
      return '#4AD8C7';
    case 'rare':
      return '#3B82F6';
    case 'epic':
      return '#8774E1';
    case 'legendary':
      return '#F59E0B';
    default:
      return '#8A9AA9';
  }
};