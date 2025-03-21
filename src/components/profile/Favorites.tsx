import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";
import { useFavorites } from "../../hooks/useFavorites";
import FavoritesSection from "./FavoritesSection";

function Favorites() {
  const { listFavoritesTracks, listFavoritesAlbums, listFavoritesArtists } = useFavorites()
  
  const { data: tracks } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.FAVORITE_TRACKS],
    queryFn: listFavoritesTracks,
  })
  const { data: albums } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.FAVORITE_ALBUMS],
    queryFn: listFavoritesAlbums,
  })
  const { data: artists } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.FAVORITE_ARTISTS],
    queryFn: listFavoritesArtists,
  })

  return (
    <>
      <FavoritesSection title="Tracks" list={tracks} />
      <FavoritesSection title="Albums" list={albums} />
      <FavoritesSection title="Artists" list={artists} />
    </>
  );
}

export default Favorites;


