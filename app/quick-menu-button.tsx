import { QuickMenuButton } from "@/components/QuickMenuButton";
import { StyleSheet, View } from "react-native";

export default function QuickMenuButtonShowcase() {
  return (
    <View style={styles.container}>
      <QuickMenuButton color={"#000000"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
});
