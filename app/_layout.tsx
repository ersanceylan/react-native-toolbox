import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFillObject, { backgroundColor: "#000000" }]}
    >
      <StatusBar translucent barStyle={"light-content"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#000000" },
          headerTitle: "React Native Tools",
          headerTitleStyle: { color: "#ffffff" },
          headerRight: () => (
            <Link href="/profile">
              <MaterialCommunityIcons name="link" size={24} color="white" />
            </Link>
          ),
        }}
      />
    </SafeAreaView>
  );
}
