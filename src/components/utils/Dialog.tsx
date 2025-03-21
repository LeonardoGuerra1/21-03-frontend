import { createPortal } from "react-dom";
import { useDialogStore } from "../../stores/useDialogStore";
import { useOpen } from "../../hooks/useOpen";
import { ReactNode } from "react";

interface DialogProps {
  children: ReactNode
}

function Dialog({ children }: DialogProps) {
  const open = useDialogStore().open
  const closeDialog = useDialogStore().closeDialog
  const { render, show } = useOpen(open)
  
  return render
  ? createPortal(
    <div className={`fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center`}>
      <div className={`absolute w-full h-full bg-black/70 ${show ? "opacity-100" : "opacity-0"} duration-300`} onClick={closeDialog}></div>
      <div className={`max-w-dialog min-w-[450px] z-50 rounded-xl p-10 bg-zinc-800 ${show ? "opacity-100 delay-300" : "opacity-0"} duration-300`}>
        {children}
      </div>
    </div>,
    document.body
  ) : null;
}

export default Dialog;