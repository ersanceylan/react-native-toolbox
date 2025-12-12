import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const DOT_SIZE = 30;
const X_DISTANCE = 50;
const Y_DISTANCE = 50;

const BG_COLOR = "#0d0d0d";
const DOT_COLOR = "#4dd06a";

export const LoadingBounce = () => {
  const leadingDotTranslateX = useSharedValue(0);
  const leadingDotTranslateY = useSharedValue(0);
  const blurProgress = useSharedValue(0);
  const spreadProgress = useSharedValue(0);

  const [targetPosition, setTargetPosition] = useState(X_DISTANCE);

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
      duration: 600,
    });
    leadingDotTranslateY.value = withSequence(
      // to top
      withTiming(-Y_DISTANCE, { duration: 300 }),
      withTiming(0, { duration: 300 })
      // to zero
    );
    blurProgress.value = withSequence(
      // to top
      withTiming(20, { duration: 300 }),
      withTiming(0, { duration: 300 })
      // to zero
    );
    spreadProgress.value = withSequence(
      // to top
      withTiming(3, { duration: 300 }),
      withTiming(0, { duration: 300 })
      // to zero
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
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BG_COLOR,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            leadingDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              backgroundColor: DOT_COLOR,
              borderRadius: 25,
              position: "absolute",
              zIndex: 100,
            },
          ]}
        ></Animated.View>

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

  const trailingDotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: trailingDotTranslateX.value },
      { translateY: trailingDotTranslateY.value },
      // { scale: 1 - index * 0.05 },
    ],
  }));

  useEffect(() => {
    trailingDotTranslateX.value = withDelay(
      50 + index * 50,
      withTiming(leadingDotPosition, {
        duration: 600,
      })
    );
    trailingDotTranslateY.value = withSequence(
      withDelay(50 + index * 50, withTiming(-Y_DISTANCE, { duration: 300 })),
      withTiming(0, {
        duration: 300,
      })
    );
  }, [leadingDotPosition]);

  return (
    <Animated.View
      style={[
        trailingDotStyle,
        {
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: 25,
          backgroundColor: color,
          position: "absolute",
          zIndex: 99 - index,
          opacity: 0.6 - index * 0.2,
        },
      ]}
    ></Animated.View>
  );
};
