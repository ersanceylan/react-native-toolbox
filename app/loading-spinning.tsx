import { LoadingSpinning } from "@/components/LoadingSpinning";
import { View } from "react-native";

export default function LoadingSpinningPage() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingSpinning />
    </View>
  );
}
