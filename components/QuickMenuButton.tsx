import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const BUTTON_SIZE = 100;
const ITEM_SIZE = BUTTON_SIZE / 2;
const STARTING_ANGLE = 270;
const TOTAL_SPAN_ANGLE = 180;
const SPIN_COUNT = 2;

const OPENING_DURATION = 500;
const CLOSING_DURATION = 300;

const ITEMS = [
  {
    label: "A",
    icon: "home",
  },
  {
    label: "B",
    icon: "settings",
  },
  {
    label: "C",
    icon: "menu",
  },
  {
    label: "D",
    icon: "menu",
  },
  {
    label: "E",
    icon: "menu",
  },
  {
    label: "F",
    icon: "menu",
  },
];

export const QuickMenuButton = ({
  buttonColor = "#008545",
  itemColor = "#02351cff",
}: {
  buttonColor?: string;
  itemColor?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const rotation = useSharedValue(0);
  const buttonProgress = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      rotation.value = withTiming(
        (SPIN_COUNT * 360) + 45,
        { duration: OPENING_DURATION, easing: Easing.ease }
      );
      buttonProgress.value = withTiming(1, {
        duration: OPENING_DURATION,
        easing: Easing.ease,
      });
    } else {
      rotation.value = withTiming(0,
        { duration: CLOSING_DURATION, easing: Easing.ease }
      );
      buttonProgress.value = withTiming(0, {
        duration: CLOSING_DURATION,
        easing: Easing.ease,
      });
    }
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    backgroundColor: interpolateColor(
      buttonProgress.value,
      [0, 1],
      [buttonColor, "transparent"]
    ),
    transformOrigin: "center",
  }));

  const animatedProps = useAnimatedProps(() => ({
    color: interpolateColor(
      buttonProgress.value,
      [0, 1],
      [itemColor, buttonColor]
    )
  }));

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={toggle}
        style={[styles.menuButton, containerStyle]}
      >
        <AnimatedIcon name="plus" size={50} animatedProps={animatedProps} />
      </AnimatedPressable>


      <View style={styles.itemsContainer}>
        {ITEMS.map((item, index) => {
          const step = ITEMS.length > 1 ? TOTAL_SPAN_ANGLE / (ITEMS.length - 1) : 0;
          const angleInRadians = (((STARTING_ANGLE + index * step) % 360) * Math.PI) / 180;

          return (
            <QuickMenuButtonItem
              key={item.label}
              index={index}
              isOpen={isOpen}
              buttonColor={buttonColor}
              itemColor={itemColor}
              angleInRadians={angleInRadians}
            >
              <Text style={{ color: itemColor }}>{item.label}</Text>
            </QuickMenuButtonItem>
          )
        })}
      </View>
    </View>
  );
};

const SPRING_CONFIG = {
  stiffness: 1620,
  damping: 85,
  mass: 5,
  overshootClamping: false,
  energyThreshold: 1e-12,
  velocity: 0,
  reduceMotion: ReduceMotion.System,
}
export const QuickMenuButtonItem = ({
  children,
  index,
  isOpen,
  buttonColor,
  itemColor,
  angleInRadians,
}: {
  children: React.ReactNode;
  index: number;
  isOpen: boolean;
  buttonColor: string;
  itemColor: string;
  angleInRadians: number;
}) => {

  const xPosition = useSharedValue(0);
  const yPosition = useSharedValue(0);
  const backgroundProgress = useSharedValue(0);

  const r = ITEM_SIZE + 50;

  useEffect(() => {
    if (isOpen) {
      xPosition.value = withDelay(
        index * 50,
        withSpring(Math.sin(angleInRadians) * r, SPRING_CONFIG)
      );
      yPosition.value = withDelay(
        index * 50,
        withSpring(-(Math.cos(angleInRadians) * r), SPRING_CONFIG)
      );
      backgroundProgress.value = withDelay(
        index * 50,
        withTiming(1, {
          duration: OPENING_DURATION,
          easing: Easing.ease,
        })
      );
    } else {
      yPosition.value = withTiming(0, { duration: CLOSING_DURATION });
      xPosition.value = withTiming(0, { duration: CLOSING_DURATION });
      backgroundProgress.value = withTiming(0, { duration: CLOSING_DURATION });
    }
  }, [isOpen]);

  const scaleProgress = useSharedValue(1);
  const onPress = useCallback(() => {
    scaleProgress.value = withTiming(1.2, {
      duration: 100,
      easing: Easing.exp,
    }, () => {
      scaleProgress.value = withTiming(1, {
        duration: 100,
        easing: Easing.exp,
      });
    });
  }, []);

  const itemStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPosition.value },
      { translateY: yPosition.value },
      { scale: scaleProgress.value },
    ],
    backgroundColor: interpolateColor(
      backgroundProgress.value,
      [0, 1],
      [itemColor, buttonColor]
    ),
    boxShadow: `0px 0px ${Math.abs(scaleProgress.value - 1) * 100}px 0px ${buttonColor}`,
    transformOrigin: "center",
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.quickMenuButtonItem,
        itemStyle,
      ]}
    >
      {children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  menuButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    zIndex: 101,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  icon: {
    width: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  itemsContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    zIndex: 99,
  },
  quickMenuButtonItem: {
    position: "absolute",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
});
