import { provinces } from "@/components/turkeyMap/Province";
import { TurkeyMap } from "@/components/turkeyMap/Turkey";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function TurkeyMapSvgShowcase() {
  const { width, height } = useWindowDimensions();

  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );

  const selectedProvince = provinces.find((p) => p.id === selectedProvinceId);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <TurkeyMap
          width={width}
          height={(width * 422) / 1000}
          selectedProvinceId={selectedProvinceId}
          onProvincePress={setSelectedProvinceId}
          style={styles.map}
        />
        <View style={styles.provinceNameContainer}>
          {selectedProvince && (
            <Text style={styles.provinceName}>
              {selectedProvince?.id} - {selectedProvince?.name}
            </Text>
          )}
        </View>
      </View>

      <Link
        style={styles.svgSourceLink}
        href="https://simplemaps.com/svg/country/tr"
      >
        <Text style={styles.svgSourceLinkText}>
          svg source (simplemaps.com/svg/country/tr)
        </Text>
        <Feather name="external-link" size={14} color="blue" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mapContainer: {
    width: "100%",
    height: "auto",
  },
  map: {
    width: "100%",
    height: "auto",
  },
  provinceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  svgSourceLink: {
    position: "absolute",
    bottom: 30,
    gap: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  svgSourceLinkText: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
    marginRight: 10,
  },
  provinceNameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
