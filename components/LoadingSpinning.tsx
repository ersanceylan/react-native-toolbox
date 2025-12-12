import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DOT_SIZE = 30;
const X_DISTANCE = 50;
const Y_DISTANCE = 50;

const BG_COLOR = "#0d0d0d";
const FIRST_DOT_COLOR = "#4dd06a";
const SECOND_DOT_COLOR = "#4dd06aaa";

const INITIAL_DELAY = 1000;

const EASING = Easing.exp;

export const LoadingSpinning = () => {
  const pathname = usePathname();

  const handleRefresh = () => {
    router.replace(pathname as any);
  };

  const rotationProgress = useSharedValue(0);

  const firstDotScale = useSharedValue(1);
  const firstDotPositionY = useSharedValue(0);

  const secondDotScale = useSharedValue(1);
  const secondDotPositionX = useSharedValue(0);

  const thirdDotScale = useSharedValue(1);
  const thirdDotPositionY = useSharedValue(0);

  const fourthDotScale = useSharedValue(1);
  const fourthDotPositionX = useSharedValue(0);

  useEffect(() => {
    rotationProgress.value = withDelay(
      INITIAL_DELAY + 300 + 500,
      withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      )
    );

    firstDotScale.value = withSequence(
      // disappear
      withDelay(
        INITIAL_DELAY,
        withTiming(0, { duration: 300, easing: EASING })
      ),
      // appear on top
      withDelay(300, withTiming(1, { duration: 400, easing: Easing.bounce }))
    );
    firstDotPositionY.value = withDelay(
      INITIAL_DELAY + 300,
      withTiming(-DOT_SIZE, { duration: 500 })
    );

    secondDotScale.value = withSequence(
      withDelay(
        INITIAL_DELAY + 300,
        withTiming(0, { duration: 300, easing: EASING })
      ),
      withDelay(300, withTiming(1, { duration: 400, easing: Easing.bounce }))
    );
    secondDotPositionX.value = withDelay(
      INITIAL_DELAY + 300 + 500,
      withTiming(-DOT_SIZE, { duration: 500 })
    );

    thirdDotScale.value = withSequence(
      withDelay(
        INITIAL_DELAY + 300 + 300,
        withTiming(0, { duration: 300, easing: EASING })
      ),
      withDelay(600, withTiming(1, { duration: 400, easing: Easing.bounce }))
    );
    thirdDotPositionY.value = withDelay(
      INITIAL_DELAY + 300 + 300 + 500 + 500,
      withTiming(DOT_SIZE, { duration: 500 })
    );

    fourthDotScale.value = withSequence(
      withDelay(
        INITIAL_DELAY + 300 + 300 + 300,
        withTiming(0, { duration: 300, easing: EASING })
      ),
      withDelay(300, withTiming(1, { duration: 400, easing: Easing.bounce }))
    );
    fourthDotPositionX.value = withDelay(
      INITIAL_DELAY + 300 + 300 + 300 + 500 + 500 + 500,
      withTiming(DOT_SIZE, { duration: 500 })
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationProgress.value}deg` }],
  }));

  const firstDotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: firstDotScale.value },
      { translateY: firstDotPositionY.value },
    ],
  }));

  const secondDotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: secondDotScale.value },
      { translateX: secondDotPositionX.value },
    ],
  }));

  const thirdDotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: thirdDotScale.value },
      { translateY: thirdDotPositionY.value },
    ],
  }));

  const fourthDotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: fourthDotScale.value },
      { translateX: fourthDotPositionX.value },
    ],
  }));

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
      <Animated.View
        style={[
          containerStyle,
          {
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: "red",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Animated.View
          style={[
            firstDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              backgroundColor: FIRST_DOT_COLOR,
              borderRadius: 25,
              position: "absolute",
              zIndex: 100,
            },
          ]}
        ></Animated.View>

        <Animated.View
          style={[
            secondDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              backgroundColor: SECOND_DOT_COLOR,
              borderRadius: 25,
              position: "absolute",
              zIndex: 99,
            },
          ]}
        ></Animated.View>

        <Animated.View
          style={[
            thirdDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              backgroundColor: SECOND_DOT_COLOR,
              borderRadius: 25,
              position: "absolute",
              zIndex: 98,
            },
          ]}
        ></Animated.View>

        <Animated.View
          style={[
            fourthDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              backgroundColor: SECOND_DOT_COLOR,
              borderRadius: 25,
              position: "absolute",
              zIndex: 97,
            },
          ]}
        ></Animated.View>
      </Animated.View>

      <Pressable
        onPress={handleRefresh}
        style={{
          position: "absolute",
          bottom: 40,
          width: "90%",
          height: 40,
          backgroundColor: "red",
        }}
      >
        <MaterialCommunityIcons name="reload" color={"white"} />
      </Pressable>
    </View>
  );
};

const Dot = ({
  color,
  targetX,
}: {
  color: string;
  targetX: number;
  targetY: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({}));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: color,
          borderRadius: 25,
          position: "absolute",
          zIndex: 99,
        },
      ]}
    ></Animated.View>
  );
};
