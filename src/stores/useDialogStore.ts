import { create } from "zustand";
import { DialogAction } from "../constants";

type DialogStoreState = {
  open: boolean
  action: DialogAction
}

type DialogStoreActions = {
  openDialog: (action: DialogAction) => void
  closeDialog: () => void
  changeAction: (action: DialogAction) => void
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