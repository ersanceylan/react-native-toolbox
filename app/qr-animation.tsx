import { QrAnimation } from "@/components/QrAnimation";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

const videoSource = require("../assets/videos/qr-stock.mp4");

export default function QRAnimation() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} contentFit="cover" />
      <QrAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
