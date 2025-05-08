import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/Button';
import { gifts, getRarityColor } from '@/mocks/gifts';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

export default function GiftDetailModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Find the gift by id, or use the first gift as fallback
  const gift = gifts.find(g => g.id === id) || gifts[0];
  
  const rarityColor = getRarityColor(gift.rarity);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: gift.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{gift.name}</Text>
        
        <View style={styles.detailsRow}>
          <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
            <Text style={styles.rarityText}>{gift.rarity.toUpperCase()}</Text>
          </View>
          
          <Text style={styles.type}>{gift.type.toUpperCase()}</Text>
          
          {gift.type === 'stars' && (
            <Text style={styles.value}>⭐ {gift.value}</Text>
          )}
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Drop Chance</Text>
            <Text style={styles.statValue}>{gift.dropChance}%</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Value</Text>
            <Text style={styles.statValue}>{gift.value} ⭐</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.description}>
          {gift.type === 'nft' 
            ? `This is a unique digital collectible NFT of ${gift.rarity} rarity. It can be traded or displayed in your collection.`
            : gift.type === 'stars'
            ? `A bundle of ${gift.value} stars that will be added to your balance. Stars can be used to spin the roulette or bet in games.`
            : `A special digital item that you can use in the app. Collect them all to unlock special features!`
          }
        </Text>
        
        <Button
          title="Close"
          onPress={() => {}}
          style={styles.button}
        />
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
    paddingBottom: theme.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: theme.spacing.lg,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rarityBadge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  rarityText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  type: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  value: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.md,
  },
});