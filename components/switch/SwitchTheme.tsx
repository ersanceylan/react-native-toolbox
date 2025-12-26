import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { Easing, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DURATION = 500;

export const SwitchThemeComponent = () => {

    const [isOn, setIsOn] = useState(false);

    const animationProgress = useSharedValue(0);
    const switchButtonTranslateXProgress = useSharedValue(20);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    useEffect(() => {
        animationProgress.value = withTiming(isOn ? 1 : 0, { duration: DURATION, easing: Easing.exp });
        switchButtonTranslateXProgress.value = withTiming(isOn ? 120 : 20, { duration: DURATION, easing: Easing.exp });
    }, [isOn]);

    // Container
    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(animationProgress.value, [0, 1], ["#000", "#fff"]),
        };
    });

    // Switch
    const shadowBlurProgress = useDerivedValue(() => {
        return animationProgress.value * 20 + 20;
    }, [animationProgress]);
    const shadowSpreadProgress = useDerivedValue(() => {
        return animationProgress.value * 1 + 2;
    }, [animationProgress]);

    const shadowColorProgress = useDerivedValue(() => {
        return interpolateColor(animationProgress.value, [0, 1], ["#ddd", "#bdf7c8ff"]);
    }, [animationProgress]);

    const switchAnimatedStyle = useAnimatedStyle(() => {
        return {
            boxShadow: `0px 0px ${shadowBlurProgress.value}px ${shadowSpreadProgress.value}px ${shadowColorProgress.value} inset`,
        };
    });

    // Switch Button
    const switchButtonShadowColorProgress = useDerivedValue(() => {
        return interpolateColor(animationProgress.value, [0, 1], ["#888", "green"]);
    }, [animationProgress]);
    const switchButtonShadowSpreadProgress = useDerivedValue(() => {
        return animationProgress.value * 5 + 2;
    }, [animationProgress]);
    const switchButtonShadowBlurProgress = useDerivedValue(() => {
        return animationProgress.value * 10 + 20;
    }, [animationProgress]);


    const switchButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: switchButtonTranslateXProgress.value }],
            boxShadow: `0px 0px ${switchButtonShadowBlurProgress.value}px ${switchButtonShadowSpreadProgress.value}px ${switchButtonShadowColorProgress.value}`,
        };
    });

    return (
        <Animated.View style={[styles.container, containerAnimatedStyle]}>
            <View style={styles.switchContainer}>
                <Animated.View style={[styles.switch, switchAnimatedStyle]}>
                    <AnimatedPressable style={[styles.switchButton, switchButtonAnimatedStyle]} onPress={toggleSwitch} />
                </Animated.View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 3,
        // borderColor: "white",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    switchContainer: {
        padding: 20
    },
    switch: {
        width: 200,
        height: 100,
        justifyContent: "center",
        borderRadius: 100,
    },
    switchButton: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: "#ddd",
    },
});
