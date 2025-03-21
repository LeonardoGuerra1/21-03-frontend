import { AxiosError } from "axios"
import { ItemType, QUERY_KEYS, ServiceResponse } from "./constants"

export function getQueryKeyFromFavoriteType(type: ItemType) {
  return type === "track" ? QUERY_KEYS.FAVORITE_TRACKS
  : type === "album" ? QUERY_KEYS.FAVORITE_ALBUMS
  : QUERY_KEYS.FAVORITE_ARTISTS
}

export function randomNumber(min: number, max: number, decimals: number) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(decimals))
}

export function handleError(error: unknown): ServiceResponse {
  if (error instanceof AxiosError) {
    const { data } = error.response!
    return data as ServiceResponse
  }

  return {
    ok: false,
    data: null,
    message: "Something went wrong"
  }
}
