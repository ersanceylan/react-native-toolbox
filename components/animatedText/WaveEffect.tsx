import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export const WaveEffect = ({ text }: { text: string }) => {
  const [letters, setLetters] = useState<string[]>([]);

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
  const scale = useSharedValue(3);

  useEffect(() => {
    scale.value = withDelay(
      index * 50,
      withSpring(1, { damping: 10, stiffness: 100 })
    );
  }, []);

  const letterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
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
    gap: 10,
  },
});
