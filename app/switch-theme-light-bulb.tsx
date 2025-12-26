import { SwitchThemeBulb } from "@/components/switch/SwitchThemeLightBulb";
import { StyleSheet, View } from "react-native";

export default function SwitchThemeLightBulbShowcase() {
  return (
    <View style={styles.container}>
      <SwitchThemeBulb />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
