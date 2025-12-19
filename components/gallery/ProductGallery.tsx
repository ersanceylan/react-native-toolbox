import { EvilIcons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text } from "react-native";
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
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { Product } from ".";

const IMAGE_THUMB_SIZE = 300;

const TRANSLATION_SPEED = 3;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

export const ProductGallery = ({ products }: { products: Product[] }) => {
  const p = products[0];

  return (
    <GestureHandlerRootView
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: "#111",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >

      {products.map((p: Product, index: number) => (
        <ProductComponent key={`${p.id}-${index}`} product={p} />
      ))}
    </GestureHandlerRootView>
  );
};

const ProductComponent = ({ product }: { product: Product }) => {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<"thumb" | "preview" | "fullscreen">("thumb");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const containerHeight = useMemo(() => {
    if (mode === "preview") {
      return (IMAGE_THUMB_SIZE / 2) * product.images.length;
    } else if (mode === "fullscreen") {
      return WINDOW_HEIGHT - insets.top - insets.bottom;
    }
    return IMAGE_THUMB_SIZE;
  }, [mode]);

  const containerWidth = useMemo(() => {
    if (mode === "preview") {
      return IMAGE_THUMB_SIZE;
    } else if (mode === "fullscreen") {
      return WINDOW_WIDTH;
    }
    return IMAGE_THUMB_SIZE;
  }, [mode]);

  const translation = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (currentIndex === product.images.length - 1) {
        translation.value = clamp(event.translationY, -10, containerHeight);
      } else if (currentIndex === 0) {
        translation.value = clamp(event.translationY, -WINDOW_HEIGHT, 10);
      } else {
        translation.value = event.translationY;
      }
    })
    .onEnd((event) => {
      console.log(
        Math.abs(translation.value) * TRANSLATION_SPEED > containerHeight / 2
      );
      if (
        Math.abs(translation.value) * TRANSLATION_SPEED >
        containerHeight / 2
      ) {
        const step = translation.value > 0 ? -1 : 1;
        const newIndex = clamp(
          currentIndex! + step,
          0,
          product.images.length - 1
        );
        console.log;
        scheduleOnRN(setCurrentIndex, newIndex);
      }

      translation.value = 0;
    });

  const infoMode = useSharedValue(-1);
  const handlePressOverlay = useCallback(() => {
    if (mode === "fullscreen") {
      infoMode.value = withTiming(0, { duration: 100 }, () => {
        infoMode.value = withDelay(3000, withTiming(-1, { duration: 400 }));
      });
    } else {
      setMode((prev) => (prev === "thumb" ? "preview" : "thumb"));
    }
  }, [mode]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: containerWidth,
      height: containerHeight,
    };
  });
  const infoStyle = useAnimatedStyle(() => {
    return {
      width: containerWidth,
      height: containerHeight * 0.2,
      transform: [{ translateY: -containerHeight * 0.2 * infoMode.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          containerStyle,
          {
            borderRadius: mode === "fullscreen" ? 0 : 10,
            padding: 20,
            overflow: "hidden",
            // borderWidth: 1,
            // borderColor: "red",
          },
        ]}
      >
        {mode === "fullscreen" && (
          <Pressable
            onPress={() => setMode("thumb")}
            style={{ position: "absolute", top: 20, right: 10, zIndex: 1000 }}
          >
            <EvilIcons name="close" size={40} color={"#333"} />
          </Pressable>
        )}

        <Pressable
          onPress={handlePressOverlay}
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {product.images.map((p, index) => {
            return (
              <ImageComp
                key={index}
                mode={mode}
                switchToFullscreen={() => {
                  setMode("fullscreen");
                  setCurrentIndex(index);
                }}
                image={p}
                index={index}
                currentIndex={currentIndex}
                containerHeight={containerHeight}
                containerWidth={containerWidth}
                translation={translation}
              />
            );
          })}
        </Pressable>

        <Animated.View
          style={[
            infoStyle,
            {
              position: "absolute",
              padding: 30,
              justifyContent: "space-between",
              bottom: 0,
              // backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 20,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "white",
              textShadowOffset: { width: 0, height: 2 },
              textShadowColor: "black",
              textShadowRadius: 5,
            }}
          >
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "white",
              textShadowOffset: { width: 0, height: 3 },
              textShadowColor: "black",
              textShadowRadius: 5,
            }}
          >
            {product.description}
          </Text>
          <Pressable
            style={{
              backgroundColor: "#eee",
              borderRadius: 15,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <EvilIcons name="cart" color={"#000"} size={20} />
            <Text
              style={{
                fontWeight: 200,
              }}
            >
              add to cart
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const FULLSCREEN_DELAY = 200;
const FULLSCREEN_ANIMATION_DURATION = 1000;
const EASING = Easing.exp;

const ImageComp = ({
  mode,
  image,
  index,
  switchToFullscreen,
  currentIndex,
  containerHeight,
  containerWidth,
  translation,
}: {
  mode: string;
  image: string;
  index: number;
  switchToFullscreen: () => void;
  currentIndex: number | null;
  containerHeight: number;
  containerWidth: number;
  translation: SharedValue<number>;
}) => {
  const heightCalc = useDerivedValue(() => {
    if (mode === "fullscreen") {
      return withTiming(containerHeight, {
        duration: FULLSCREEN_ANIMATION_DURATION,
        easing: EASING,
      });
    } else if (mode === "preview") {
      return withTiming(IMAGE_THUMB_SIZE / 2, {
        duration: 200,
      });
    }

    return withTiming(containerHeight - 20, { duration: 200 });
  }, [mode, containerHeight]);

  const widthCalc = useDerivedValue(() => {
    if (mode === "fullscreen") {
      return withTiming(containerWidth, {
        duration: FULLSCREEN_ANIMATION_DURATION,
        easing: EASING,
      });
    } else if (mode === "preview") {
      return withTiming(IMAGE_THUMB_SIZE / 2, {
        duration: 200,
      });
    }

    return withTiming(containerWidth - 20, { duration: 200 });
  }, [mode, containerWidth]);

  const positionTopCalc = useDerivedValue(() => {
    if (mode === "fullscreen") {
      let top = (index - currentIndex!) * containerHeight;
      if (translation.value !== 0) {
        top += translation.value * TRANSLATION_SPEED;
        return top;
      }

      return withTiming(top, {
        duration: FULLSCREEN_ANIMATION_DURATION / 4,
        easing: Easing.ease,
      });
    } else if (mode === "preview") {
      return withTiming((index * IMAGE_THUMB_SIZE) / 2, {
        duration: 400,
      });
    }

    return withTiming(index * 5, { duration: 200 });
  }, [mode, currentIndex, heightCalc.value, translation]);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: widthCalc.value,
      height: heightCalc.value,
      top: positionTopCalc.value,
    };
  });

  return (
    <Animated.View
      style={[
        imageStyle,
        {
          position: "absolute",
          zIndex: 100 + index,
          boxShadow: "2px -2px 2px 0px #000",
          borderRadius: mode === "fullscreen" ? 0 : 10,
          overflow: "hidden",
        },
        mode === "thumb" && { right: index * 5 },
      ]}
    >
      <Pressable
        disabled={mode !== "preview"}
        onPress={switchToFullscreen}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        />
      </Pressable>
    </Animated.View>
  );
};
