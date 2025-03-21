import { Link } from "react-router-dom";
import { Track } from "../../models/Track";
import FavoriteButton from "../item/FavoriteButton";
import PlaylistButton from "../item/PlaylistButton";
import { ROUTER } from "../../router";

interface TrackRowProps {
  track: Track
  isFavorite?: boolean
}

function TrackRow({ track, isFavorite }: TrackRowProps) {
  return (
    <li className="max-2-cards:w-[287px] mx-auto w-full min-2-cards:h-20 rounded ring-3 ring-white/20 hover:ring-white/40 bg-black/40 duration-75 flex max-2-cards:flex-col justify-start items-center gap-x-5">
      <Link to={`${ROUTER.TRACK.path}/${track.s_id}`} className="h-full">
        <img
          src={track.image}
          alt={track.name}
          className="h-full"
        />
      </Link>
      <span className="grow">
        <Link to={`${ROUTER.TRACK.path}/${track.s_id}`} className="text-lg text-white/90">
          {track.name}
        </Link>
      </span>
      <div className="p-2 h-full hover:bg-neutral-600/30 flex justify-center items-center gap-3">
        <FavoriteButton item={track} initial={isFavorite} feederPosition="top" />
        <PlaylistButton item={track} />
      </div>
    </li>
  );
}

export default TrackRow;