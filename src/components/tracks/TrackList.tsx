import TrackRow from "./TrackRow";
import { useTracks } from "../../hooks/useTracks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";

function TrackList() {
  const { getTracks } = useTracks()

  const { data: tracks } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.TRACK_LIST],
    queryFn: getTracks
  })

  return tracks.map(track => <TrackRow key={track.s_id} track={track} />)
}

export default TrackList;