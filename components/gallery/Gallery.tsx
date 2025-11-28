import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { GalleryObject } from ".";

export const Gallery = ({
  images,
  aspectRatio = 16 / 9,
}: {
  images: GalleryObject[];
  aspectRatio?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pan = Gesture.Pan().onEnd((event) => {
    // console.log(event);

    // find the direction
    const direction = event.translationX > 0 ? "left" : "right";
    console.log(direction);
    if (direction === "right") {
      scheduleOnRN(
        setCurrentIndex,
        clamp(currentIndex + 1, 0, images.length - 1)
      );
    } else {
      scheduleOnRN(
        setCurrentIndex,
        clamp(currentIndex - 1, 0, images.length - 1)
      );
    }
  });

  return (
    <GestureHandlerRootView style={{}}>
      <GestureDetector gesture={pan}>
        <View style={[styles.galleryContainer, { aspectRatio: aspectRatio }]}>
          {images.map((imageObj, index) => {
            return (
              <ImageItem
                key={`image-${index}`}
                index={index}
                currentIndex={currentIndex}
                imageObject={imageObj}
              />
            );
          })}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const ImageItem = ({
  index,
  currentIndex,
  imageObject,
}: {
  index: number;
  currentIndex: number;
  imageObject: GalleryObject;
}) => {
  const imagePosition = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const imageOpacity = useSharedValue(1);

  useEffect(() => {
    if (index === currentIndex) {
      imagePosition.value = withSpring(0);
      imageScale.value = withSpring(1);
      imageOpacity.value = withTiming(1, { duration: 100 });
    } else {
      imagePosition.value = withSpring((index - currentIndex) * 30);
      imageScale.value = withSpring(1 - Math.abs(index - currentIndex) * 0.1);
      imageOpacity.value = withTiming(
        1 - Math.abs(index - currentIndex) * 0.4,
        { duration: 100 }
      );
    }
  }, [currentIndex]);

  const zIndex = useMemo(() => {
    if (index === currentIndex) return 100;

    if (index < currentIndex) return index;
    else return currentIndex - index;
  }, [index, currentIndex]);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: imagePosition.value },
      { scale: imageScale.value },
    ],
    opacity: imageOpacity.value,
    zIndex: zIndex,
  }));

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Animated.View style={[styles.imageContainer, imageStyle]}>
      {imageObject.image && (
        <Image
          onLoad={() => {
            setImageLoaded(true);
            console.log("image loaded");
          }}
          onError={() => {
            setImageLoaded(false);
            console.log("image error");
          }}
          source={{ uri: imageObject.image }}
          style={[styles.image, { height: imageLoaded ? "100%" : "0%" }]}
          alt={imageObject.alt}
        />
      )}
      {!imageLoaded && <Text style={styles.imageAlt}>{imageObject.alt}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    width: "100%",
    height: "auto",
    aspectRatio: 16 / 9,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#4e4d4d",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  imageAlt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
