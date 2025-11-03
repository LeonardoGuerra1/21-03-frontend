import { useEffect, useState } from "react";

export const useOpen = (open: boolean, transition = 500, delayRenderOff = 500) => {
  const [render, setRender] = useState(open);
  const [show, setShow] = useState(open);
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    setClickable(false)
    if (open) {
      setRender(true)
      setTimeout(() => setShow(true), 10)
    } else {
      setShow(false);
      setTimeout(() => setRender(false), delayRenderOff)
    }
    setTimeout(() => setClickable(true), transition);
  }, [open]);

  return {
    render,
    show,
    clickable
  }
}