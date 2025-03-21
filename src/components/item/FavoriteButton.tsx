import favoriteIconBorder from "../../assets/icons/favorite_border.svg"
import favoriteIcon from "../../assets/icons/favorite.svg"
import { useEffect, useState } from "react";
import Feeder from "../utils/Feeder";
import { Track } from "../../models/Track";
import { Album } from "../../models/Album";
import { Artist } from "../../models/Artist";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFavorites } from "../../hooks/useFavorites";
import { FEEDER_LIFE_MS, FEEDER_STATUS, FeederStatus } from "../../constants";

interface FavoriteButtonProps {
  item: Track | Album | Artist
  feederPosition: "top" | "bottom"
  initial?: boolean
}

function FavoriteButton({ item, feederPosition, initial }: FavoriteButtonProps) {
  const [added, setAdded] = useState(initial);
  const [openFeeder, setOpenFeeder] = useState(false);
  const [feederStatus, setFeederStatus] = useState<FeederStatus>(FEEDER_STATUS.LOADING);
  const { addItem, deleteItem } = useFavorites()
  const logged = useAuthStore().logged

  const handleClick = async () => {
    setOpenFeeder(true)
    if (!logged) {
      setTimeout(() => setOpenFeeder(false), FEEDER_LIFE_MS);
      return
    }
    
    const result = added
      ? await deleteItem(item.s_id, item.type)
      : await addItem({
        s_id: item.s_id,
        name: item.name,
        image: item.image,
        type: item.type,
      })
    
    if (result.ok) {
      setFeederStatus(FEEDER_STATUS.SUCCESS)
      setAdded(prev => !prev)
    } else {
      setFeederStatus(FEEDER_STATUS.ERROR)
    }
    
    setTimeout(() => setOpenFeeder(false), FEEDER_LIFE_MS);
  }

  useEffect(() => {
    if (openFeeder) setFeederStatus(logged ? FEEDER_STATUS.LOADING : FEEDER_STATUS.MESSAGE)
    else setFeederStatus(FEEDER_STATUS.IDLE)

    if (!logged) setAdded(false)
  }, [openFeeder, logged]);

  return (
    <div className="relative">
      <button
        className={"flex justify-center " + (feederStatus === "idle" && "cursor-pointer")}
        onClick={handleClick}
        disabled={feederStatus !== "idle"}
      >
        <img src={added ? favoriteIcon : favoriteIconBorder} alt="Favorite button" />
      </button>

      <Feeder
        key={item.id}
        open={openFeeder}
        status={feederStatus}
        position={feederPosition}
      />
    </div>
  );
}

export default FavoriteButton;