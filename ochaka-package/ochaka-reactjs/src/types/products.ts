type BadgeType = "flash-sale" | string;
interface ProductBadge {
  type: BadgeType;
  text: string;
}

interface ProductColor {
  name: string;
  value: string; // e.g., css class name for swatch color
  image: string; // image for this color variant
}

export interface ProductCardItem {
  id: number;
  title: string;
  imgSrc: string;
  imageHover?: string;
  imgHoverSrc?: string;
  hoverImgSrc?: string;
  tag?: string;
  sold?: number;
  available?: number;
  badgeClass?: string;
  progress?: number;
  saleMarquee?: boolean;
  showMarquee?: boolean;
  showCountdown?: boolean;

  price: number;
  oldPrice?: number;
  rating?: number;
  sizes?: string[];
  colors?: ProductColor[];

  badges?: ProductBadge[];
  badge?: string[];
  badgeExtra?: string;
  countdown?: number;
  marqueeSale?: boolean;

  inStock?: boolean;
  filterBrands?: string[];
  filterCategory?: string[];
  filterColor?: string[];
  filterSizes?: string[];
}
