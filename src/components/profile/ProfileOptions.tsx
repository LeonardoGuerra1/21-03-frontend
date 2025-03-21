import { NavLink } from "react-router-dom";
import { PROFILE_OPTIONS } from "../../constants";
import fileIcon from "../../assets/icons/file.svg"
import favoriteIcon from "../../assets/icons/favorite_border.svg"
import playlistIcon from "../../assets/icons/bookmark_border.svg"
import securityIcon from "../../assets/icons/key.svg"
import paymentIcon from "../../assets/icons/payment.svg"

const icons = [fileIcon, favoriteIcon, playlistIcon, securityIcon, paymentIcon]

function ProfileOptions() {
  return (
    <div className="w-full min-profile:w-70 min-profile:mt-[100px]">
      <ul className="w-full h-fit py-4 border-3 min-profile:border-r-0 max-profile:border-b-0 border-white/30 rounded min-profile:rounded-r-none max-profile:rounded-b-none bg-purple/60">
        {PROFILE_OPTIONS.map(option => (
          <li key={option.id}>
            <NavLink
              to={option.path}
              className={(link) => `text-xl w-full px-5 py-2 flex justify-start items-center ${link.isActive ? "font-bold bg-white/5 gap-x-3" : "hover:bg-white/10 gap-x-1.5 opacity-50"} duration-200`}
            >
              <img
                src={icons[option.id - 1]}
                alt=""
              />
              <span>
                {option.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileOptions;