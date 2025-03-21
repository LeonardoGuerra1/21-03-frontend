import { useSuspenseQuery } from "@tanstack/react-query";
import { useTracks } from "../../hooks/useTracks";
import TrackRow from "./TrackRow";
import { QUERY_KEYS } from "../../constants";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuthStore } from "../../stores/useAuthStore";

function TrackListMore() {
  const { getMoreTracks } = useTracks()
  const { listFavoritesTracks } = useFavorites()
  const logged = useAuthStore().logged

  const { data: tracks } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRACK_LIST_MORE],
    queryFn: getMoreTracks
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

export default TrackListMore;