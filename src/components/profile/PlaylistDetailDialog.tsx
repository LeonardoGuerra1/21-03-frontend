import { useRef, useState } from "react";
import { usePlaylists } from "../../hooks/usePlaylists";
import Dialog from "../utils/Dialog";
import { ROUTER } from "../../router";
import deleteIcon from "../../assets/icons/delete.svg"
import { Link } from "react-router-dom";
import { Playlist, PlaylistItem } from "../../models/Playlist";
import { useDialogStore } from "../../stores/useDialogStore";

interface PlaylistDetailDialogProps {
  item: Playlist
}

function PlaylistDetailDialog({ item }: PlaylistDetailDialogProps) {
  const closeDialog = useDialogStore().closeDialog

  return (
    <Dialog>
      <span className="text-3xl font-semibold">
        {item.name}
      </span>
      <hr className="mt-4 rounded border-white/30"/>

      <div className="max-h-60 rounded overflow-y-scroll">
        {item.items.length > 0
         ? (
          <ul>
            {item.items.map(track => (
              <PlaylistItemRow
                key={track._id!}
                item={track}
                playlistId={item._id!}
              />
            ))}
          </ul>
         ) : (
          <p className="text-center mt-2">
            No items on this playlist.
          </p>
         )}
      </div>

      <div className="mt-5 flex justify-center items-center">
        <button className="text-lg px-5 py-1 rounded mx-auto cursor-pointer bg-black/80 hover:bg-black/50" onClick={closeDialog}>
          Accept
        </button>
      </div>
    </Dialog>
  );
}

export default PlaylistDetailDialog;

interface PlaylistItemRowProps {
  playlistId: string
  item: PlaylistItem
}

const PlaylistItemRow = ({ item, playlistId }: PlaylistItemRowProps) => {
  const { removeItemFromPlaylist } = usePlaylists()
  const liRef = useRef<HTMLLIElement | null>(null)
  const [fade, setFade] = useState(false);
  const handleDelete = async (trackId: string) => {
    const result = await removeItemFromPlaylist(playlistId, trackId, 300)
    if (result.ok && liRef.current !== null) {
      setFade(true)
    }
  }

  return (
    <li
      key={"playlist-" + item.s_id}
      className={`pr-2 py-0 flex justify-between items-center rounded group even:bg-white/7 ${fade ? "max-h-0 opacity-0" : "max-h-100"} duration-300`}
      ref={liRef}
    >
      <div className="flex justify-start items-center gap-x-3">
        <Link to={`/${ROUTER.TRACK.path}/${item.s_id}`} className="h-full">
          <div className="w-15">
            <img
              src={item.image}
              alt="Delete"
              className="full object-cover"
            />
          </div>
        </Link>

        <Link to={`/${ROUTER.TRACK.path}/${item.s_id}`}>
          <span>
            {item.name}
          </span>
        </Link>
      </div>

      <div className="opacity-0 group-hover:opacity-100 overflow-hidden duration-100">
        <button className="w-5 cursor-pointer" onClick={() => handleDelete(item.s_id)}>
          <img
            src={deleteIcon}
            alt="Delete"
            className="w-full"
          />
        </button>
      </div>
    </li>
  )
}