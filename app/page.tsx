import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGames from "@/components/home/FeaturedGames";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { getPopularGames } from "@/data/games";

export const metadata: Metadata = {
  title: "FlashGames - TopUp Instan, Main Tanpa Batas!",
  description: "Layanan topup game online terpercaya dengan proses instan, aman, dan harga terbaik. Tersedia untuk Mobile Legends, PUBG, Free Fire, dan game populer lainnya.",
};

export default function Home() {
  const popularGames = getPopularGames();
  
  return (
    <>
      <HeroSection />
      <FeaturedGames games={popularGames} />
      <HowItWorks />
      <Testimonials />
    </>
  );
}