import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Gift } from '@/types';
import { theme } from '@/constants/theme';
import colors from '@/constants/Colors';

interface RouletteWheelProps {
  gifts: Gift[];
  spinning: boolean;
  onSpinComplete: (gift: Gift) => void;
  selectedGift: Gift | null;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 80;
const CONTAINER_WIDTH = width - 32; // Accounting for padding
const VISIBLE_ITEMS = Math.floor(CONTAINER_WIDTH / ITEM_WIDTH);

export const RouletteWheel: React.FC<RouletteWheelProps> = ({
  gifts,
  spinning,
  onSpinComplete,
  selectedGift,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<any>(null);

  // Create a repeating array of gifts for the infinite scroll effect
  const repeatedGifts = [...gifts, ...gifts, ...gifts, ...gifts, ...gifts];
  
  useEffect(() => {
    if (spinning) {
      // Start with a fast spin
      Animated.timing(scrollX, {
        toValue: repeatedGifts.length * ITEM_WIDTH,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        // If we have a selected gift, calculate its position and scroll to it
        if (selectedGift) {
          const selectedIndex = repeatedGifts.findIndex(g => g.id === selectedGift.id);
          if (selectedIndex !== -1) {
            // Center the selected gift
            const targetPosition = selectedIndex * ITEM_WIDTH - (CONTAINER_WIDTH / 2) + (ITEM_WIDTH / 2);
            
            // Slow down and stop at the selected gift
            Animated.timing(scrollX, {
              toValue: targetPosition,
              duration: 1000,
              easing: Easing.out(Easing.elastic(1)),
              useNativeDriver: true,
            }).start(() => {
              onSpinComplete(selectedGift);
            });
          }
        }
      });
    }
  }, [spinning, selectedGift]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent', colors.primary, 'transparent']}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 0.6, y: 0 }}
        style={styles.highlightGradient}
      />
      
      <View style={styles.wheelContainer}>
        <Animated.View
          style={[
            styles.itemsContainer,
            {
              transform: [{ translateX: Animated.multiply(scrollX, -1) }],
            },
          ]}
        >
          {repeatedGifts.map((gift, index) => (
            <View key={`${gift.id}-${index}`} style={styles.item}>
              <Image
                source={{ uri: gift.imageUrl }}
                style={styles.itemImage}
                contentFit="cover"
              />
            </View>
          ))}
        </Animated.View>
      </View>
      
      <View style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT + 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: theme.spacing.lg,
  },
  wheelContainer: {
    width: CONTAINER_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },
  itemsContainer: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs,
  },
  itemImage: {
    width: ITEM_WIDTH - 16,
    height: ITEM_HEIGHT - 16,
    borderRadius: theme.borderRadius.sm,
  },
  highlightGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    opacity: 0.5,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: ITEM_HEIGHT + 40,
    backgroundColor: colors.primary,
    zIndex: 20,
  },
});