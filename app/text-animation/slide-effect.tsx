import { SlideEffect } from "@/components/animatedText/SlideEffect";
import { StyleSheet, View } from "react-native";

export default function SlideEffectShowcase() {
  return (
    <View style={styles.container}>
      <SlideEffect text="Hello, world!" />
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
