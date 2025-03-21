import TrackRow from "./TrackRow";
import { useTracks } from "../../hooks/useTracks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFavorites } from "../../hooks/useFavorites";

function TrackList() {
  const { getTracks } = useTracks()
  const { listFavoritesTracks } = useFavorites()
  const logged = useAuthStore().logged

  const { data: tracks } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRACK_LIST],
    queryFn: getTracks
  })

  const { data: favorites } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.FAVORITE_TRACKS],
    queryFn: async () => (logged ? await listFavoritesTracks() : [])
  })

  return tracks.map(track =>
    <TrackRow
      key={track.s_id}
      track={track}
      isFavorite={(logged && favorites !== null)
        ? favorites.some(f => f.s_id === track.s_id)
        : false}
    />)
}

export default TrackList;