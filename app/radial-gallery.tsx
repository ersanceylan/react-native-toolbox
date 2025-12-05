import { GalleryObject } from "@/components/gallery";
import { RadialGallery } from "@/components/gallery/RadialGallery";
import { StyleSheet, View } from "react-native";

const images: GalleryObject[] = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2023/01/09/17/49/people-7707981_1280.jpg",
    alt: "photo 1",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2025/11/08/13/23/zebra-9944593_1280.jpg",
    alt: "photo 2",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2025/11/10/10/01/landscape-9947733_1280.jpg",
    alt: "photo 3",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2025/08/15/06/29/mountain-cabin-9776289_1280.jpg",
    alt: "photo 3",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2025/10/16/08/14/parrot-9897724_1280.jpg",
    alt: "photo 5",
  },
  {
    id: 6,
    image:
      "https://cdn.pixabay.com/photo/2025/09/29/11/48/feather-9862263_1280.jpg",
    alt: "photo 6",
  },
  {
    id: 7,
    image:
      "https://cdn.pixabay.com/photo/2022/08/19/12/46/landscape-7396852_1280.jpg",
    alt: "photo 7",
  },
  {
    id: 8,
    image:
      "https://cdn.pixabay.com/photo/2025/11/14/17/32/pool-9957219_1280.jpg",
    alt: "photo 8",
  },
];

export default function RadialGalleryShowcase() {
  return (
    <View style={styles.container}>
      <RadialGallery images={images} />
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
