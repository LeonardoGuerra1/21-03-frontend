import { ItemType } from "../constants"
import { Album } from "./Album"
import { Artist } from "./Artist"

export interface Track {
  id: string
  s_id: string
  name: string
  image: string
  type: ItemType
}

export interface DetailedTrack extends Track {
  duration: number
  number: number
  album: Album
  artist: Artist
}