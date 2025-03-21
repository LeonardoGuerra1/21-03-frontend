import { useSuspenseQuery } from "@tanstack/react-query";
import { useAlbums } from "../../hooks/useAlbums";
import AlbumCard from "./AlbumCard";
import { QUERY_KEYS } from "../../constants";

function AlbumListMore() {
  const { getMoreAlbums } = useAlbums()

  const { data: albums } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.ALBUM_LIST_MORE],
    queryFn: getMoreAlbums
  })

  return albums.map(album => <AlbumCard key={album.s_id} album={album} />)
}

export default AlbumListMore;