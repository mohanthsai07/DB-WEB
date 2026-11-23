export type GalleryCategory =
  | "All Moments"
  | "Infrastructure"
  | "Campus Events"
  | "Academics"
  | "Student Life"
  | "Sports"
  | "Achievements"
  | "Celebrations";

export type GalleryCampus =
  | "Hyderabad"
  | "Vijayawada"
  | "Guntur"
  | "Vizag";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  category: GalleryCategory;
  campus: GalleryCampus;
  location: string;
  shape: "tall" | "wide" | "standard";
  featured?: boolean;
}

export interface FeaturedEvent {
  id: string;
  title: string;
  eyebrow: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

export interface InfrastructureItem {
  id: string;
  title: string;
  eyebrow: string;
  image: string;
  description: string;
}
