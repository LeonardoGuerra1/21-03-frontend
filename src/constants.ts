import { Favorite } from "./models/Favorite"
import { ROUTER } from "./router"

export const API_BASE_URL = "http://localhost:5000"
export const UNAUTHORIZED = 401

export interface ServiceResponse<D = any> {
  ok: boolean
  message: string
  data: D
}

export const QUERY_KEYS = {
  TRACK_LIST: "track-list",
  TRACK_LIST_MORE: "track-list-more",
  ALBUM_LIST: "album-list",
  ALBUM_LIST_MORE: "album-list-more",
  ARTIST_LIST: "artist-list",
  ARTIST_LIST_MORE: "artist-list-more",

  PROFILE_INFO: "profile-info",

  FAVORITE_TRACKS: "favorite-tracks",
  FAVORITE_ALBUMS: "favorite-albums",
  FAVORITE_ARTISTS: "favorite-artists",

  PLAYLIST_LIST: "playlist-list",
  PLAYLIST_FIND: "playlist-find",

  PROFILE_PLAYLISTS: "profile-playlists",
  PROFILE_SECURITY: "profile-security",
  PROFILE_TRANSACTIONS: "profile-transactions",
}

export const FEEDER_LIFE_MS = 2000
export type FeederStatus = "idle" | "loading" | "success" | "error" | "message"


export const FEEDER_STATUS = {
  IDLE: "idle" as FeederStatus,
  LOADING: "loading" as FeederStatus,
  SUCCESS: "success" as FeederStatus,
  ERROR: "error" as FeederStatus,
  MESSAGE: "message" as FeederStatus
}

export interface ProfileFavorites {
  tracks: Favorite[],
  albums: Favorite[],
  artists: Favorite[]
}

export type ItemType = "track" | "album" | "artist"

//===================================================================================================================================
//===================================================================================================================================
// AUTH

export type Action = { type: "login" | "signup" | "playlist" | "logout" | null, id?: string }
export const LOGIN_ACTION: Action = { type: "login" }
export const SIGNUP_ACTION: Action = { type: "signup" }
export const LOGOUT_ACTION: Action = { type: "logout" }
export const NULL_ACTION: Action = { type: null }

export const UNLOGGED_OPTIONS = [
  {
    id: 1,
    label: "Log in",
    action: LOGIN_ACTION
  },
  {
    id: 2,
    label: "Sign up",
    action: SIGNUP_ACTION
  }
]

export const LOGGED_OPTIONS = [
  {
    id: 3,
    label: "See profile",
    action: NULL_ACTION,
    path: `${ROUTER.PROFILE.path}/${ROUTER.PROFILE.sub.PERSONAL_INFO}`
  },
  {
    id: 4,
    label: "Log out",
    action: LOGOUT_ACTION
  }
]

//===================================================================================================================================
//===================================================================================================================================
// AUTH FORMS

export interface LoginForm {
  email: string
  password: string
}

export const LOGIN_DEFAULT: LoginForm = {
  email: "",
  password: ""
}

export const LOGIN_FIELDS = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email"
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password"
  }
]

export interface SignupForm {
  name: string
  lastname: string
  username: string
  age: number | null
  email: string
  password: string
}

export const SIGNUP_DEFAULT: SignupForm = {
  name: "",
  lastname: "",
  username: "",
  age: null,
  email: "",
  password: ""
}

export const SIGNUP_FIELDS = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text"
  },
  {
    id: 2,
    name: "lastname",
    label: "Lastname",
    type: "text"
  },
  {
    id: 3,
    name: "username",
    label: "Username",
    type: "text"
  },
  {
    id: 4,
    name: "age",
    label: "Age",
    type: "number"
  },
  {
    id: 5,
    name: "email",
    label: "Email",
    type: "email"
  },
  {
    id: 6,
    name: "password",
    label: "Password",
    type: "password"
  }
]

//===================================================================================================================================
//===================================================================================================================================
// PROFILE


export const DEFAULT_PROFILE_IMAGE = "https://i.scdn.co/image/ab676161000051747baf6a3e4e70248079e48c5a"

export const PROFILE_OPTIONS = [
  {
    id: 1,
    label: "Personal info",
    path: "personal-info"
  },
  {
    id: 2,
    label: "Favorites",
    path: "favorites"
  },
  {
    id: 3,
    label: "Playlists",
    path: "playlists"
  },
  {
    id: 4,
    label: "Security",
    path: "security"
  },
  {
    id: 5,
    label: "Transactions",
    path: "transactions"
  }
]

export interface PersonalInfoForm {
  name: string
  lastname: string
  age: number
  username: string
}

export const PERSONAL_INFO_FIELDS = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text"
  },
  {
    id: 2,
    name: "lastname",
    label: "Lastname",
    type: "text"
  },
  {
    id: 3,
    name: "age",
    label: "Age",
    type: "number"
  },
  {
    id: 4,
    name: "username",
    label: "Username",
    type: "string"
  }
]

export interface SecurityForm {
  email: string
  newEmail: string
  password: string
  newPassword: string
}

export const SECURITY_FIELDS = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email",
    conditional: false
  },
  {
    id: 2,
    name: "newEmail",
    label: "New email",
    type: "email",
    conditional: true
  },
  {
    id: 3,
    name: "password",
    label: "Password",
    type: "password",
    conditional: false
  },
  {
    id: 4,
    name: "newPassword",
    label: "New password",
    type: "password",
    conditional: true
  }
]