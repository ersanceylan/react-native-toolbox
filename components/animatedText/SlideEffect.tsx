import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const SlideEffect = ({ text }: { text: string }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(1, { duration: 1000 });
    }, 500);
  }, []);

  const textStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 0.5],
          [-400, 0],
          "clamp"
        ) as number,
      },
      {
        skewX: `${
          interpolate(
            progress.value,
            [0, 0.5, 0.8, 1],
            [15, 15, -15, 0],
            "clamp"
          ) as number
        }deg`,
      },
    ],
    transformOrigin: "bottom right",
  }));

  return (
    <View style={styles.lettersContainer}>
      <Animated.Text style={[textStyle, { fontSize: 30 }]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lettersContainer: {
    flexDirection: "row",
  },
});
