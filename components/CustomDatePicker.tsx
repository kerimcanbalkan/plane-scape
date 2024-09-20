import { faCalendar, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";


type Props = {
  className?: string;
  placeholder?: string;
  onChange: (value: Date) => void;
  disabled?: boolean
};



const CustomInput = forwardRef<HTMLDivElement, any>(
  ({ value, onClick, className, disabled }, ref) => (
    <div
      className={`bg-white w-48 min-h-4 p-2 flex items-center gap-3 border-2 border-gray-300 text-sm cursor-pointer ${disabled ? "opacity-50" : "opacity-100"} ${className}`}
      onClick={onClick}
      ref={ref}
    >
      <FontAwesomeIcon icon={faCalendar} className="text-primary z-40" />
      {value || ""} 
    </div>
  )
);

export default function CustomDatePicker({ className = "" , placeholder="", onChange, disabled=false}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => {
        setStartDate(date)
        if (date){
        onChange(date);
        }
      }}
      customInput={<CustomInput className={className} disabled={disabled} />}
      dateFormat="MM/dd/yyyy"
      minDate={new Date()}
      disabled={disabled}
      placeholderText={placeholder}
    />
  );
}

