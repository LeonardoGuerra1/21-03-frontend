import { Favorite } from "../../models/Favorite";
import deleteIcon from "../../assets/icons/delete.svg"
import { useFavorites } from "../../hooks/useFavorites";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

interface FavoritesSectionProps {
  title: string
  list: Favorite[]
}

function FavoritesSection({ title, list }: FavoritesSectionProps) {
  return (
    <div className="w-full my-10">
      <span className="text-2xl font-semibold">
        {title}
      </span>
      <hr className="border-white/50" />
      {list.length > 0
      ? (
        <ul className="my-5 grid favorites-grid grid-flow-dense min-[750px]:grid-cols-2 min-[1430px]:grid-cols-3 gap-x-5">
          {list.map(item =>
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
    </div>
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
    const result = await deleteItem(item.s_id, item.type, 500)
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
