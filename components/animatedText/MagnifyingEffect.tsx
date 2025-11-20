import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export const MagnifyingEffect = ({ text }: { text: string }) => {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLetters(text.split(""));
    }, 1000);
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
  const letterScale = useSharedValue(1);

  useEffect(() => {
    letterScale.value = withDelay(
      index * 50,
      withTiming(2, { duration: 200, easing: Easing.ease }, () => {
        letterScale.value = withTiming(1, {
          duration: 100,
          easing: Easing.exp,
        });
      })
    );
  }, []);

  const letterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: letterScale.value }],
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
    // gap: 10,
  },
});
