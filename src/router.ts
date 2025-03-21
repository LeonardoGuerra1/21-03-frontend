
export const ROUTER = {
  INDEX: {
    path: "/",
  },
  PROFILE: {
    path: "/profile",
    sub: {
      PERSONAL_INFO: "personal-info",
      FAVORITES: "favorites",
      PLAYLISTS: "playlists",
      SECURITY: "security",
      TRANSACTIONS: "transactions",
    }
  },
  CART: {
    path: "/cart",
    sub: {
      LIST: "list",
      PAYMENT: "payment"
    }
  },
  TRACK: {
    path: "/track"
  },
  ALBUM: {
    path: "/album"
  },
  ARTIST: {
    path: "/artist"
  },
}