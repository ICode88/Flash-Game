import { Metadata } from "next";
import { getAllGames } from "@/data/games";
import SectionHeading from "@/components/ui/section-heading";
import GameGrid from "@/components/games/GameGrid";

export const metadata: Metadata = {
  title: "All Games | FlashGames",
  description: "Browse all available games for topup on FlashGames. Find your favorite games and get instant credits at the best prices.",
  keywords: ["game list", "topup games", "mobile games", "pc games", "console games"],
};

export default function GamesPage() {
  const games = getAllGames();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeading
        title="All Games"
        description="Browse all available games for topup"
        className="mb-8"
      />
      
      <GameGrid games={games} />
    </div>
  );
}