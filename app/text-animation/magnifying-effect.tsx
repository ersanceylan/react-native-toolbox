import { MagnifyingEffect } from "@/components/animatedText/MagnifyingEffect";
import { StyleSheet, View } from "react-native";

export default function MagnifyingEffectShowcase() {
  return (
    <View style={styles.container}>
      <MagnifyingEffect text="Hello, world!" />
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
