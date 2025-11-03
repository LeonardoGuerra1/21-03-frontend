import { useQueryClient } from "@tanstack/react-query"
import { api } from "../axios/config"
import { API_BASE_URL, ItemType, ServiceResponse } from "../constants"
import { Favorite } from "../models/Favorite"
import { getQueryKeyFromFavoriteType, handleError } from "../utils"

export const useFavorites = () => {
  const queryClient = useQueryClient()
  const addItem = async (item: Favorite): Promise<ServiceResponse> => {
    try {
      const { data } = await api.post<ServiceResponse<Favorite>>(API_BASE_URL + "/favorites/save", { payload: item })
      if (data.ok) {
        const queryKey = getQueryKeyFromFavoriteType(data.data.type)
        queryClient.setQueryData([queryKey], (oldData: Favorite[]) => {
          return [...oldData, data.data]
        })
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const deleteItem = async (id: string, type: ItemType, delay = 0): Promise<ServiceResponse> => {
    try {
      const { data } = await api.delete<ServiceResponse>(API_BASE_URL + "/favorites/delete?id=" + id)
      if (data.ok) {
        setTimeout(() => {
          const queryKey = getQueryKeyFromFavoriteType(type)
          queryClient.setQueryData([queryKey], (oldData: Favorite[]) => {
            console.log(oldData);
            const filtered = oldData.filter(f => f.s_id !== id)
            console.log("===============================");
            console.log(filtered);
            return [...filtered]
          })
        }, delay);
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const listFavoritesTracks = async (): Promise<Favorite[]> => {
    try {
      const { data } = await api.get<ServiceResponse<Favorite[]>>(API_BASE_URL + "/favorites/list-tracks")
      return data.data
    } catch (error) {
      throw new Error(error as any)
    }
  }

  const listFavoritesAlbums = async (): Promise<Favorite[]> => {
    try {
      const { data } = await api.get<ServiceResponse<Favorite[]>>(API_BASE_URL + "/favorites/list-albums")
      return data.data
    } catch (error) {
      throw new Error(error as any)
    }
  }

  const listFavoritesArtists = async (): Promise<Favorite[]> => {
    try {
      const { data } = await api.get<ServiceResponse<Favorite[]>>(API_BASE_URL + "/favorites/list-artists")
      return data.data
    } catch (error) {
      throw new Error(error as any)
    }
  }

  return {
    addItem,
    deleteItem,
    listFavoritesTracks,
    listFavoritesAlbums,
    listFavoritesArtists
  }
}