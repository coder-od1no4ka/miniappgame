import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Gift } from '@/types';
import { getRarityColor } from '@/mocks/gifts';
import { theme, globalStyles } from '@/constants/theme';
import colors from '@/constants/Colors';

interface GiftCardProps {
  gift: Gift;
  onPress?: () => void;
  showDropChance?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const GiftCard: React.FC<GiftCardProps> = ({ 
  gift, 
  onPress, 
  showDropChance = false,
  size = 'medium'
}) => {
  const styles = getStyles(size);
  
  return (
    <Pressable 
      style={[styles.container, onPress && styles.pressable]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: gift.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(gift.rarity) }]}>
          <Text style={styles.rarityText}>{gift.rarity.charAt(0).toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{gift.name}</Text>
        
        <View style={globalStyles.row}>
          {gift.type === 'stars' ? (
            <Text style={styles.value}>⭐ {gift.value}</Text>
          ) : (
            <Text style={styles.type}>{gift.type.toUpperCase()}</Text>
          )}
          
          {showDropChance && (
            <Text style={styles.dropChance}>{gift.dropChance}%</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const getStyles = (size: 'small' | 'medium' | 'large') => {
  const imageSizes = {
    small: 60,
    medium: 80,
    large: 120,
  };
  
  const fontSize = {
    small: {
      name: 12,
      value: 10,
      type: 10,
      dropChance: 10,
    },
    medium: {
      name: 14,
      value: 12,
      type: 12,
      dropChance: 12,
    },
    large: {
      name: 16,
      value: 14,
      type: 14,
      dropChance: 14,
    },
  };
  
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: theme.borderRadius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.cardBorder,
      width: size === 'small' ? 100 : size === 'medium' ? 140 : 180,
    },
    pressable: {
      opacity: 1,
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: imageSizes[size],
    },
    image: {
      width: '100%',
      height: '100%',
    },
    rarityBadge: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      width: 20,
      height: 20,
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rarityText: {
      color: colors.textPrimary,
      fontSize: 10,
      fontWeight: 'bold',
    },
    content: {
      padding: theme.spacing.sm,
    },
    name: {
      color: colors.textPrimary,
      fontSize: fontSize[size].name,
      fontWeight: '600',
      marginBottom: 4,
    },
    value: {
      color: colors.success,
      fontSize: fontSize[size].value,
      fontWeight: '500',
    },
    type: {
      color: colors.textSecondary,
      fontSize: fontSize[size].type,
    },
    dropChance: {
      color: colors.textSecondary,
      fontSize: fontSize[size].dropChance,
      marginLeft: 'auto',
    },
  });
};