import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const ShiningEffect = ({ text }: { text: string }) => {
  const [letters, setLetters] = useState<string[]>([]);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLetters(text.split(""));
    }, 500);
  }, [text]);

  if (letters.length === 0) {
    return (
      <View style={styles.lettersContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.lettersContainer}>
      {letters.map((letter, index) => (
        <AnimatedLetter key={index} letter={letter} index={index} />
      ))}
    </View>
  );
};

const AnimatedLetter = ({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) => {
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withDelay(
      index * 30,
      withTiming(1, { duration: 200 })
    );
  }, []);

  const letterStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      colorProgress.value,
      [0, 0.5, 1],
      ["#000000", "#ffffff", "#000000"]
    ),
  }));

  return (
    <Animated.Text style={[letterStyle, { fontSize: 30 }]}>
      {letter}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  lettersContainer: {
    flexDirection: "row",
  },
});
