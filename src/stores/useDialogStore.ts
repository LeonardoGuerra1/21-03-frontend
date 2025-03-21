import { create } from "zustand";
import { Action } from "../constants";


type DialogStoreState = {
  open: boolean
  action: Action
}

type DialogStoreActions = {
  openDialog: (action: Action) => void
  closeDialog: () => void
  changeAction: (action: Action) => void
}

type DialogStore = DialogStoreState & DialogStoreActions

export const useDialogStore = create<DialogStore>(
  (set) => ({
    open: false,
    action: { type: null },
    openDialog: (action) => set({ open: true, action }),
    closeDialog: () => {
      set({ open: false })
      setTimeout(() => set({ action: { type: null } }), 500)
    },
    changeAction: (action) => set({ action })
  })
) 