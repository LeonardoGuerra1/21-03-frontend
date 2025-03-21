import { QUERY_KEYS } from "../../constants";
import { useArtists } from "../../hooks/useArtists";
import ArtistCard from "./ArtistCard";
import { useSuspenseQuery } from "@tanstack/react-query";

function ArtistList() {
  const { getArtists } = useArtists()

  const { data: artists } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTIST_LIST],
    queryFn: getArtists
  })

  return artists.map(artist => <ArtistCard key={artist.s_id} artist={artist} />)
}

export default ArtistList;