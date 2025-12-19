import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const DOT_SIZE = 30;
const X_DISTANCE = 50;
const Y_DISTANCE = 50;

const LEADING_Z_INDEX = 100;

const BG_COLOR = "#0d0d0d";
const DOT_COLOR = "#4dd06a";

const DURATION = 600;

const UP_ANIMATION = withTiming(-Y_DISTANCE, { duration: DURATION / 2 });
const DOWN_ANIMATION = withTiming(0, { duration: DURATION / 2 });

export const LoadingBounce = () => {
  const leadingDotTranslateX = useSharedValue(0);
  const leadingDotTranslateY = useSharedValue(0);
  const blurProgress = useSharedValue(0);
  const spreadProgress = useSharedValue(0);

  const [targetPosition, setTargetPosition] = useState<number>(X_DISTANCE);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetPosition((prev) => prev * -1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    leadingDotTranslateX.value = withTiming(targetPosition, {
      duration: DURATION,
    });
    leadingDotTranslateY.value = withSequence(UP_ANIMATION, DOWN_ANIMATION);

    // SHADOW ANIMATION
    blurProgress.value = withSequence(
      // to top
      withTiming(40, { duration: DURATION / 2, easing: Easing.ease }),
      // to zero
      withTiming(0, { duration: DURATION / 2, easing: Easing.exp })
    );
    spreadProgress.value = withSequence(
      // to top
      withTiming(10, { duration: DURATION / 2, easing: Easing.ease }),
      // to zero
      withTiming(0, { duration: DURATION / 2, easing: Easing.exp })
    );
  }, [targetPosition]);

  const leadingDotStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: leadingDotTranslateX.value },
        { translateY: leadingDotTranslateY.value },
      ],
      boxShadow: `0 0 ${blurProgress.value} ${spreadProgress.value} ${DOT_COLOR}`,
    }),
    [leadingDotTranslateX]
  );

  return (
    <View style={style.container}>
      <View style={style.dotContainer}>
        <Animated.View style={[leadingDotStyle, style.dot]}></Animated.View>

        {Array.from({ length: 5 }).map((_, index) => (
          <ShadowDot
            key={`shadow${index}`}
            index={index}
            leadingDotPosition={targetPosition}
            color={DOT_COLOR}
          />
        ))}
      </View>
    </View>
  );
};

const ShadowDot = ({
  index,
  leadingDotPosition,
  color,
}: {
  index: number;
  leadingDotPosition: number;
  color: string;
}) => {
  const trailingDotTranslateX = useSharedValue(0);
  const trailingDotTranslateY = useSharedValue(0);

  useEffect(() => {
    trailingDotTranslateX.value = withDelay(
      (index + 1) * 50,
      withTiming(leadingDotPosition, {
        duration: DURATION,
      })
    );
    trailingDotTranslateY.value = withSequence(
      withDelay((index + 1) * 50, UP_ANIMATION),
      DOWN_ANIMATION
    );
  }, [leadingDotPosition]);

  const trailingDotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: trailingDotTranslateX.value },
      { translateY: trailingDotTranslateY.value },
      { scale: 1 - (index + 1) * 0.1 },
    ],
  }));

  return (
    <Animated.View
      style={[
        style.dot,
        trailingDotStyle,
        {
          backgroundColor: color,
          zIndex: LEADING_Z_INDEX - (index + 1),
          opacity: 1 - ((index + 1) * 0.2),
        },
      ]}
    ></Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
  },
  dotContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: DOT_COLOR,
    position: "absolute",
    zIndex: LEADING_Z_INDEX,
  },
});
