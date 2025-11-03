import { useEffect, useRef, useState } from "react";
import { useOpen } from "../../hooks/useOpen";
import { useClickAway } from "../../hooks/useClickAway";
import dropdownArrow from "../../assets/icons/arrow_dropdown.svg"
import { DropdownOption, PLAYLISTS_OPTIONS } from "../../constants";

interface DropdownProps {
  label: string
  options: DropdownOption[]
  onSelect: (value: DropdownOption) => void
}

function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [selected, setSelected] = useState<DropdownOption>(PLAYLISTS_OPTIONS[0]);
  const [openSelect, setOpenSelect] = useState(false);
  const { render, show, clickable } = useOpen(openSelect)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleOption = (value: DropdownOption) => {
    setSelected(value)
    setOpenSelect(false)
    onSelect(value)
  }

  useEffect(() => {
    const clean = useClickAway(buttonRef, () => setOpenSelect(false))
    return () => clean()
  }, []);

  return (
    <div className="flex justify-end items-center gap-x-3">
      <label>
        {label}
      </label>

      <div className="relative w-45 h-10 rounded ring-2 ring-white/20" >
        <button
          className={"w-full h-full px-3 flex justify-between items-center " + (clickable && "cursor-pointer") }
          onClick={() => setOpenSelect(prev => !prev)}
          ref={buttonRef}
          disabled={!clickable}
        >
          {selected.label}
          <img
            src={dropdownArrow}
            alt="Dropdown"
            className={"w-7 duration-300 " + (openSelect ? "rotate-180" : "rotate-0")}
          />
        </button>
        {render && (
          <ul className={`w-full absolute left-0 top-[110%] rounded ring-2 ring-white/30 z-50 bg-black ${show ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"} origin-top duration-200`}>
            {options.map(option => (
              <li key={option.id}>
                <button className="w-full px-7 py-2 text-start cursor-pointer hover:bg-white/10" onClick={() => handleOption(option)}>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;