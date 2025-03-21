import { RefObject } from "react"

type ContainsElement = HTMLDivElement | HTMLUListElement

export const useClickAway = <T>(ref: RefObject<T | null>, callback: () => void) => {
  const handleClickAway = (e: MouseEvent) => {
    if (ref.current !== null && !((ref.current as ContainsElement).contains(e.target as Node))) {
      callback()
    }
  }

  document.body.addEventListener("click", handleClickAway)
  return () => document.body.removeEventListener("click", handleClickAway)
}