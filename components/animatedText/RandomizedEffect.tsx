import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const RandomizedEffect = ({ text }: { text: string }) => {
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
        <AnimatedLetter key={`letter-${index}`} letter={letter} index={index} />
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
  const [currentLetter, setCurrentLetter] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLetter = String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
      );
      if (randomLetter !== letter) {
        setCurrentLetter(randomLetter);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setCurrentLetter(letter);
    }, index * 100 + 1000);
  }, []);

  return (
    <View style={styles.letter}>
      <Text style={styles.letterText}>{currentLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lettersContainer: {
    flexDirection: "row",
    // gap: 10,
  },
  letter: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  letterText: {
    fontSize: 30,
  },
});
