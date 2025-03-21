import { useEffect, useState } from "react";

export const useOpen = (open: boolean, delayRenderOff = 500) => {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setRender(true)
      setTimeout(() => setShow(true), 10)
    } else {
      setShow(false);
      setTimeout(() => setRender(false), delayRenderOff)
    }
  }, [open]);

  return {
    render,
    show
  }
}