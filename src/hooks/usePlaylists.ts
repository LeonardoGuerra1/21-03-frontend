import { useQueryClient } from "@tanstack/react-query"
import { api } from "../axios/config"
import { API_BASE_URL, QUERY_KEYS, ServiceResponse } from "../constants"
import { Playlist, PlaylistItem } from "../models/Playlist"
import { handleError } from "../utils"

export const usePlaylists = () => {
  const queryClient = useQueryClient()
  const listPlaylists = async (): Promise<Playlist[]> => {
    try {
      const { data } = await api.get<ServiceResponse<Playlist[]>>(API_BASE_URL + "/playlist/list")
      return data.data
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const findPlaylist = async (id: string): Promise<Playlist> => {
    try {
      const { data } = await api.get<ServiceResponse<Playlist>>(API_BASE_URL + "/playlist/find?id=" + id)
      return data.data
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const createPlaylist = async (item: Playlist): Promise<ServiceResponse<Playlist>> => {
    try {
      const { data } = await api.post<ServiceResponse<Playlist>>(API_BASE_URL + "/playlist/create", { payload: item })
      if (data.ok) {
        queryClient.setQueryData([QUERY_KEYS.PLAYLIST_LIST], (oldData: Playlist[]) => {
          if (!oldData) return []
          return [...oldData, data.data]
        })
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const deletePlaylist = async (id: string): Promise<ServiceResponse> => {
    try {
      const { data } = await api.delete<ServiceResponse>(API_BASE_URL + "/playlist/delete?id=" + id)
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const changeName = async (name: string, id: string): Promise<ServiceResponse> => {
    try {
      const { data } = await api.put<ServiceResponse>(API_BASE_URL + "/playlist/change-name" + id, { name, id })
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const cleanPlaylist = async (playlistId: string): Promise<ServiceResponse> => {
    try {
      const { data } = await api.post<ServiceResponse>(API_BASE_URL + "/playlist/clean", { playlistId })
      if (data.ok) {
        queryClient.setQueryData([QUERY_KEYS.PLAYLIST_LIST], (oldData: Playlist[]) => {
          if (!oldData) return []

          const playlistIndex = oldData.findIndex(p => p._id === playlistId)
          if (playlistIndex === -1) return [...oldData]

          console.log("updated query data");
          oldData[playlistIndex].items = []
          return [...oldData]
        })
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const addItemToPlaylist = async (playlistId: string, item: PlaylistItem): Promise<ServiceResponse> => {
    try {
      const { data } = await api.post<ServiceResponse>(API_BASE_URL + "/playlist/add-item", { playlistId, item })
      if (data.ok) {
        queryClient.setQueryData([QUERY_KEYS.PLAYLIST_LIST], (oldData: Playlist[]) => {
          const playlistIndex = oldData.findIndex(p => p._id === playlistId)
          if (playlistIndex === -1) return [...oldData]

          oldData[playlistIndex].items.push(item)
          return [...oldData]
        })
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const removeItemFromPlaylist = async (playlistId: string, itemId: string, delay = 0): Promise<ServiceResponse> => {
    try {
      const { data } = await api.delete<ServiceResponse>(API_BASE_URL + "/playlist/remove-item?playlistId=" + playlistId + "&itemId=" + itemId)
      if (data.ok) {
        setTimeout(() => {
          queryClient.setQueryData([QUERY_KEYS.PLAYLIST_LIST], (oldData: Playlist[]) => {
            const index = oldData.findIndex(p => p._id === playlistId)
            if (index === -1) return [...oldData]

            const filtereds = oldData[index].items.filter(i => i.s_id !== itemId)
            oldData[index].items = filtereds
            return [...oldData]
          })
        }, delay);
      }
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  return {
    listPlaylists,
    findPlaylist,
    createPlaylist,
    deletePlaylist,
    changeName,
    cleanPlaylist,
    addItemToPlaylist,
    removeItemFromPlaylist
  }
}