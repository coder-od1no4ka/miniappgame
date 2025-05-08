import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';
import { Button } from '@/components/Button';

export default function GamesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Games</Text>
      <Text style={styles.subtitle}>Play games to win more stars!</Text>
      
      <View style={styles.gameCard}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gameCardGradient}
        />
        
        <View style={styles.gameCardContent}>
          <Text style={styles.gameCardTitle}>Durak Card Game</Text>
          <Text style={styles.gameCardDescription}>
            Play the classic Russian card game against other players. Bet stars and win big!
          </Text>
          
          <View style={styles.gameCardDetails}>
            <View style={styles.gameCardDetail}>
              <Text style={styles.gameCardDetailLabel}>Min Bet</Text>
              <Text style={styles.gameCardDetailValue}>10 ⭐</Text>
            </View>
            
            <View style={styles.gameCardDetail}>
              <Text style={styles.gameCardDetailLabel}>Max Players</Text>
              <Text style={styles.gameCardDetailValue}>4</Text>
            </View>
            
            <View style={styles.gameCardDetail}>
              <Text style={styles.gameCardDetailLabel}>Game Time</Text>
              <Text style={styles.gameCardDetailValue}>~10 min</Text>
            </View>
          </View>
          
          <Button
            title="Play Now"
            onPress={() => {}}
            style={styles.playButton}
          />
        </View>
        
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=200&auto=format&fit=crop' }}
          style={styles.gameCardImage}
        />
      </View>
      
      <View style={styles.comingSoonSection}>
        <Text style={styles.comingSoonTitle}>Coming Soon</Text>
        
        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonCardTitle}>Poker</Text>
          <Text style={styles.comingSoonCardDescription}>
            Texas Hold'em poker with star betting. Challenge your friends and win big pots!
          </Text>
        </View>
        
        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonCardTitle}>Blackjack</Text>
          <Text style={styles.comingSoonCardDescription}>
            Classic casino card game. Get as close to 21 as possible without going over.
          </Text>
        </View>
        
        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonCardTitle}>Slots</Text>
          <Text style={styles.comingSoonCardDescription}>
            Spin the reels and match symbols to win stars and exclusive NFTs.
          </Text>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  gameCard: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    height: 300,
    position: 'relative',
  },
  gameCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gameCardContent: {
    padding: theme.spacing.lg,
    height: '100%',
    justifyContent: 'space-between',
  },
  gameCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  gameCardDescription: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: theme.spacing.lg,
    maxWidth: '70%',
  },
  gameCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  gameCardDetail: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  gameCardDetailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  gameCardDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  gameCardImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
  playButton: {
    alignSelf: 'flex-start',
  },
  comingSoonSection: {
    marginBottom: theme.spacing.xl,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  comingSoonCard: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  comingSoonCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  comingSoonCardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});