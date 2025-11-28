import { GalleryObject } from "@/components/gallery";
import { Gallery } from "@/components/gallery/Gallery";
import { StyleSheet, View } from "react-native";

const images: GalleryObject[] = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2023/05/01/18/06/windmill-7963566_1280.jpg",
    alt: "photo 1",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2025/10/24/10/49/vietnam-9913878_1280.png",
    alt: "photo 2",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2024/01/19/13/27/castle-8519077_1280.jpg",
    alt: "photo 3",
  },
  {
    id: 4,
    image:
      "https://www.ersanceylan.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage.64dc045e.png&w=1200&q=75",
    alt: "photo 4",
  },
  {
    id: 4,
    image: "broken-image-url.png",
    alt: "cloud",
  },
];

export default function GalleryShowcase() {
  return (
    <View style={styles.container}>
      <Gallery
        images={[
          {
            id: 1,
            image:
              "https://cdn.pixabay.com/photo/2023/05/01/18/06/windmill-7963566_1280.jpg",
            alt: "photo 1",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
