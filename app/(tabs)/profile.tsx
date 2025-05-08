import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { UserAvatar } from '@/components/UserAvatar';
import { GiftCard } from '@/components/GiftCard';
import { GameHistoryItem } from '@/components/GameHistoryItem';
import { useUserStore } from '@/stores/userStore';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

export default function ProfileScreen() {
  const { user, gameHistory } = useUserStore();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <UserAvatar user={user} size={80} />
        
        <View style={styles.profileInfo}>
          <Text style={styles.username}>@{user.username}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stars}</Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.spins}</Text>
              <Text style={styles.statLabel}>Spins</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.gameWins}</Text>
              <Text style={styles.statLabel}>Wins</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Collection</Text>
        
        {user.gifts.length > 0 ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.giftsContainer}
          >
            {user.gifts.map((gift, index) => (
              <GiftCard key={`${gift.id}-${index}`} gift={gift} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven't won any gifts yet. Try spinning the roulette!
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game History</Text>
        
        {gameHistory.length > 0 ? (
          gameHistory.slice(0, 5).map((result) => (
            <GameHistoryItem key={result.id} result={result} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No game history yet. Start playing to see your results here!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  profileInfo: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.divider,
    marginHorizontal: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  giftsContainer: {
    gap: theme.spacing.md,
  },
  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});