import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DOT_SIZE = 30;

export const LoadingComponent = () => {
  const leadingDotTranslateX = useSharedValue(0);

  const trailingDotTranslateX = useSharedValue(0);

  const rubberBandContainerWidth = useSharedValue(DOT_SIZE / 2);
  // const rubberBandContainerRotation = useSharedValue(DOT_SIZE / 2);

  // const rubberBandTranslateX = useSharedValue(0);
  // const rubberBandWidth = useSharedValue(0);
  // const rubberBandHeight = useSharedValue(DOT_SIZE / 2);

  useEffect(() => {
    setTimeout(() => {
      leadingDotTranslateX.value = withTiming(
        100,
        {
          duration: 1000,
          easing: Easing.exp,
        },
        () => {
          trailingDotTranslateX.value = withSpring(100, {
            damping: 20,
            stiffness: 100,
          });
        }
      );
      rubberBandContainerWidth.value = withTiming(100, {
        duration: 1000,
        easing: Easing.exp,
      });
    }, 1000);
  }, []);

  const leadingDotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leadingDotTranslateX.value }],
  }));

  const trailingDotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: trailingDotTranslateX.value }],
  }));

  const rubberBandContainerStyle = useAnimatedStyle(() => ({
    // transform: [{ rotate: "180deg" }],
    width: rubberBandContainerWidth.value,
  }));

  // const rubberBandStyle = useAnimatedStyle(() => ({
  //   width: rubberBandWidth.value,
  //   height: rubberBandHeight.value,
  //   transform: [{ translateX: rubberBandTranslateX.value }],
  //   transformOrigin: "left center",
  // }));

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 100,
          borderWidth: 1,
          borderColor: "black",
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
              borderRadius: 25,
              backgroundColor: "blue",
              position: "absolute",
              zIndex: 3,
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            trailingDotStyle,
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: 25,
              backgroundColor: "red",
              position: "absolute",
              zIndex: 2,
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            {
              width: 10,
              height: "100%",
              borderWidth: 1,
              borderColor: "red",
              position: "absolute",
              left: SCREEN_WIDTH / 2 - 5,
              zIndex: 1,
            },
            rubberBandContainerStyle,
          ]}
        >
          {/* <Animated.View style={rubberBandStyle}></Animated.View> */}
        </Animated.View>
      </View>

      {/* <Animated.View
        style={[
          {
            marginTop: 100,
            width: 50,
            height: 10,
            backgroundColor: "green",
            // position: "absolute",
            // left: SCREEN_WIDTH / 2,
            borderRightWidth: 10,
            borderRightColor: "red",
            zIndex: 1,
            transform: [{ rotate: "180deg" }],
          },
          // rubberBandrStyle,
        ]}
      ></Animated.View> */}
    </View>
  );
};
