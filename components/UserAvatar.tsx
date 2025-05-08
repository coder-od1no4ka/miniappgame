import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { User } from '@/types';
import { theme } from '@/constants/theme';
import colors from '@/constants/Colors';

interface UserAvatarProps {
  user: User;
  showUsername?: boolean;
  showStars?: boolean;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  showUsername = false,
  showStars = false,
  size = 40 
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatarUrl }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
        transition={200}
      />
      
      {showUsername && (
        <View style={styles.textContainer}>
          <Text style={styles.username}>{user.username}</Text>
          
          {showStars && (
            <Text style={styles.stars}>⭐ {user.stars}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.surfaceLight,
  },
  textContainer: {
    marginLeft: theme.spacing.sm,
  },
  username: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  stars: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});