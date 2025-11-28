import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BEZIER_CURVE = Easing.bezier(0.76, 0, 0.24, 1);

export const CustomSwitch = ({
  value = false,
  disabledColor = "#b8b8b8",
  enabledColor = "#82a90c",
}: {
  value?: boolean;
  disabledColor?: string;
  enabledColor?: string;
}) => {
  const [isOn, setIsOn] = useState(value);

  const [justifyContent, setJustifyContent] = useState<
    "flex-start" | "flex-end"
  >(value ? "flex-end" : "flex-start");
  const switchThumbWidth = useSharedValue(50);
  const colorProgress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    if (isOn) {
      colorProgress.value = withTiming(1, {
        duration: 1000,
      });
    } else {
      colorProgress.value = withTiming(0, {
        duration: 1000,
      });
    }

    switchThumbWidth.value = withSequence(
      withTiming(
        100,
        {
          duration: 500,
          easing: BEZIER_CURVE,
        },
        () => {
          scheduleOnRN(setJustifyContent, isOn ? "flex-end" : "flex-start");
        }
      ),
      withTiming(50, {
        duration: 500,
        easing: BEZIER_CURVE,
      })
    );
  }, [isOn]);

  const switchThumbBackgroundStyle = useAnimatedStyle(() => ({
    width: `${switchThumbWidth.value}%`,
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [disabledColor, enabledColor]
    ),
  }));

  const switchStyle = useAnimatedStyle(() => ({
    justifyContent: justifyContent,
    borderColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      [disabledColor, enabledColor]
    ),
  }));

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={() => setIsOn(!isOn)}
        style={[styles.switch, switchStyle]}
      >
        <Animated.View
          style={[styles.switchThumbBackground, switchThumbBackgroundStyle]}
        />
        {/* <View style={styles.switchThumbTextContainer}>
          <Text style={styles.switchThumb}>OFF</Text>
          <Text style={styles.switchThumb}>ON</Text>
        </View> */}
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 100,
    padding: 5,
  },
  switch: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchThumb: {
    fontSize: 12,
    color: "#000",
  },
  switchThumbBackground: {
    position: "absolute",
    width: "50%",
    height: "100%",
    borderRadius: 100,
  },
  switchThumbTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
});
