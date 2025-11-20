import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { router, Stack, usePathname } from "expo-router";
import { Pressable, View } from "react-native";

export default function TextAnimationLayout() {
  const pathname = usePathname();

  const handleRefresh = () => {
    router.replace(pathname as any);
  };

  return (
    <>
      <Stack />

      <View
        style={{
          position: "absolute",
          bottom: 30,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={handleRefresh}
          style={{
            backgroundColor: "#8d820c",
            padding: 10,
            borderRadius: 100,
          }}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
}
