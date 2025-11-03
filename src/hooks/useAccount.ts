import { api } from "../axios/config"
import { API_BASE_URL, PersonalInfoForm, ServiceResponse, SignupForm } from "../constants"
import { User } from "../models/User"
import { useAuthStore } from "../stores/useAuthStore"
import { handleError } from "../utils"

export const useAccount = () => {
  const setAccount = useAuthStore().setAccount
  const unsetAccount = useAuthStore().unsetAccount
  const updateUsername = useAuthStore().updateUsername
  
  const getProfile = async (): Promise<User> => {
    try {
      const { data } = await api.get<ServiceResponse>(API_BASE_URL + "/users/profile")
      const profile = data.data
      return profile
    } catch (error) {
      throw new Error(error as any);
    }
  }
  
  const getSecurity = async (): Promise<User> => {
    try {
      const { data } = await api.get<ServiceResponse>(API_BASE_URL + "/users/security")
      const profile = data.data
      return profile
    } catch (error) {
      throw new Error(error as any);
    }
  }

  const login = async (email: string, password: string): Promise<ServiceResponse> => {
    try {
      const res = await api.post<ServiceResponse>(API_BASE_URL + "/users/login", { email, password })
      const { data } = res
      if (data.ok) setAccount(data.data.username)
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const signup = async (payload: SignupForm): Promise<ServiceResponse> => {
    try {
      const { data } = await api.post<ServiceResponse>(API_BASE_URL + "/users/signup", { payload })
      if (data.ok) setAccount(data.data.username)
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const logout = async (): Promise<ServiceResponse> => {
    try {
      const { data } = await api.post<ServiceResponse>(API_BASE_URL + "/users/logout")
      if (data.ok) unsetAccount()
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const updateInfo = async (payload: PersonalInfoForm): Promise<ServiceResponse> => {
    try {
      const { data } = await api.put<ServiceResponse>(API_BASE_URL + "/users/update-info", { payload })
      if (data.ok) updateUsername(payload.username)
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  const changePassword = async (newPassword: string, oldPassword: string): Promise<ServiceResponse> => {
    try {
      const { data } = await api.put<ServiceResponse>(API_BASE_URL + "/users/change-password", { newPassword, oldPassword })
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  return {
    getProfile,
    getSecurity,
    login,
    signup,
    logout,
    updateInfo,
    changePassword
  }
}