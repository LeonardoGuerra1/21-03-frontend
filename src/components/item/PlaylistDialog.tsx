import { useEffect, useState } from "react";
import Dialog from "../utils/Dialog";
import { Playlist } from "../../models/Playlist";
import { Track } from "../../models/Track";
import { useDialogStore } from "../../stores/useDialogStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";
import { usePlaylists } from "../../hooks/usePlaylists";
import SafeComponent from "../utils/SafeComponent";


interface PlaylistDialogProps {
  item: Track
}

function PlaylistDialog({ item }: PlaylistDialogProps) {
  const { createPlaylist, addItemToPlaylist } = usePlaylists()

  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  
  const open = useDialogStore().open
  const action = useDialogStore().action
  const closeDialog = useDialogStore().closeDialog

  useEffect(() => {
    if (!open && action.type === "playlist") {
      //ANIMATION FOR INPUT
      setInputError(false)
      setTimeout(() => setInput(""), 500);
    }
  }, [open, action]);
  
  useEffect(() => {
    if (input.length > 0) 
      setInputError(false)
  }, [input]);

  const handleCreate = async () => {
    if (input.length < 1) {
      setInputError(true)
      return
    }

    const result = await createPlaylist({
      name: input,
      items: [{
        s_id: item.s_id,
        name: item.name,
        image: item.image
      }]
    })

    if (result.ok) {
      console.log({
        from: "create playlist dialog",
        message: "created and added"
      });
      setTimeout(() => closeDialog(), 500);
    } else {
      console.log({
        from: "create playlist dialog",
        message: "unable to create"
      });
    }
  }

  const handleAdd = async (playlistId: string) => {
    const result = await addItemToPlaylist(playlistId, {
      s_id: item.s_id,
      name: item.name,
      image: item.image
    })

    if (result.ok) {
      console.log({
        from: "add item playlist dialog",
        message: "added"
      });
      setTimeout(() => closeDialog(), 500);
    } else {
      console.log({
        from: "add item playlist dialog",
        message: "unable to add"
      });
    }
    closeDialog()
  }

  return (
    <Dialog>
      <span className="text-lg font-semibold">
        Add "{item.name}" to...
      </span>

      <div className="my-4 flex justify-center items-center gap-x-2">
        <input 
          type="text"
          className={`grow outline-0 px-3 py-1 rounded ring-2 ${inputError ? "ring-red-400" : "ring-white/10"} focus:ring-white/40 duration-100`}
          placeholder="New playlist"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="py-1 px-5 rounded cursor-pointer bg-zinc-950/60"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      <SafeComponent errorMessage="Something went wrong loading playlists" loadingSize="medium">
        <PlaylistList onAdd={(playlistId) => handleAdd(playlistId)} />
      </SafeComponent>
    </Dialog>
  );
}

export default PlaylistDialog;

interface PlaylistListProps {
  onAdd: (playlistId: string) => void
}

const PlaylistList = ({ onAdd } : PlaylistListProps) => {
  const { listPlaylists } = usePlaylists()
  const { data: playlists } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_LIST],
    queryFn: listPlaylists
  })
  
  return playlists.length > 0
  ? (
    <>
      <span className="text-white/80">
      Or existing playlists:
      </span>
      <ul className="mt-2 block">
        {playlists.map(playlist => (
          <PlaylistRow key={playlist._id} item={playlist} onAdd={() => onAdd(playlist._id!)} />
        ))}
      </ul>
    </>
  ) : null
}

interface PlaylistRowProps {
  item: Playlist
  onAdd: () => void
}

const PlaylistRow = ({ item, onAdd }: PlaylistRowProps) => {
  console.log(item);
  
  const length = item.items.length

  return (
    <li
    className="px-4 py-2 rounded flex justify-between items-center hover:bg-white/5 cursor-pointer"
    onClick={onAdd}
  >
    <span>
      {item.name}
    </span>
    <div className="flex justify-center items-center gap-x-2">
      {item.items.some(track => track.s_id === item._id) && (
        <span className="text-xs text-white/30">
          (Already added)
        </span>
      )}

      <span className="text-white/60">
        {length} item{length !== 1 && "s"}
      </span>
    </div>
  </li>
  )
}
