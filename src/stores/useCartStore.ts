import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../models/CartItem";
import { Album } from "../models/Album";

type CartStoreState = {
  list: CartItem[]
}

type CartStoreActions = {
  addItem: (item: Album) => boolean
  removeItem: (id: string) => boolean
  updateQuantityOn: (id: string, quantity: number) => void
  cleanCart: () => void
}

type CartStore = CartStoreState & CartStoreActions

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      list: [],

      addItem: (item) => {
        const list = get().list
        if (list.some(i => i.id === item.s_id))
          return false

        set({
          list: [...list, {
            id: item.s_id,
            item,
            quantity: 1
          }] 
        })
        return true
      },

      removeItem: (id) => {
        const list = get().list
        if (!list.some(i => i.id === id))
          return false

        const filtered = list.filter(i => i.id !== id)
        set({ list: [...filtered ]})
        return true
      },

      updateQuantityOn: (id, quantity) => {
        const list = get().list
        const index = list.findIndex(i => i.id === id)
        if (index === -1) return
        list[index].quantity = quantity
        set({ list: [...list] })
      },

      cleanCart: () => set({ list: [] })
    }), {
      name: "cart-list",
      // partialize: state => state.list
    }
  )
)