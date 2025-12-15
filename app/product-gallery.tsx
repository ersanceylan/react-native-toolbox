import { Product } from "@/components/gallery";
import { ProductGallery } from "@/components/gallery/ProductGallery";
import { StyleSheet, View } from "react-native";

const products: Product[] = [
  {
    id: "product1",
    title: "product 1",
    description: "lorem ipsum dolor",
    images: [
      "https://cdn.pixabay.com/photo/2025/09/29/11/48/feather-9862263_1280.jpg",
      "https://cdn.pixabay.com/photo/2022/08/19/12/46/landscape-7396852_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/11/14/17/32/pool-9957219_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/11/10/10/01/landscape-9947733_1280.jpg",
    ],
  },
];

export default function ProductGalleryShowcase() {
  return (
    <View style={styles.container}>
      <ProductGallery products={products} />
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
