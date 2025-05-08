import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Gift, Trophy, GamepadIcon, User } from "lucide-react";
import colors from "@/constants/Colors";
import { theme } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: colors.textPrimary,
      }}
    >
      <Tabs.Screen
        name="leaders"
        options={{
          title: "Leaders",
          tabBarIcon: ({ color }) => <Trophy size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => <GamepadIcon size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Roulette",
          tabBarIcon: ({ color }) => <Gift size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.divider,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  header: {
    backgroundColor: colors.background,
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
});