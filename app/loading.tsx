import { LoadingComponent } from "@/components/Loading";
import { View } from "react-native";

export default function Loading() {
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
      <LoadingComponent />
    </View>
  );
}
