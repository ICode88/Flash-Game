"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Game } from "@/types";
import GameCard from "@/components/games/GameCard";
import SectionHeading from "@/components/ui/section-heading";

interface FeaturedGamesProps {
  games: Game[];
}

export default function FeaturedGames({ games }: FeaturedGamesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Game Populer"
          description="TopUp kredit game favoritmu dengan mudah dan cepat"
          className="text-center mb-12"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {games.map((game) => (
            <motion.div key={game.id} variants={itemVariants}>
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/games"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-purple-200 hover:bg-purple-100 dark:border-purple-800 dark:hover:bg-purple-900/30"
            )}
          >
            Lihat Semua Game <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}