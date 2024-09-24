import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Structure of data that select can work with
export interface Option  { value: string; label: string; };

type Props = {
  className?: string;
  options: Option[];
  placeholder?: string;
  icon?: IconDefinition;
  onChange: (label:string, value: string) => void;
  selected?: string;
};

export default function CustomSelect({
  className = "",
  placeholder = "",
  options,
  icon,
  onChange,
  selected="",
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (label: string, value: string) => {
    setOpen(false);
    setInputValue("");
    onChange(label,value);// Shares the value with other components
  };

 return (
    <div className="relative w-40 sm:w-48 max-h-5 text-sm">
      {/* The dropdown input box */}
      <div
        onClick={() => setOpen(!open)} // Toggle the dropdown when clicked
        className={`bg-white w-full min-h-6 p-2 flex items-center gap-3 border-2 border-gray-300 text-sm cursor-pointer z-50 ${className}`}
      >
        {/* Render the optional icon, if provided */}
        {icon && <FontAwesomeIcon icon={icon} className="text-primary z-40" />}
        
        {/* Display the selected value, or the placeholder if nothing is selected */}
        {selected
          ? selected.length > 15 // If the selected value is longer than 15 characters, truncate it
            ? selected.substring(0, 15) + "..."
            : selected
          : placeholder}
      </div>
      
      {/* The dropdown list of options */}
      <ul
        className={`absolute top-full left-0 bg-white w-full z-10 border-b-2 border-r-2 border-l-2 border-gray-300 ${
open ? "max-h-60" : "hidden"
} overflow-y-auto`}
      >
        {/* Search input field inside the dropdown */}
        <div className="flex items-center p-2 sticky top-0 bg-white">
          <input
            type="text"
            value={inputValue} // Controlled component linked to inputValue state
            onChange={(e) => setInputValue(e.target.value.toLowerCase())} // Update input value and convert to lowercase
            placeholder="Search" // Placeholder text for search input
            className="placeholder:text-gray-400 outline-none text-sm w-full z-10 mt-6"
          />
        </div>
        
        {/* Map over the options and render a list item for each one */}
        {options.map((option: Option) => (
          <li
            key={option.value} // Use value as the unique key for each option
            className={`p-2 text-sm hover:bg-primary hover:text-white cursor-pointer ${
option.label.toLowerCase() === selected.toLowerCase() &&
"bg-primary text-white"
} ${option.label.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => handleSelect(option.label, option.value)} // Call handleSelect when an option is clicked
          >
            {option.label} {/* Display the label of the option */}
          </li>
        ))}
      </ul>
    </div>
  ); 
}

