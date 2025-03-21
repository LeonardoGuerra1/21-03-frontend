import { api } from "../axios/config"
import { API_BASE_URL } from "../constants"
import { Artist } from "../models/Artist"

export const useArtists = () => {
  const getArtists = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/artist/list")
      const tracks: Artist[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const getMoreArtists = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/artist/list-more")
      const tracks: Artist[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  return {
    getArtists,
    getMoreArtists
  }
}
