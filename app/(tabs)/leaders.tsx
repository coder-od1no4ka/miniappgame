import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LeaderboardItem } from '@/components/LeaderboardItem';
import { users } from '@/mocks/users';
import { User, LeaderboardEntry } from '@/types';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

type LeaderboardType = 'gifts' | 'spins';

export default function LeadersScreen() {
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>('gifts');
  
  const getLeaderboardData = (): LeaderboardEntry[] => {
    if (leaderboardType === 'gifts') {
      return users
        .map(user => ({
          user,
          score: user.gifts.length,
        }))
        .sort((a, b) => b.score - a.score);
    } else {
      return users
        .map(user => ({
          user,
          score: user.spins,
        }))
        .sort((a, b) => b.score - a.score);
    }
  };
  
  const leaderboardData = getLeaderboardData();
  
  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <LeaderboardItem 
      entry={item} 
      rank={index + 1} 
      scoreLabel={leaderboardType === 'gifts' ? 'gifts' : 'spins'}
    />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            leaderboardType === 'gifts' && styles.activeFilterButton,
          ]}
          onPress={() => setLeaderboardType('gifts')}
        >
          <Text
            style={[
              styles.filterText,
              leaderboardType === 'gifts' && styles.activeFilterText,
            ]}
          >
            Most Gifts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            leaderboardType === 'spins' && styles.activeFilterButton,
          ]}
          onPress={() => setLeaderboardType('spins')}
        >
          <Text
            style={[
              styles.filterText,
              leaderboardType === 'spins' && styles.activeFilterText,
            ]}
          >
            Most Spins
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.user.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.title}>
            {leaderboardType === 'gifts' ? 'Top Gift Collectors' : 'Top Spinners'}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No data available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  filterButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: colors.textPrimary,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});