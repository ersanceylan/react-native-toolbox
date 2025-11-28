import { CustomSwitch } from "@/components/switch/CustomSwitch";
import { StyleSheet, View } from "react-native";

export default function SwitchShowcase() {
  return (
    <View style={styles.container}>
      <CustomSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
