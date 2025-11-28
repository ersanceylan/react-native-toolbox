import { ShiningEffect } from "@/components/animatedText/ShiningEffect";
import { StyleSheet, View } from "react-native";

export default function ShiningEffectShowcase() {
  return (
    <View style={styles.container}>
      <ShiningEffect text="Thinking..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
