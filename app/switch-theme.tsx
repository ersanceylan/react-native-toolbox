import { SwitchThemeComponent } from "@/components/switch/SwitchTheme";
import { SwitchThemeBulb } from "@/components/switch/SwitchThemeLightBulb";
import { StyleSheet, View } from "react-native";

export default function SwitchShowcase() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SwitchThemeBulb />
      </View>
      <View style={{ flex: 1 }}>
        <SwitchThemeComponent />
      </View>
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
    padding: 50,
  },
});
