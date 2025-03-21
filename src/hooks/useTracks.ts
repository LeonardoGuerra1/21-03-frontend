import { api } from "../axios/config"
import { API_BASE_URL } from "../constants";
import { Track } from "../models/Track";

export const useTracks = () => {

  const getTracks = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/track/list")
      const tracks: Track[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const getMoreTracks = async () => {
    try {
      const { data } = await api.get(API_BASE_URL + "/track/list-more")
      const tracks: Track[] = data.data
      return tracks
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const findTrack = async (id: string) => {
    try {
      const { data } = await api.get(API_BASE_URL + "/track/" + id)
      const track: Track = data.data
      return track
    } catch (error) {
      throw new Error(error as any);
    }
  }

  return {
    getTracks,
    getMoreTracks,
    findTrack
  }
} 