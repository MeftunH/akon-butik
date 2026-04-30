import { useWishlist } from "@/context/Wishlist";

export default function WishlistLength() {
  const { wishList } = useWishlist();
  return <>{wishList.length}</>;
}
