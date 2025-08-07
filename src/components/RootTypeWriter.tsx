"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";

const RootTypeWriter = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3  px-4 py-8">
        {/* <Building2 className="w-8 h-8 text-primary" /> */}
        <h1 className="text-center font-mono leading-tight  whitespace-pre-line">
          {/* スマホ用（2行） */}
          <span className="block text-2xl sm:hidden">
            <Typewriter
              words={["Save your stays.\nShare your stories."]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>

          {/* PC用（1行） */}
          <span className="hidden text-3xl sm:inline">
            <Typewriter
              words={["Save your stays. Share your stories."]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

export default RootTypeWriter;
