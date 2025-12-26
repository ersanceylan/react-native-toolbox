import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BACKGROUND_ANIMATION_CONFIG = {
    duration: 500,
    easing: Easing.out(Easing.cubic),
};

const BULB_ANIMATION_CONFIG = {
    stiffness: 900,
    damping: 120,
    mass: 10,
    overshootClamping: false,
    energyThreshold: 6e-9,
    velocity: 0,
    reduceMotion: ReduceMotion.System,
};

const BULB_SIZE = 20;
const BULB_DEFAULT_POSITION_TOP = 30;
const BULB_CLOSED_COLOR = "#333";
const BULB_OPEN_COLOR = "#ddd";
const BULB_TINT_COLOR = "#f4df53ff";

export const SwitchThemeBulb = () => {

    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    }

    const backgroundProgress = useSharedValue(0);
    const bulbTranslateX = useSharedValue(0);
    const bulbTranslateY = useSharedValue(0);

    useEffect(() => {
        if (isOn) {
            backgroundProgress.value = withTiming(1, BACKGROUND_ANIMATION_CONFIG);
        } else {
            backgroundProgress.value = withTiming(0, BACKGROUND_ANIMATION_CONFIG);
        }
    }, [isOn]);

    const panGesture = Gesture.Pan().onUpdate((event) => {
        bulbTranslateX.value = event.translationX;
        bulbTranslateY.value = event.translationY;
    }).onEnd((event) => {
        if (event.translationY > 50) {
            scheduleOnRN(toggle);
        }

        bulbTranslateX.value = withSpring(0, BULB_ANIMATION_CONFIG);
        bulbTranslateY.value = withSpring(0, BULB_ANIMATION_CONFIG);
    });

    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(backgroundProgress.value, [0, 1], ["#000", "#fff"])
        };
    });

    const bulbAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: bulbTranslateX.value },
                { translateY: bulbTranslateY.value },
            ],
            backgroundColor: interpolateColor(backgroundProgress.value, [0, 1], [BULB_CLOSED_COLOR, BULB_TINT_COLOR]),
            boxShadow: `0 0 ${5 + backgroundProgress.value * 5}px ${backgroundProgress.value * 5}px ${BULB_TINT_COLOR}`,
        };
    });

    const wireAnimatedStyle = useAnimatedStyle(() => {
        const dx = bulbTranslateX.value;
        const dy = bulbTranslateY.value + BULB_DEFAULT_POSITION_TOP + BULB_SIZE / 2;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dx, dy);
        const rotation = -(angle * 180) / Math.PI;

        return {
            height: length,
            backgroundColor: interpolateColor(backgroundProgress.value, [0, 1], [BULB_CLOSED_COLOR, BULB_OPEN_COLOR]),
            transform: [
                { translateY: -length / 2 },
                { rotate: `${rotation}deg` },
                { translateY: length / 2 },
            ],
        };
    });

    return (
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            <Animated.View style={[styles.container, containerAnimatedStyle]}>
                <Animated.View style={[styles.wire, wireAnimatedStyle]} />

                <GestureDetector gesture={panGesture}>
                    <AnimatedPressable onPress={toggle} style={[styles.bulb, bulbAnimatedStyle]} />
                </GestureDetector>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    bulb: {
        position: "absolute",
        top: BULB_DEFAULT_POSITION_TOP,
        width: BULB_SIZE,
        height: BULB_SIZE,
        borderRadius: BULB_SIZE / 2,
    },
    wire: {
        position: "absolute",
        top: 0,
        width: BULB_SIZE / 10,
        height: BULB_DEFAULT_POSITION_TOP + BULB_SIZE / 2,
    },
});
