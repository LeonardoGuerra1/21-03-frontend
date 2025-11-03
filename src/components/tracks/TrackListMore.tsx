import { useSuspenseQuery } from "@tanstack/react-query";
import { useTracks } from "../../hooks/useTracks";
import TrackRow from "./TrackRow";
import { QUERY_KEYS } from "../../constants";

function TrackListMore() {
  const { getMoreTracks } = useTracks()

  const { data: tracks } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRACK_LIST_MORE],
    queryFn: getMoreTracks
  })

  return tracks.map(track =>
    <TrackRow
      key={track.s_id}
      track={track}
    />)
}

export default TrackListMore;