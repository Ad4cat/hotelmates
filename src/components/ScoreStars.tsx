import { Star } from "lucide-react";
import React from "react";

type Props = {
  value: number;
  onChange: (val: number) => void;
  max?: number;
};

export default function ScoreStars({ value, onChange, max = 5 }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value;
        return (
          <Star
            key={i}
            className={`w-6 h-6 cursor-pointer transition-transform hover:scale-120 ${
              filled ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"
            } active:scale-80`}
            onClick={() => {
              // もし今のvalueが(i + 1)なら減らす（1個戻す）
              if (value === i + 1) {
                onChange(i);
              } else {
                onChange(i + 1);
              }
            }}
          />
        );
      })}
    </div>
  );
}
