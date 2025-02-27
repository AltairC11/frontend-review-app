import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { Compass, Focus, House, User } from "@tamagui/lucide-icons";
import Header from "@/components/Header";
import { useTheme } from "tamagui";
import ProfileHeader from "@/components/ProfileHeader";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      tabBar={(p) => <TabBar {...p} />}
      screenOptions={{
        header: () => <Header />,
        sceneStyle: { backgroundColor: theme.background.get() },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ size, color, focused }) => (
            <House size={`${size}px`} color={focused ? "$green11" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <Compass size={`${size}px`} color={focused ? "$green11" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Reconocer",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <Focus size={`${size}px`} color={focused ? "$green11" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          header: () => <ProfileHeader />,
          tabBarIcon: ({ size, color, focused }) => (
            <User size={`${size}px`} color={focused ? "$green11" : color} />
          ),
        }}
      />
    </Tabs>
  );
}
