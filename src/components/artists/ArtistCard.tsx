import { useState } from "react";
import { Artist } from "../../models/Artist";
import ItemTools from "../item/ItemTools";
import { Link } from "react-router-dom";
import { ROUTER } from "../../router";

interface ArtistCardProp {
  artist: Artist
}

function ArtistCard({ artist }: ArtistCardProp) {
  const [showTools, setShowTools] = useState(false);

  return (
    <li
      className="w-[236px] h-fit relative z-10 rounded ring-3 ring-white/20 hover:ring-white/40 duration-75 overflow-hidden"
      onMouseOver={() => setShowTools(true)}
      onMouseOut={() => setShowTools(false)}
    >
      <ItemTools item={artist} show={showTools} />
      <Link to={`${ROUTER.ALBUM.path}/${artist.s_id}`}>
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-[235px] object-cover"
        />
      </Link>
      <span className="block text-xl text-center p-2 bg-black/40 text-white/90">
        <Link to={`${ROUTER.ARTIST.path}/${artist.s_id}`}>
          {artist.name}
        </Link>
      </span>
    </li>
  );
}

export default ArtistCard;