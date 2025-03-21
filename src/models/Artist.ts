import { ItemType } from "../constants"

export interface Artist {
  id: string
  s_id: string
  name: string
  image: string
  type: ItemType
}
