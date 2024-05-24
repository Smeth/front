"use client"

import { SwitcherProps } from "@/types/forms";
import { useState, useEffect } from "react"

const Switcher = ({ name, id, checked }: SwitcherProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    setEnabled(checked)
  }, [checked])
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            name={name}
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className={"block h-6 w-10 rounded-full " + (enabled ? "bg-secondary-800" : "bg-[#5A616B]")}></div>
          <div
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
  )
}

export default Switcher
