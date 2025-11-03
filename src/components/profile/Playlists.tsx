import { useSuspenseQuery } from "@tanstack/react-query";
import { DialogAction, DropdownOption, PLAYLISTS_OPTIONS, QUERY_KEYS } from "../../constants";
import { usePlaylists } from "../../hooks/usePlaylists";
import playlistIcon from "../../assets/icons/playlist.svg"
import Filter from "../utils/Filter";
import { useCallback, useEffect, useRef, useState } from "react";
import { Playlist } from "../../models/Playlist";
import Dropdown from "../utils/Dropdown";
import { useDialogStore } from "../../stores/useDialogStore";
import PlaylistDetailDialog from "./PlaylistDetailDialog";

const DEFAULT_KEY = 0
const AMOUNT_ITEMS_KEY = 1
const DATE_CREATED_KEY = 2


function Playlists() {
  const { listPlaylists } = usePlaylists()
  
  const { data: playlists } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_LIST],
    queryFn: listPlaylists,
  })

  const [localList, setLocalList] = useState<Playlist[]>(playlists);

  const filterCallback = useCallback((search: string) => {
    setLocalList(playlists.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ))
  }, [localList])

  const sortCallback = useCallback((value: DropdownOption) => {
    let list = [...localList]
    if (value.id === DEFAULT_KEY) {
      setLocalList([...playlists])
      return
    }

    if (value.id === AMOUNT_ITEMS_KEY)
      list.sort((a, b) => b.items.length - a.items.length)
    
    if (value.id === DATE_CREATED_KEY)
      list.sort((a, b) => {
        const firstDate = new Date(a.createdAt!)
        const secondDate = new Date(b.createdAt!)
        return firstDate.getTime() - secondDate.getTime()
      })

    setLocalList([...list])
  }, [localList])

  useEffect(() => {
    console.log("playlists: ", playlists);
    setLocalList([...playlists])
  }, [playlists]);

  return (
    <>
      <div className="flex justify-between items-center">
        <Filter
          placeholder="Search by name..."
          onSearch={filterCallback}
          onClear={() => setLocalList(playlists)}
        />
        <Dropdown
          label="Order by"
          options={PLAYLISTS_OPTIONS}
          onSelect={sortCallback}
        />
      </div>
      <ul className="mt-5 grid grid-cols-5 gap-5">
        {localList.map(playlist => (
          <PlaylistCard key={playlist._id} item={playlist} />
        ))}
      </ul>
    </>
  );
}

export default Playlists;

interface PlaylistCardProps {
  item: Playlist
}

const PlaylistCard = ({ item }: PlaylistCardProps) => {
  const action = useDialogStore().action
  const openDialog = useDialogStore().openDialog

  const itemAction = useRef<DialogAction>({
    type: "detail-playlist", id: item._id
  })

  return (
    <li>
      <div className="w-60 p-3 mx-auto h-40 flex flex-col justify-between items-start rounded bg-white/5">
        <div
          className="relative w-full min- h-25 cursor-pointer rounded overflow-hidden bg-white/10"
          onClick={() => openDialog(itemAction.current)}
        >
          {item.items
            .slice(0,5)
            .map((track, index) => (
              <img
                key={"playlist-images-" + track._id!}
                src={track.image}
                alt={track.name}
                className="absolute w-25 blur-[1.5px]"
                style={{ left: index * 20 }}
              />
            ))}
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-lg font-semibold flex justify-start items-center gap-x-2">
            <img
              src={playlistIcon}
              alt="Play"
              />
            <button className="cursor-pointer" onClick={() => openDialog(itemAction.current)}>
              {item.name}
            </button>
          </span>
          <span className="text-sm">
            {item.items.length} item{item.items.length !== 1 && "s"} 
          </span>
        </div>
      </div>
      {action === itemAction.current && <PlaylistDetailDialog item={item}  />}
    </li>
  )
}
