import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const TRACK_RADIUS = 20;
const INITIAL_TRACK_POSITION = TRACK_RADIUS / 2;
const THUMB_WIDTH = 20;

export const AnimatedSlider = ({
  initialPosition = INITIAL_TRACK_POSITION,
}: {
  initialPosition: number;
}) => {
  const [percentageValue, setPercentageValue] = useState(0);

  const [trackWidth, setTrackWidth] = useState(0);

  const sliderThumbPosition = useSharedValue(initialPosition);
  const sliderTrackPosition = useSharedValue(0);

  const translation = useSharedValue(0);

  useEffect(() => {
    if (trackWidth === 0) return;

    sliderTrackPosition.value = withSpring(
      (sliderThumbPosition.value / (trackWidth - THUMB_WIDTH / 2)) * 100,
      {
        damping: 20,
        stiffness: 200,
      }
    );
    const percentage =
      (sliderThumbPosition.value / (trackWidth - THUMB_WIDTH / 2)) * 100;
    setPercentageValue(Number(percentage.toFixed(0)));
  }, [trackWidth]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translation.value = event.translationX;
    })
    .onEnd((event) => {
      const newPosition = clamp(
        sliderThumbPosition.value + translation.value,
        0,
        trackWidth - THUMB_WIDTH / 2
      );

      sliderThumbPosition.value = Number(newPosition.toFixed(0));
      const percentage =
        (sliderThumbPosition.value / (trackWidth - THUMB_WIDTH / 2)) * 100;

      if (percentage === 0) {
        sliderTrackPosition.value = 0;
      } else {
        sliderTrackPosition.value = withSpring(percentage, {
          damping: 20,
          stiffness: 200,
        });
      }

      scheduleOnRN(setPercentageValue, Number(percentage.toFixed(0)));
      translation.value = 0;
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
    left: sliderThumbPosition.value,
    // transformOrigin: "center center",
  }));

  const trackStyle = useAnimatedStyle(() => ({
    width: `${sliderTrackPosition.value}%`,
    backgroundColor: interpolateColor(
      sliderTrackPosition.value,
      [70, 100],
      ["green", "red"]
    ),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.sliderContainer}>
        <View
          onLayout={(event) => {
            setTrackWidth(event.nativeEvent.layout.width - THUMB_WIDTH);
          }}
          style={styles.sliderTrack}
        >
          <Animated.View
            style={[styles.sliderTrackInner, trackStyle]}
          ></Animated.View>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.sliderThumb, thumbStyle]}>
              {/* <View
                style={{ height: "100%", width: 3, backgroundColor: "red" }}
              ></View> */}
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
      <Text>{percentageValue}%</Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  sliderTrack: {
    width: "100%",
    height: "100%",
    borderRadius: TRACK_RADIUS,
    borderWidth: 5,
    borderColor: "#595959",
    overflow: "hidden",
    justifyContent: "center",
  },
  sliderTrackInner: {
    height: "100%",
  },
  sliderThumb: {
    position: "absolute",
    width: THUMB_WIDTH,
    borderRadius: 5,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
    height: "100%",
    borderWidth: 5,
    borderColor: "#595959",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
