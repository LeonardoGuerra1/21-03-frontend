import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg"
import ProfileButton from "./ProfileButton";
import Searcher from "./Searcher";
import NavCartButton from "./NavCartButton";

function Navbar() {
  return (
    <nav className="sticky top-0 left-0 border-b-2 bg-purple z-49 py-3 px-10 border-white/30 flex justify-between items-center">
      <Link
        to="/"
        className="flex justify-center items-center gap-x-1 rounded-full py-1.5 px-5 hover:bg-white/5"
      >
        <img
          src={homeIcon}
          alt=""
          className="w-7"
        />
        <span className="text-2xl italic font-semibold">
          MUSIC LIBRARY STORE
        </span>
      </Link>

      {/* <Searcher /> */}
      
      <div className="flex justify-center items-center">
        <NavCartButton />
        <ProfileButton />
      </div>

    </nav>
  );
}

export default Navbar;