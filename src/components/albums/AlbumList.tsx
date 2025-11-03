import AlbumCard from "./AlbumCard";
import { useAlbums } from "../../hooks/useAlbums";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";

function AlbumList() {
  const { getAlbums } = useAlbums()

  const { data: albums } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.ALBUM_LIST],
    queryFn: getAlbums
  })

  return albums.map(album => <AlbumCard key={album.s_id} album={album} />
  )
}

export default AlbumList;