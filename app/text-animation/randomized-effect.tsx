import { RandomizedEffect } from "@/components/animatedText/RandomizedEffect";
import { StyleSheet, View } from "react-native";

export default function RandomizedEffectShowcase() {
  return (
    <View style={styles.container}>
      <RandomizedEffect text="Hello" />
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
