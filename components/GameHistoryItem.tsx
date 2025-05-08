import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameResult } from '@/types';
import { GiftCard } from './GiftCard';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

interface GameHistoryItemProps {
  result: GameResult;
}

export const GameHistoryItem: React.FC<GameHistoryItemProps> = ({ result }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getGameTypeLabel = () => {
    switch (result.gameType) {
      case 'roulette':
        return 'Roulette Spin';
      case 'durak':
        return 'Durak Card Game';
      default:
        return 'Game';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.gameType}>{getGameTypeLabel()}</Text>
        <Text style={styles.date}>{formatDate(result.timestamp)}</Text>
      </View>
      
      <View style={styles.content}>
        {result.reward ? (
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardLabel}>Won:</Text>
            <GiftCard gift={result.reward} size="small" />
          </View>
        ) : (
          <View />
        )}
        
        <View style={styles.starsContainer}>
          {result.starsWon > 0 && (
            <Text style={styles.starsWon}>+{result.starsWon} ⭐</Text>
          )}
          {result.starsLost > 0 && (
            <Text style={styles.starsLost}>-{result.starsLost} ⭐</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    ...globalStyles.spaceBetween,
    marginBottom: theme.spacing.sm,
  },
  gameType: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  content: {
    ...globalStyles.spaceBetween,
    alignItems: 'flex-start',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    color: colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  starsContainer: {
    alignItems: 'flex-end',
  },
  starsWon: {
    color: colors.success,
    fontWeight: '600',
    fontSize: 16,
  },
  starsLost: {
    color: colors.error,
    fontWeight: '600',
    fontSize: 16,
  },
});