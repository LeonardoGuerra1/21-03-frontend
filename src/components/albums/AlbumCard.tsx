import { useState } from "react";
import { Album } from "../../models/Album";
import ItemTools from "../item/ItemTools";
import { Link } from "react-router-dom";
import { ROUTER } from "../../router";

interface AlbumCardProps {
  album: Album
  isFavorite?: boolean
}

function AlbumCard({ album }: AlbumCardProps) {
  const [showTools, setShowTools] = useState(false);

  return (
    <li
      className="w-[236px] h-fit relative z-10 rounded ring-3 ring-white/20 hover:ring-white/40 duration-75 overflow-hidden"
      onMouseOver={() => setShowTools(true)}
      onMouseOut={() => setShowTools(false)}
    >
      <ItemTools show={showTools} item={album} />
      <Link to={`${ROUTER.ALBUM.path}/${album.s_id}`}>
        <img
          src={album.image}
          alt={album.name}
          className="w-full h-[235px] object-cover"
        />
      </Link>
      <span className="block text-xl text-center p-2 bg-black/40 text-white/90">
        <Link to={`${ROUTER.ALBUM.path}/${album.s_id}`}>
          {album.name}
        </Link>
      </span>
    </li>
  );
}

export default AlbumCard;