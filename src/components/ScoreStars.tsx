import { Star } from "lucide-react";
import React from "react";

type Props = {
  value: number;
  onChange: (val: number) => void;
  max?: number;
};

export default function ScoreStars({ value, onChange, max = 5 }: Props) {
  const ratio = value / max;

  let colorClass = {
    fill: "fill-gray-300",
    stroke: "stroke-gray-300",
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "",
  };

  if (ratio === 1) {
    colorClass = {
      fill: "fill-emerald-500",
      stroke: "stroke-emerald-500",
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      label: "Great!",
    };
  } else if (ratio >= 0.8) {
    colorClass = {
      fill: "fill-sky-500",
      stroke: "stroke-sky-500",
      bg: "bg-sky-100",
      text: "text-sky-800",
      label: "Good",
    };
  } else if (ratio >= 0.6) {
    colorClass = {
      fill: "fill-yellow-400",
      stroke: "stroke-yellow-400",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Fair",
    };
  } else if (ratio >= 0.4) {
    colorClass = {
      fill: "fill-amber-400",
      stroke: "stroke-amber-400",
      bg: "bg-amber-100",
      text: "text-amber-800",
      label: "Meh",
    };
  } else {
    colorClass = {
      fill: "fill-rose-400",
      stroke: "stroke-rose-400",
      bg: "bg-rose-100",
      text: "text-rose-800",
      label: "Poor",
    };
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < value;
          return (
            <Star
              key={i}
              className={`w-6 h-6 cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95 ${
                filled
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-gray-300 hover:stroke-yellow-400"
              }`}
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
      {/* あんまりoutputである必要ないかもしれない */}
      <output
        aria-label="現在の評価"
        className={`rounded-full px-3 py-1 text-sm font-semibold shadow-sm ${colorClass.bg} ${colorClass.text}`}
      >
        {colorClass.label} {value} / {max}
      </output>
    </div>
  );
}
