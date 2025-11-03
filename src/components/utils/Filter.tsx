import Input from "./Input";
import imageIcon from "../../assets/icons/search.svg"
import { useState } from "react";

interface FilterProps {
  placeholder: string
  onSearch: (search: string) => void
  onClear: () => void
}

function Filter({ placeholder, onSearch, onClear }: FilterProps) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0)  {
      onClear()
    } else {
      setError(false)
    setSearch(e.target.value)
    }
  }

  const handleSearch = () => {
    if (search.length === 0 || error) {
      setError(true)
      return
    }
    onSearch(search)
  }

  return (
    <div className="flex justify-start items-center gap-x-3">
      <div className="w-70">
        <Input
          type="search"
          name="search-playlists"
          placeholder={placeholder}
          onChange={handleChange}
          error={error}
        />
      </div>
      <button
        className="p-2 cursor-pointer rounded-full bg-white/10 hover:bg-white/20"
        onClick={handleSearch}
      >
        <img
          src={imageIcon}
          alt="Search"
        />
      </button>
    </div>
  );
}

export default Filter;