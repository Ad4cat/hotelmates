import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Hotel } from "./HotelsClient";

type Props = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

const InputHotelName = ({ value, onChange, hasError }: Props) => {
  const [suggestions, setSuggestions] = useState<Hotel[]>([]);
  const [close, setClose] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (value.length >= 3) {
        fetch(`/api/search?query=${encodeURIComponent(value)}`, {
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => setSuggestions(data.hotels ?? []))
          .catch((err) => {
            if (err.name !== "AbortError") {
              console.error(err);
              setSuggestions([]);
            }
          });
      } else {
        setSuggestions([]);
      }
    }, 200); // 300ms → 200ms など短縮

    return () => {
      clearTimeout(timer);
      controller.abort(); // 前回リクエストを中断
    };
  }, [value]);

  return (
    <div>
      <Input
        id="hotel_name"
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setClose(true);
        }}
        placeholder="e.g. The Grand Kyoto Hotel"
        className={
          hasError ? "border-red-500" : "border px-3 py-2 rounded w-full"
        }
      />
      {suggestions.length > 0 && close && (
        <ul className="bg-white border rounded shadow p-2 mt-1">
          {suggestions.map((hotel) => (
            <li
              key={hotel.id}
              className="hover:bg-gray-100 px-2 py-1 cursor-pointer"
              onClick={() => {
                onChange(hotel.name);
                setClose(false);
              }}
            >
              {hotel.name} ({hotel.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputHotelName;
