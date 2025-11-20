import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const CORNER_SIZE = 50;
const CORNER_BORDER_WIDTH = 10;

export const QrAnimation = () => {
  const [qrCodeAreaHeight, setQrCodeAreaHeight] = useState(0);

  const opacity = useSharedValue(0);
  const yPosition = useSharedValue(0);

  useEffect(() => {
    if (qrCodeAreaHeight) {
      opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
      yPosition.value = withRepeat(
        withTiming(qrCodeAreaHeight - 10, {
          duration: 1500,
        }),
        -1,
        true
      );
    }
  }, [qrCodeAreaHeight]);

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yPosition.value }],
  }));

  return (
    <View style={styles.container}>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setQrCodeAreaHeight(height);
        }}
        style={styles.qrCodeArea}
      >
        {/* <QrBackground /> */}
        <View style={styles.qrCodeLeftTopCorner}></View>
        <View style={styles.qrCodeRightTopCorner}></View>
        <View style={styles.qrCodeLeftBottomCorner}></View>
        <View style={styles.qrCodeRightBottomCorner}></View>
        <Animated.View
          style={[styles.qrCodeScanningLine, lineStyle]}
        ></Animated.View>
      </View>
      <Animated.Text style={[styles.qrCodeText, textStyle]}>
        QR Code scanning...
      </Animated.Text>
      {/* </View> */}
    </View>
  );
};

const QrBackground = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        width: "100%",
        height: "100%",
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: 64 }).map((_, index) => (
        <QrBackgroundCell key={index} />
      ))}
    </View>
  );
};

const QrBackgroundCell = () => {
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withRepeat(
      withTiming(Math.random() * 0.2, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const cellStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${colorProgress.value})`,
  }));

  return (
    <Animated.View
      style={[
        cellStyle,
        {
          // borderWidth: 0.2,
          // borderColor: "#ececf2",
          width: "12.5%",
          height: "12.5%",
        },
      ]}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // borderWidth: 1,
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  // darkBackground: {
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
  // blurTop: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: "green",
  // },
  // blurBottom: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: "green",
  // },
  qrCodeArea: {
    height: "50%",
    aspectRatio: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // justifyContent: "center",
    alignItems: "center",
  },
  qrCodeScanningLine: {
    width: "95%",
    height: 4,
    backgroundColor: "#ff6666",
    boxShadow: "0 0 10px 3px #ff6666",
  },
  qrCodeLeftTopCorner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderLeftWidth: CORNER_BORDER_WIDTH,
    borderTopWidth: CORNER_BORDER_WIDTH,
    borderLeftColor: "#dcdcef",
    borderTopColor: "#dcdcef",
  },
  qrCodeRightTopCorner: {
    position: "absolute",
    top: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderRightWidth: CORNER_BORDER_WIDTH,
    borderTopWidth: CORNER_BORDER_WIDTH,
    borderRightColor: "#dcdcef",
    borderTopColor: "#dcdcef",
  },
  qrCodeLeftBottomCorner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderLeftWidth: CORNER_BORDER_WIDTH,
    borderBottomWidth: CORNER_BORDER_WIDTH,
    borderLeftColor: "#dcdcef",
    borderBottomColor: "#dcdcef",
  },
  qrCodeRightBottomCorner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderRightWidth: CORNER_BORDER_WIDTH,
    borderBottomWidth: CORNER_BORDER_WIDTH,
    borderRightColor: "#dcdcef",
    borderBottomColor: "#dcdcef",
  },
  qrCodeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
