import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 30,
      }}
    >
      <View style={styles.linksContainer}>
        <Text style={styles.linksContainerTitle}>Components</Text>
        <Link style={styles.link} href="/turkey-map-svg">
          Türkiye Map SVG
        </Link>
        <Link style={styles.link} href="/quick-menu-button">
          Quick Menu Button
        </Link>
        <Link style={styles.link} href="/qr-animation">
          QR Animation
        </Link>
        <Link style={styles.link} href="/animated-slider">
          Animated Slider
        </Link>
        <Link style={styles.link} href="/gallery">
          Gallery
        </Link>
        <Link style={styles.link} href="/switch">
          Switch
        </Link>
      </View>
      <View style={styles.linksContainer}>
        <Text style={styles.linksContainerTitle}>Text Animations</Text>
        <Link style={styles.link} href="/text-animation/wave-effect">
          Wave Effect
        </Link>
        <Link style={styles.link} href="/text-animation/moving-effect">
          Moving Effect
        </Link>
        <Link style={styles.link} href="/text-animation/randomized-effect">
          Randomized Effect
        </Link>
        <Link style={styles.link} href="/text-animation/magnifying-effect">
          Magnifying Effect
        </Link>
        <Link style={styles.link} href="/text-animation/shining-effect">
          Shining Effect
        </Link>
        <Link style={styles.link} href="/text-animation/slide-effect">
          Slide Effect
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    color: "#8d820c",
  },
  linksContainer: {
    gap: 10,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  linksContainerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4f4804",
  },
});
