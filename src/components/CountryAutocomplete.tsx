import { useState } from "react";
import { useAppSelector } from "../store/store";

interface Props {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

/* eslint-disable react/prop-types */

const CountryAutocomplete: React.FC<Props> = ({ value, onChange, id }) => {
  const countries = useAppSelector((state) => state.formData.countries);
  const [isOpen, setIsOpen] = useState(false);
  const filtered = countries.filter((c) =>
    c.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="border w-full p-2"
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border max-h-40 overflow-y-auto w-full">
          {filtered.map((c) => (
            <li
              key={c}
              onClick={() => {
                onChange(c);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
