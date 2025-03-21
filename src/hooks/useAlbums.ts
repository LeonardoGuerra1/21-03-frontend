import { api } from "../axios/config"
import { API_BASE_URL } from "../constants"
import { Album } from "../models/Album"

export const useAlbums = () => {
  const getAlbums = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/album/list")
      const tracks: Album[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const getMoreAlbums = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/album/list-more")
      const tracks: Album[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  return {
    getAlbums,
    getMoreAlbums
  }
}