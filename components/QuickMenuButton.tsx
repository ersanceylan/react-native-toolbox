import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BUTTON_SIZE = 100;
const ITEM_SIZE = BUTTON_SIZE / 2;
const STARTING_ANGLE = 270;
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
  buttonColor = "#c84f17",
  itemColor = "#d78484",
}: {
  buttonColor: string;
  itemColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isOpen) {
      scale.value = withTiming(0.01, { duration: 1000, easing: Easing.ease });
    } else {
      scale.value = withTiming(1, { duration: 300, easing: Easing.ease });
    }
  }, [isOpen]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    transformOrigin: "center",
  }));

  return (
    <View style={styles.container}>
      <AnimatedPressable
        onPress={() => setIsOpen(true)}
        style={[
          styles.menuButton,
          containerStyle,
          { backgroundColor: buttonColor },
        ]}
      >
        <MaterialCommunityIcons name="plus" size={50} color="white" />
      </AnimatedPressable>

      <Pressable onPress={() => setIsOpen(false)} style={[styles.closeButton]}>
        <MaterialCommunityIcons name="close" size={50} color={buttonColor} />
      </Pressable>

      <View style={styles.itemsContainer}>
        {ITEMS.map((item, index) => (
          <QuickMenuButtonItem
            key={item.label}
            index={index}
            isOpen={isOpen}
            itemColor={itemColor}
          >
            <Text>{item.label}</Text>
          </QuickMenuButtonItem>
        ))}
      </View>
    </View>
  );
};

export const QuickMenuButtonItem = ({
  children,
  index,
  isOpen,
  itemColor,
}: {
  children: React.ReactNode;
  index: number;
  isOpen: boolean;
  itemColor: string;
}) => {
  const totalSpan = 180; // degrees from 270 to 90
  const step = ITEMS.length > 1 ? totalSpan / (ITEMS.length - 1) : 0;
  const angleInDegrees = (STARTING_ANGLE + index * step) % 360;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  const xPosition = useSharedValue(0);
  const yPosition = useSharedValue(0);

  const DISTANCE_FROM_CENTER = ITEM_SIZE + 50;

  useEffect(() => {
    if (isOpen) {
      xPosition.value = withDelay(
        index * 100,
        withSpring(Math.sin(angleInRadians) * DISTANCE_FROM_CENTER, {
          damping: 20,
          stiffness: 100,
        })
      );
      yPosition.value = withDelay(
        index * 100,
        withSpring(-(Math.cos(angleInRadians) * DISTANCE_FROM_CENTER), {
          damping: 20,
          stiffness: 100,
        })
      );
    } else {
      yPosition.value = withTiming(0, { duration: 300 });
      xPosition.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  const itemStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xPosition.value },
      { translateY: yPosition.value },
    ],
    transformOrigin: "center",
  }));

  return (
    <Animated.View
      style={[
        styles.quickMenuButtonItem,
        itemStyle,
        { backgroundColor: itemColor },
      ]}
    >
      {children}
    </Animated.View>
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
    borderWidth: 1,
    borderColor: "#2c3299",
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
