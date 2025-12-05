import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { GalleryObject } from ".";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const RadialGallery = ({
  images,
}: {
  images: GalleryObject[];
  aspectRatio?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translation = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // console.log("event", event.translationX);
      translation.value = clamp(
        event.translationX / (SCREEN_WIDTH / 4),
        -images.length + 1,
        images.length - 1
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) < SCREEN_WIDTH / 8) return;
      const direction = translation.value < 0 ? "right" : "left";
      // console.log("direction", direction);
      console.log("translation", translation.value);
      const step = clamp(
        Math.round(Math.abs(translation.value)),
        0,
        images.length - 1
      );
      console.log("currentIndex", currentIndex, "step", step);
      if (direction === "right") {
        scheduleOnRN(
          setCurrentIndex,
          clamp(currentIndex + step, 0, images.length - 1)
        );
      } else {
        scheduleOnRN(
          setCurrentIndex,
          clamp(currentIndex - step, 0, images.length - 1)
        );
      }

      translation.value = 0;
    });

  return (
    <GestureHandlerRootView style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          // backgroundColor: "#888888",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
              // overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {images.map((image, index) => (
              <GalleryItem
                key={image.id}
                index={index}
                translation={translation}
                currentIndex={currentIndex}
              >
                <Image
                  source={{ uri: image.image! }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </GalleryItem>
            ))}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const GalleryItem = ({
  children,
  currentIndex,
  index,
  translation,
}: {
  children: React.ReactNode;
  currentIndex: number;
  index: number;
  translation: SharedValue<number>;
}) => {
  const derivedRelativeIndex = useDerivedValue(() => {
    if (translation.value === 0) {
      return withTiming(index - currentIndex, {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
    }
    return index - currentIndex + translation.value;
  }, [translation, currentIndex]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${derivedRelativeIndex.value * 7}deg` },
      { translateY: -50 - Math.abs(derivedRelativeIndex.value) * 10 },
      { translateX: derivedRelativeIndex.value * 50 },
      { scale: 1 - Math.abs(derivedRelativeIndex.value) * 0.1 },
      // { skewY: `${derivedRelativeIndex.value * 10}deg` },
    ],
    zIndex:
      currentIndex === index
        ? 100
        : Math.abs(50 - Math.abs(index - currentIndex)),
  }));
  return (
    <Animated.View style={[styles.imageContainer, imageStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "50%",
    height: "auto",
    aspectRatio: 1080 / 1920,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4e4d4d",
    boxShadow: "0 0 30px 10px rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    transformOrigin: "center bottom",
    overflow: "hidden",
  },
});
