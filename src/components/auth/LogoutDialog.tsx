import { useEffect, useState } from "react";
import Dialog from "../utils/Dialog";
import { useAccount } from "../../hooks/useAccount";
import { useDialogStore } from "../../stores/useDialogStore";
import { useAuthStore } from "../../stores/useAuthStore";

function LogoutDialog() {
  const [message, setMessage] = useState<string | null>(null);
  const { logout } = useAccount()
  const closeDialog = useDialogStore().closeDialog
  const unsetAccount = useAuthStore().unsetAccount


  useEffect(() => {
    const query = async () => {
      const res = await logout()
      if (res.ok) {
        setMessage(res.message)
        unsetAccount()
        setTimeout(() => closeDialog(), 1000)
      }
    }
    query()
  }, []);

  return (
    <Dialog>
      <div className="text-xl font-semibold">
        {message}
      </div>
    </Dialog>
  );
}

export default LogoutDialog;