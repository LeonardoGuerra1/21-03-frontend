import axios, { AxiosError } from "axios";
import { API_BASE_URL, LOGOUT_ACTION, UNAUTHORIZED } from "../constants";
import { useDialogStore } from "../stores/useDialogStore";

const dialogStore = useDialogStore.getState()
const openDialog = dialogStore.openDialog

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
})

api.interceptors.response.use(res => res, async (error: AxiosError) => {
  console.log({
    from: "interceptor",
    error
  });

  if (error.status === UNAUTHORIZED) {
    const result = await api.post(API_BASE_URL + "/users/logout")
    if (result.data.ok) {
      openDialog(LOGOUT_ACTION)
    }
  }

  return error.response
})