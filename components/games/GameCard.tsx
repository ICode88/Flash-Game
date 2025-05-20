"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Game } from "@/types";

interface GameCardProps {
  game: Game;
  className?: string;
}

export default function GameCard({ game, className }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/games/${game.slug}`}>
      <motion.div
        className={cn(
          "group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />
          
          {/* Publisher Badge */}
          <div className="absolute top-2 left-2 bg-purple-500/90 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full backdrop-blur-sm">
            {game.publisher}
          </div>
          
          {/* Popular Badge */}
          {game.popular && (
            <div className="absolute top-2 right-2 bg-orange-500/90 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              Populer
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">{game.name}</h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-muted-foreground">Mulai dari</span>
            <span className="text-xs sm:text-sm font-semibold text-orange-500">Rp 15.000</span>
          </div>
          
          <motion.div
            className="mt-2 flex items-center justify-center w-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors"
            animate={{
              backgroundColor: isHovered ? "rgba(126, 34, 206, 0.1)" : "rgba(243, 232, 255, 1)",
              color: isHovered ? "rgb(126, 34, 206)" : "rgb(109, 40, 217)",
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="mr-1">TopUp Sekarang</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}