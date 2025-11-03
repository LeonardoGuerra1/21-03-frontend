export interface Playlist {
  _id?: string
  name: string
  items: PlaylistItem[]
  createdAt?: Date
  // userId: number
}

export interface PlaylistItem {
  _id?: string
  s_id: string
  name: string
  image: string
}
