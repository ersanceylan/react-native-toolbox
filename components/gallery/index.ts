export type GalleryObject = {
  id: number;
  image: string | null;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  images: string[];
};
