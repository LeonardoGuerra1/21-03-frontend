import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg"

function Searcher() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-center items-center gap-x-2">
      <img
        src={searchIcon}
        alt=""
        className={`w-11 bg-white/10 rounded-full p-1.5`}
      />
      <input
        type="text"
        className="w-100 px-6 py-2 outline-0 rounded ring-3 ring-white/10 focus:ring-white/30 focus:bg-neutral-500/10 duration-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for track, album or artist"
      />
    </div>
  );
}

export default Searcher;