"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Option = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  options: Option[];
  placeholder?: string;
  icon: IconDefinition;
};

export default function CustomSelect({ className = "", placeholder = "", options, icon }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-48 max-h-5 text-sm"> 
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center gap-3 border-2 border-gray-300 text-sm ${className}`}
      >
        <FontAwesomeIcon icon={icon} className="text-primary z-40" />
        {selected
          ? selected.length > 25
            ? selected.substring(0, 25) + "..."
            : selected
          : placeholder}
      </div>
      <ul
        className={`absolute top-full left-0 bg-white w-full z-10 border-b-2 border-r-2 border-l-2 border-gray-300 ${
          open ? "max-h-60" : "hidden"
        } overflow-y-auto`}
      > {/* Set the position to absolute, top-full to place it below the input, and z-index to bring it above */}
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search"
            className="placeholder:text-gray-400 outline-none text-sm py-2"
          />
        </div>
        {options.map((option: Option) => (
          <li
            key={option.value}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
              option.label.toLowerCase() === selected.toLowerCase() && "bg-sky-600 text-white"
            } ${option.label.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              if (option.value.toLowerCase() !== selected.toLowerCase()) {
                setSelected(option.label);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

