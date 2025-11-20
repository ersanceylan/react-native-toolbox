import { MovingEffect } from "@/components/animatedText/MovingEffect";
import { StyleSheet, View } from "react-native";

export default function MovingEffectShowcase() {
  return (
    <View style={styles.container}>
      <MovingEffect text="Hello, world!" />
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
