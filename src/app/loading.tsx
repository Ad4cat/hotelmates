"use client";

import { motion } from "framer-motion";
import PlainSVG from "/public/plain.svg";

export default function Loading() {
  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 背景の雲 */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${80 + i * 60}px`,
              height: `${40 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col items-center space-y-8 z-10">
        {/* 飛行機アニメーション */}
        <div className="relative">
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotateZ: [-2, 2, -2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 flex items-center justify-center"
          >
            <PlainSVG className="w-full h-full text-white drop-shadow-lg" />
          </motion.div>

          {/* 飛行機雲（シンプル版） */}
          <motion.div
            className="absolute top-1/2 -left-16 flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0],
              x: [10, -10, -30],
              scaleX: [0.5, 1, 1.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-full opacity-60"
                style={{
                  width: `${8 + i * 3}px`,
                  height: `${4 + i * 1}px`,
                  marginRight: `${2 + i * 0.5}px`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* ローディングテキスト */}
        <div className="flex flex-col items-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-2xl font-light tracking-wide"
          >
            読み込み中
          </motion.h2>

          {/* プログレスドット */}
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* プログレスバー */}
          <div className="w-64 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* 装飾的な要素 */}
      <motion.div
        className="absolute bottom-10 left-10 w-2 h-2 bg-white rounded-full opacity-60"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full opacity-40"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </div>
  );
}
