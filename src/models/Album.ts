import { ItemType } from "../constants"
import { Artist } from "./Artist"
import { Track } from "./Track"

export interface Album {
  id: string
  s_id: string
  name: string
  image: string
  type: ItemType
  price: number
  stock: number
  isAvaliable: boolean
}

export interface DetailedAlbum extends Album {
  gallery: string[]
  release: string
  totalTracks: number
  tracks: Track[]
  artist: Artist
}