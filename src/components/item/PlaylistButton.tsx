import playlistIconBorder from "../../assets/icons/bookmark_border.svg"
import playlistIcon from "../../assets/icons/bookmark.svg"
import { useEffect, useRef, useState } from "react";
import PlaylistDialog from "./PlaylistDialog";
import { Track } from "../../models/Track";
import { useDialogStore } from "../../stores/useDialogStore";
import { DialogAction, FEEDER_LIFE_MS, FEEDER_STATUS, FeederStatus } from "../../constants";
import Feeder from "../utils/Feeder";
import { useAuthStore } from "../../stores/useAuthStore";

interface PlaylistButtonProps {
  item: Track
}

function PlaylistButton({ item }: PlaylistButtonProps) {
  const [added] = useState(false);
  const [openFeeder, setOpenFeeder] = useState(false);
  const [feederStatus, setFeederStatus] = useState<FeederStatus>(FEEDER_STATUS.LOADING);
  const logged = useAuthStore().logged

  const openDialog = useDialogStore().openDialog
  const action = useDialogStore().action
  const itemAction = useRef<DialogAction>({
    type: "playlist", id: item.s_id
  })

  const handleClick = () => {
    if (!logged) {
      setOpenFeeder(true)
      setTimeout(() => setOpenFeeder(false), FEEDER_LIFE_MS);
      return
    }
    openDialog(itemAction.current)
  }

    useEffect(() => {
      if (openFeeder) setFeederStatus(logged ? FEEDER_STATUS.LOADING : FEEDER_STATUS.MESSAGE)
      else setFeederStatus(FEEDER_STATUS.IDLE)
    }, [openFeeder, logged]);

  return (
    <>
      <div className="relative">
        <button
          className="flex justify-center items-center cursor-pointer"
          onClick={handleClick}
          disabled={feederStatus !== "idle"}
        >
          <img src={added ? playlistIcon : playlistIconBorder} alt="Playlist button" />
        </button>

        <Feeder
          key={item.id}
          open={openFeeder}
          status={feederStatus}
          position="top"
        />
      </div>
      {action === itemAction.current && <PlaylistDialog item={item} /> }
    </>
  );
}

export default PlaylistButton;