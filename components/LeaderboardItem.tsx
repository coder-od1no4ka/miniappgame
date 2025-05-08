import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserAvatar } from './UserAvatar';
import { LeaderboardEntry } from '@/types';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  rank: number;
  scoreLabel: string;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ 
  entry, 
  rank,
  scoreLabel
}) => {
  const getRankColor = () => {
    switch (rank) {
      case 1:
        return '#F59E0B'; // Gold
      case 2:
        return '#94A3B8'; // Silver
      case 3:
        return '#B45309'; // Bronze
      default:
        return colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.rankContainer, { backgroundColor: getRankColor() }]}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      
      <UserAvatar 
        user={entry.user} 
        showUsername 
        size={36}
      />
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreValue}>{entry.score}</Text>
        <Text style={styles.scoreLabel}>{scoreLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.spaceBetween,
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rankText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scoreLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});