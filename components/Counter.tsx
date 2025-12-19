import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const increaseBy = () => {
  return 1;
  // return Math.random() * 100;
};

export const Counter = () => {
  const [count, setCount] = useState<number>(124);

  const digits = count.toFixed(0).toString().split("").map(Number);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + increaseBy());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, style.container]}>
      <View style={style.digitsContainer}>
        {digits.map((digit, index) => (
          <DigitComp key={`${digit}_${index}`} digit={digit} />
        ))}
      </View>
    </View>
  );
};

const DURATION = 200;
const DISTANCE = 100;

const DigitComp = ({ digit }: { digit: number }) => {
  const translateY = useSharedValue(DISTANCE);

  useEffect(() => {
    // entering animation
    translateY.value = withTiming(0, {
      duration: DURATION,
      easing: Easing.ease,
    });

    return () => {
      // exiting animation!
    };
  }, []);

  const customExiting = (values) => {
    "worklet";

    const animations = {
      opacity: withTiming(0.5, { duration: DURATION }),
      transform: [
        {
          translateY: withTiming(-DISTANCE, { duration: DURATION }),
        },
      ],
    };
    const initialValues = {
      opacity: 1,
      transform: [{ translateY: 0 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      exiting={customExiting}
      style={[animatedStyle, style.digitContainer]}
    >
      <Text style={[style.number]}>{digit}</Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444442",
  },
  digitsContainer: {
    // width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: "#2b2a2a",
    borderRadius: 20,
    backgroundColor: "#515151",
    boxShadow: "0 0 30px 0 #2b2a2a inset",
  },
  digitContainer: {
    width: 50,
    height: 70,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    padding: 4,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textShadowColor: "#fffdfd",
  },
});
