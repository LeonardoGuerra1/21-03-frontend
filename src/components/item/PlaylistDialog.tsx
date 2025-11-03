import { useEffect, useState } from "react";
import Dialog from "../utils/Dialog";
import { Playlist } from "../../models/Playlist";
import { Track } from "../../models/Track";
import { useDialogStore } from "../../stores/useDialogStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";
import { usePlaylists } from "../../hooks/usePlaylists";
import SafeComponent from "../utils/SafeComponent";
import Input from "../utils/Input";

interface PlaylistDialogProps {
  item: Track
}

function PlaylistDialog({ item }: PlaylistDialogProps) {
  const { createPlaylist, addItemToPlaylist } = usePlaylists()

  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const open = useDialogStore().open
  const action = useDialogStore().action
  const closeDialog = useDialogStore().closeDialog

  useEffect(() => {
    if (!open && action.type === "playlist") {
      //DELAY FOR INPUT ANIMATION
      setInputError(false)
      setTimeout(() => setInput(""), 500);
    }
  }, [open, action]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) 
      setInputError(false)
    setInput(e.target.value)
  }

  const handleCreate = async () => {
    setErrorMessage("")
    if (input.length === 0 || inputError) {
      setInputError(true)
      return
    }

    const result = await createPlaylist({
      name: input,
      items: [
        {
          s_id: item.s_id,
          name: item.name,
          image: item.image
        }
      ]
    })

    if (result.ok) {
      console.log({
        from: "create playlist dialog",
        message: "created and added"
      });
      setTimeout(() => closeDialog(), 500);
    } else {
      setErrorMessage(result.message)
      console.log({
        result,
      });
    }
  }

  const handleAdd = async (playlistId: string) => {
    setErrorMessage("")
    const result = await addItemToPlaylist(playlistId, {
      s_id: item.s_id,
      name: item.name,
      image: item.image
    })

    if (result.ok) {
      setTimeout(() => closeDialog(), 500);
    }
    closeDialog()
  }

  return (
    <Dialog>
      <span className="text-lg font-semibold">
        Add "{item.name}" to...
      </span>

      <div className="my-4 flex justify-center items-center gap-x-2">
        <div className="grow">
          <Input
            type="text"
            placeholder="New playlist"
            onChange={handleChange}
            value={input}
            error={inputError}
          />
        </div>

        <button
          className="py-1 px-5 rounded cursor-pointer bg-zinc-950/60"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      {errorMessage.length > 0 && (
        <p className="text-red-400">
          {errorMessage}
        </p>
      )}

      <SafeComponent key={item.s_id} errorMessage="Something went wrong loading playlists" loadingSize="medium">
        <PlaylistList itemId={item.s_id} onAdd={(playlistId) => handleAdd(playlistId)} />
      </SafeComponent>
    </Dialog>
  );
}

export default PlaylistDialog;

interface PlaylistListProps {
  itemId: string
  onAdd: (playlistId: string) => void
}

const PlaylistList = ({ itemId, onAdd } : PlaylistListProps) => {
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
          <PlaylistRow
            key={playlist._id}
            itemId={itemId}
            playlist={playlist}
            onAdd={() => onAdd(playlist._id!)}
          />
        ))}
      </ul>
    </>
  ) : null
}

interface PlaylistRowProps {
  itemId: string
  playlist: Playlist
  onAdd: () => void
}

const PlaylistRow = ({ itemId, playlist, onAdd }: PlaylistRowProps) => {
  const length = playlist.items.length
  const added = playlist.items.some(track => track.s_id === itemId)
  
  return (
    <li
      className="px-4 py-2 rounded flex justify-between items-center hover:bg-white/5 cursor-pointer"
      onClick={() => !added && onAdd()}
    >
      <span>
        {playlist.name}
      </span>
      <div className="flex justify-center items-center gap-x-2">
        {added && (
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
