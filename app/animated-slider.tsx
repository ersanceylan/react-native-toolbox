import { AnimatedSlider } from "@/components/AnimatedSlider";
import { StyleSheet, View } from "react-native";

export default function AnimatedSliderShowcase() {
  return (
    <View style={styles.container}>
      <AnimatedSlider initialPosition={50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
