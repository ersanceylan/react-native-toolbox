import { useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
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
const TRANSLATION_SPACING = SCREEN_WIDTH * 0.15;
const TRANSLATION_STEP = SCREEN_WIDTH / 12;

export const RadialGallery = ({ images }: { images: GalleryObject[]; }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translation = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translation.value = clamp(
        event.translationX / TRANSLATION_STEP,
        -(images.length - 1 - currentIndex) - 0.1,
        currentIndex + 0.1
      );
    })
    .onEnd((event) => {
      if (Math.round(Math.abs(translation.value)) === 0) {
        translation.value = 0;
        return;
      }

      const direction = translation.value < 0 ? "right" : "left";
      const step = clamp(
        Math.round(Math.abs(translation.value)),
        0,
        images.length - 1
      );
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
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.galleryContainer}>
          {images.map((image, index) => (
            <GalleryItem
              key={`${image.id}-${index}`}
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
        duration: 300,
        easing: Easing.ease,
      });
    }
    return index - currentIndex + translation.value;
  }, [translation, currentIndex]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${derivedRelativeIndex.value * 10}deg` },
      { translateY: -TRANSLATION_SPACING - Math.pow(derivedRelativeIndex.value, 2) * 5 },
      { translateX: derivedRelativeIndex.value * TRANSLATION_SPACING },
      { scale: 1 - Math.abs(derivedRelativeIndex.value) * 0.2 },
    ],
    opacity: 1 - Math.abs(derivedRelativeIndex.value) * 0.25,
    zIndex: 100 - Math.ceil(Math.abs(derivedRelativeIndex.value)),
  }));

  return (
    <Animated.View style={[styles.imageContainer, imageStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#525452ff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "50%",
    height: "auto",
    aspectRatio: 1080 / 1920,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    boxShadow: "0 0 50px 20px rgba(0, 0, 0, 1)",
    alignItems: "center",
    transformOrigin: "center bottom",
    overflow: "hidden",
  },
});
