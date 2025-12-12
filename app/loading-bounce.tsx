import { LoadingBounce } from "@/components/LoadingBounce";
import { View } from "react-native";

export default function LoadingBouncePage() {
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
      <LoadingBounce />
    </View>
  );
}
