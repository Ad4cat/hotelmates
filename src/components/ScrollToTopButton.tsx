"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // 300px 下にスクロールしたら表示
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-4 right-4 z-50
        p-3 rounded-full shadow-lg
        bg-white hover:bg-accent hover:cursor-pointer
        transition-opacity
      "
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
