import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { RouletteWheel } from '@/components/RouletteWheel';
import { GiftCard } from '@/components/GiftCard';
import { Button } from '@/components/Button';
import { useRouletteStore } from '@/stores/rouletteStore';
import { useUserStore } from '@/stores/userStore';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';
import { Gift } from '@/types';

export default function RouletteScreen() {
  const { 
    availableGifts, 
    spinCost, 
    rouletteState, 
    selectedGift,
    setRouletteState,
    spinRoulette 
  } = useRouletteStore();
  
  const { 
    user, 
    addGift, 
    addStars, 
    removeStars, 
    incrementSpins,
    addGameResult 
  } = useUserStore();
  
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Sort gifts by drop chance (rarest first)
  const sortedGifts = [...availableGifts].sort((a, b) => a.dropChance - b.dropChance);
  
  const handleSpin = async () => {
    if (user.stars < spinCost) {
      Alert.alert('Not enough stars', `You need ${spinCost} stars to spin the roulette.`);
      return;
    }
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setIsSpinning(true);
    removeStars(spinCost);
    incrementSpins();
    
    try {
      const result = await spinRoulette();
      
      // Add the gift to user's collection
      addGift(result);
      
      // If the gift is stars, add them to user's balance
      if (result.type === 'stars') {
        addStars(result.value);
      }
      
      // Add game result to history
      addGameResult({
        id: Date.now().toString(),
        gameType: 'roulette',
        timestamp: Date.now(),
        reward: result,
        starsWon: result.type === 'stars' ? result.value : 0,
        starsLost: spinCost,
      });
      
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Error spinning roulette:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSpinning(false);
    }
  };
  
  const handleSpinComplete = (gift: Gift) => {
    setIsSpinning(false);
    setRouletteState('result');
  };
  
  const handleReset = () => {
    setRouletteState('idle');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={[colors.primary, 'transparent']}
        style={styles.topGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Gift Roulette</Text>
        <Text style={styles.subtitle}>Spin to win NFTs and Stars!</Text>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Balance:</Text>
        <Text style={styles.balanceValue}>⭐ {user.stars}</Text>
      </View>
      
      <View style={styles.rouletteContainer}>
        <RouletteWheel
          gifts={sortedGifts}
          spinning={isSpinning}
          onSpinComplete={handleSpinComplete}
          selectedGift={selectedGift}
        />
        
        {rouletteState === 'result' && selectedGift && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>You won!</Text>
            <GiftCard gift={selectedGift} size="large" />
            <Button 
              title="Spin Again" 
              onPress={handleReset} 
              style={styles.spinAgainButton}
            />
          </View>
        )}
        
        {rouletteState === 'idle' && (
          <Button
            title={`Spin (${spinCost} ⭐)`}
            onPress={handleSpin}
            disabled={user.stars < spinCost || isSpinning}
            loading={isSpinning}
            style={styles.spinButton}
            size="large"
          />
        )}
      </View>
      
      <View style={styles.oddsSection}>
        <Text style={styles.sectionTitle}>Drop Chances</Text>
        <View style={styles.oddsContainer}>
          {sortedGifts.slice(0, 5).map((gift) => (
            <View key={gift.id} style={styles.oddsItem}>
              <Text style={styles.oddsName}>{gift.name}</Text>
              <Text style={styles.oddsValue}>{gift.dropChance}%</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.giftsSection}>
        <Text style={styles.sectionTitle}>Available Gifts</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.giftsContainer}
        >
          {sortedGifts.map((gift) => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
              showDropChance
            />
          ))}
        </ScrollView>
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
    paddingBottom: theme.spacing.xxl,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    opacity: 0.2,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
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
  },
  balanceContainer: {
    ...globalStyles.spaceBetween,
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  balanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  rouletteContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  spinButton: {
    marginTop: theme.spacing.lg,
    width: 200,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: theme.spacing.md,
  },
  spinAgainButton: {
    marginTop: theme.spacing.lg,
  },
  oddsSection: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  oddsContainer: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  oddsItem: {
    ...globalStyles.spaceBetween,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  oddsName: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  oddsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  giftsSection: {
    marginBottom: theme.spacing.xl,
  },
  giftsContainer: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
});