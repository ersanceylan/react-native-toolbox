import { NegativeMaskEffect } from "@/components/animatedText/NegativeMaskEffect";
import { StyleSheet, View } from "react-native";

export default function NegativeMaskEffectShowcase() {
  return (
    <View style={styles.container}>
      <NegativeMaskEffect text="Hello" />
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
