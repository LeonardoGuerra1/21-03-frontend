import { ItemType } from "../constants"

export interface Favorite {
  _id?: string
  s_id: string
  type: ItemType
  name: string
  image: string
  // userId: string
}