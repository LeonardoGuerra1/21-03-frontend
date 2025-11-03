import { useOpen } from "../../hooks/useOpen";
import successIcon from "../../assets/icons/check.svg"
import errorIcon from "../../assets/icons/warning.svg"
import loadingIcon from "../../assets/icons/loading.svg"
import { FeederStatus, FEEDER_STATUS } from "../../constants";

const NEUTRAL_BG = "bg-neutral-600/90"
const SUCCESS_BG = "bg-green-600/90"
const ERROR_BG = "bg-red-700/90"

const MESSAGE_STYLES = "w-25 h-9"
const ICON_STYLES = "w-11 h-12"
const SET_TOP = "bottom-[110%]"
const SET_BOTTOM = "top-[110%]"

interface FeederProps {
  open: boolean
  status: FeederStatus
  position: "top" | "bottom"
}

function Feeder({ open, status, position }: FeederProps) {
  const { render, show } = useOpen(open)

  const statusObject = 
    status === FEEDER_STATUS.SUCCESS ? { icon: successIcon, bg: SUCCESS_BG }
    : status === FEEDER_STATUS.ERROR ? { icon: errorIcon, bg: ERROR_BG }
    : { icon: loadingIcon, bg: NEUTRAL_BG }

  const showMessage = status === FEEDER_STATUS.MESSAGE

  return render ? (
    <div className={`absolute left-[50%] translate-x-[-50%] ${showMessage ? MESSAGE_STYLES : ICON_STYLES} ${position === "top" ? SET_TOP : SET_BOTTOM} rounded-2xl flex justify-center items-center pointer-events-none ${statusObject.bg} ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"} duration-200`}>
      {showMessage ? (
        <span className="text-sm">
          Log in first!
        </span>
      ) : (
        <img
          src={statusObject.icon}
          alt="Loading"
          className="w-7"
        />
      )}
    </div>
  ) : null;
}

export default Feeder;