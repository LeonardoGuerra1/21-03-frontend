import { Album } from "../../models/Album";
import { Artist } from "../../models/Artist";
import { Track } from "../../models/Track";
import CartButton from "./CartButton";
import FavoriteButton from "./FavoriteButton";

interface ItemToolsProps {
  show: boolean
  item: Track | Album | Artist
}

function ItemTools({ show, item }: ItemToolsProps) {
  return (
    <div className={`absolute left-0 ${show ? "top-0" : "-top-[40px]"} z-20 duration-150 w-full bg-black/80 flex justify-center items-center gap-x-3 p-2`}>
      <FavoriteButton item={item} feederPosition="bottom" />
      {item.type === "album" && <CartButton item={item as Album} /> }
    </div>
  );
}

export default ItemTools;