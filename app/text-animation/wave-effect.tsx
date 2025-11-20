import { WaveEffect } from "@/components/animatedText/WaveEffect";
import { StyleSheet, View } from "react-native";

export default function WaveEffectShowcase() {
  return (
    <View style={styles.container}>
      <WaveEffect text="Hello, world!" />
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
