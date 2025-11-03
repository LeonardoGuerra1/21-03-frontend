import { Favorite } from "../../models/Favorite";
import deleteIcon from "../../assets/icons/delete.svg"
import { useFavorites } from "../../hooks/useFavorites";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../utils/Filter";
import Dropdown from "../utils/Dropdown";
import { FAVORITES_OPTIONS, DropdownOption } from "../../constants";

interface FavoritesSectionProps {
  title: string
  list: Favorite[]
}

function FavoritesSection({ title, list }: FavoritesSectionProps) {
  const [olist, setOlist] = useState<Favorite[]>(list);
  const filterCallback = useCallback((search: string) => {
    setOlist(olist.filter(p => p.name.toLowerCase().includes(search.toLowerCase())))
  }, [olist])

  const sortCallback = useCallback((value: DropdownOption) => {
    if (value.id === 0) {
      setOlist([...list])
      return
    }

    if (value.id === 1) olist.sort((a, b) => {
      const firstDate = new Date(a.createdAt!)
      const secondDate = new Date(b.createdAt!)
      return firstDate.getTime() - secondDate.getTime()
    })
    setOlist([...olist])
  }, [olist])

  return (
    <section className="w-full my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>
        <div className="flex justify-end items-center gap-x-3 divide-x-2 divide-white/30">
          <Filter
            placeholder="Filter by name"
            onSearch={filterCallback}
            onClear={() => setOlist([...list])}
          />
          <Dropdown
             label="Order by"
             onSelect={sortCallback}
             options={FAVORITES_OPTIONS}
          />
        </div>
      </div>
      <hr className="border-white/50 mt-3" />
      {olist.length > 0
        ? (
          <ul className="my-5 grid favorites-grid grid-flow-dense min-[750px]:grid-cols-2 min-[1430px]:grid-cols-3 gap-x-5">
            {olist.map(item =>
              <FavoriteItem
                key={item._id}
                item={item}
              />)}
          </ul>
        ) : (
          <p className="text-lg mt-2 font-medium">
            No favorites here
          </p>
        )}
    </section>
  );
}

export default FavoritesSection;


interface ItemProps {
  item: Favorite
}

const FavoriteItem = ({ item }: ItemProps) => {
  const { deleteItem} = useFavorites()
  const liRef = useRef<HTMLLIElement | null>(null)
  const [fade, setFade] = useState(false);
  
  const handleDelete = async () => {
    const result = await deleteItem(item.s_id, item.type, 300)
    if (result.ok && liRef.current !== null) {
      setFade(true)
    }
  }

  return (
    <li
      className={`pr-2 py-0 flex justify-between items-center rounded group ${fade ? "max-h-0 opacity-0" : "max-h-100"} duration-300`}
      ref={liRef}
    >
      <div className="flex justify-start items-center gap-x-3">
        <Link to={`/${item.type}/${item.s_id}`} className="h-full">
          <div className="w-15">
            <img
              src={item.image}
              alt="Delete"
              className="full object-cover"
            />
          </div>
        </Link>

        <Link to={`/${item.type}/${item.s_id}`}>
          <span>
            {item.name}
          </span>
        </Link>
      </div>

      <div className="opacity-0 group-hover:opacity-100 overflow-hidden duration-100">
        <button className="w-5 cursor-pointer" onClick={handleDelete}>
          <img
            src={deleteIcon}
            alt="Delete"
            className="w-full"
          />
        </button>
      </div>
    </li>
  )
}
