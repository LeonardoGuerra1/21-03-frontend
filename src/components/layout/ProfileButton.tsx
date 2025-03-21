import { useEffect, useRef, useState } from "react";
import userIcon from "../../assets/icons/user.svg"
import { useNavigate } from "react-router-dom";
import { useDialogStore } from "../../stores/useDialogStore";
import { useClickAway } from "../../hooks/useClickAway";
import LoginDialog from "../auth/LoginDialog";
import { useOpen } from "../../hooks/useOpen";
import { Action, LOGGED_OPTIONS, LOGIN_ACTION, LOGOUT_ACTION, SIGNUP_ACTION, UNLOGGED_OPTIONS } from "../../constants";
import SignupDialog from "../auth/SignupDialog";
import { useAuthStore } from "../../stores/useAuthStore";
import LogoutDialog from "../auth/LogoutDialog";

function ProfileButton() {
  const [openMenu, setOpenMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const action = useDialogStore().action
  const openDialog = useDialogStore().openDialog
  const { render, show } = useOpen(openMenu)
  
  const logged = useAuthStore().logged
  const username = useAuthStore().username

  const ulRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const clean = useClickAway(ulRef, () => setOpenMenu(false))
    return clean
  }, []);

  const handleButton = () => {
    setDisabled(true)
    setOpenMenu(prev => !prev)
    setTimeout(() => setDisabled(false), 500);
  }

  const handleSelect = (newAction: Action) => {
    openDialog(newAction)
    setOpenMenu(false)
  }
  
  return (
    <div className="relative">
      <button
        className="px-2 h-11 rounded-full cursor-pointer flex justify-center items-center hover:bg-white/10"
        onClick={handleButton} 
        disabled={disabled}
      >
        {logged && (
          <span className="italic">
            {username}
          </span>
        )}
        <img
          src={userIcon}
          alt=""
          className="w-9 h-9"
        />
      </button>
      {render && (
        <ul
          className={`absolute top-full right-0 w-40 py-2 rounded ring-2 ring-white/10 bg-dark ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"} origin-top-right duration-200`}
          ref={ulRef}
        >
          {logged
            ? <LoggedOptions onSelect={handleSelect} />
            : <UnloggedOptions onSelect={handleSelect} />}
        </ul>
      )}

      {action == LOGIN_ACTION && <LoginDialog />}
      {action == SIGNUP_ACTION && <SignupDialog />}
      {action == LOGOUT_ACTION && <LogoutDialog />}
    </div>
  );
}

export default ProfileButton;

interface OptionsProps {
  onSelect: (action: Action) => void
}

const UnloggedOptions = ({ onSelect }: OptionsProps) => {
  return UNLOGGED_OPTIONS.map(option => (
    <li key={option.id}>
      <button
        className="w-full text-start text-lg py-1 px-3 cursor-pointer hover:bg-neutral-500/10"
        onClick={() => onSelect(option.action)}
      >
        {option.label}
      </button>
    </li>
  ))
}

const LoggedOptions = ({ onSelect }: OptionsProps) => {
  const navigate = useNavigate()
  const handleSelect = (action: Action, path?: string | null) => {
    onSelect(action)
    if (path !== null)
      navigate(path!)
  }

  return LOGGED_OPTIONS.map(option => (
    <li key={option.id}>
      <button
        className="w-full text-start text-lg py-1 px-3 cursor-pointer hover:bg-neutral-500/10"
        onClick={() => handleSelect(option.action, option.path ?? null)}
      >
        {option.label}
      </button>
    </li>
  ))
}