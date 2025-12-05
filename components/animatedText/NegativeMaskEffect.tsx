import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const MASK_COLOR = "#ffffff";
const BASE_COLOR = "#222";

export const NegativeMaskEffect = ({ text }: { text: string }) => {
  const maskContainerPositionX = useSharedValue(0);
  const maskContainerPositionY = useSharedValue(0);
  const maskContainerScale = useSharedValue(0);

  useEffect(() => {
    maskContainerPositionX.value = withDelay(
      2000,
      withSequence(
        withTiming(150, { duration: 1000 }),
        withTiming(0, { duration: 1000 }),
        withTiming(30, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      )
    );
    maskContainerPositionY.value = withDelay(
      2000,
      withTiming(0, { duration: 1000 })
    );
    maskContainerScale.value = withDelay(
      1000,
      withSpring(1, { damping: 30, stiffness: 200 })
    );
  }, []);

  const maskedTextContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: maskContainerPositionX.value },
      { translateY: maskContainerPositionY.value },
      { scale: maskContainerScale.value },
    ],
  }));

  const maskedTextStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -maskContainerPositionX.value },
      { translateY: -maskContainerPositionY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.originalTextContainer}>
        <Text style={[styles.originalText, { color: BASE_COLOR }]}>{text}</Text>
      </View>
      <Animated.View
        style={[styles.maskedTextContainer, maskedTextContainerStyle]}
      >
        <Animated.Text
          style={[styles.maskedText, { color: MASK_COLOR }, maskedTextStyle]}
        >
          {text}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  originalTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  maskedTextContainer: {
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    borderRadius: 100,
    width: "20%",
    height: "20%",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  originalText: {
    width: 300,
    height: 300,
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000",
  },
  maskedText: {
    width: 300,
    height: 300,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 50,
    fontWeight: "bold",
  },
});
