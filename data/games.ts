import { Game, GameDenomination } from "@/types";

export const games: Game[] = [
  {
    id: "g1",
    name: "Mobile Legends",
    slug: "mobile-legends",
    image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Moonton",
    popular: true,
    featured: true,
  },
  {
    id: "g2",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    image: "https://images.pexels.com/photos/7915478/pexels-photo-7915478.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Tencent Games",
    popular: true,
    featured: false,
  },
  {
    id: "g3",
    name: "Free Fire",
    slug: "free-fire",
    image: "https://images.pexels.com/photos/7915579/pexels-photo-7915579.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Garena",
    popular: true,
    featured: true,
  },
  {
    id: "g4",
    name: "Genshin Impact",
    slug: "genshin-impact",
    image: "https://images.pexels.com/photos/7915525/pexels-photo-7915525.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "miHoYo",
    popular: true,
    featured: false,
  },
  {
    id: "g5",
    name: "Call of Duty: Mobile",
    slug: "call-of-duty-mobile",
    image: "https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Activision",
    popular: true,
    featured: false,
  },
  {
    id: "g6",
    name: "League of Legends: Wild Rift",
    slug: "league-of-legends-wild-rift",
    image: "https://images.pexels.com/photos/7915565/pexels-photo-7915565.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Riot Games",
    popular: false,
    featured: true,
  },
  {
    id: "g7",
    name: "Valorant",
    slug: "valorant",
    image: "https://images.pexels.com/photos/7915521/pexels-photo-7915521.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Riot Games",
    popular: false,
    featured: false,
  },
  {
    id: "g8",
    name: "Apex Legends Mobile",
    slug: "apex-legends-mobile",
    image: "https://images.pexels.com/photos/7915528/pexels-photo-7915528.jpeg?auto=compress&cs=tinysrgb&w=500",
    publisher: "Electronic Arts",
    popular: false,
    featured: false,
  },
];

export const gameDenominations: Record<string, GameDenomination[]> = {
  g1: [
    { id: "d1", gameId: "g1", amount: 86, price: 20000, label: "86 Diamonds" },
    { id: "d2", gameId: "g1", amount: 172, price: 40000, label: "172 Diamonds" },
    { id: "d3", gameId: "g1", amount: 257, price: 60000, label: "257 Diamonds" },
    { id: "d4", gameId: "g1", amount: 344, price: 80000, label: "344 Diamonds" },
    { id: "d5", gameId: "g1", amount: 429, price: 100000, label: "429 Diamonds" },
    { id: "d6", gameId: "g1", amount: 514, price: 120000, label: "514 Diamonds", discount: 10 },
    { id: "d7", gameId: "g1", amount: 600, price: 140000, label: "600 Diamonds", discount: 10 },
    { id: "d8", gameId: "g1", amount: 706, price: 160000, label: "706 Diamonds", discount: 12 },
  ],
  g2: [
    { id: "d9", gameId: "g2", amount: 60, price: 15000, label: "60 UC" },
    { id: "d10", gameId: "g2", amount: 325, price: 75000, label: "325 UC" },
    { id: "d11", gameId: "g2", amount: 660, price: 150000, label: "660 UC" },
    { id: "d12", gameId: "g2", amount: 1800, price: 375000, label: "1800 UC", discount: 5 },
    { id: "d13", gameId: "g2", amount: 3850, price: 750000, label: "3850 UC", discount: 10 },
  ],
  g3: [
    { id: "d14", gameId: "g3", amount: 100, price: 15000, label: "100 Diamonds" },
    { id: "d15", gameId: "g3", amount: 310, price: 50000, label: "310 Diamonds", discount: 5 },
    { id: "d16", gameId: "g3", amount: 520, price: 80000, label: "520 Diamonds", discount: 8 },
    { id: "d17", gameId: "g3", amount: 1060, price: 150000, label: "1060 Diamonds", discount: 12 },
    { id: "d18", gameId: "g3", amount: 2180, price: 300000, label: "2180 Diamonds", discount: 15 },
  ],
  g4: [
    { id: "d19", gameId: "g4", amount: 60, price: 16000, label: "60 Genesis Crystals" },
    { id: "d20", gameId: "g4", amount: 300, price: 80000, label: "300 Genesis Crystals" },
    { id: "d21", gameId: "g4", amount: 980, price: 250000, label: "980 Genesis Crystals", discount: 5 },
    { id: "d22", gameId: "g4", amount: 1980, price: 480000, label: "1980 Genesis Crystals", discount: 12 },
    { id: "d23", gameId: "g4", amount: 3280, price: 800000, label: "3280 Genesis Crystals", discount: 15 },
  ],
  g5: [
    { id: "d24", gameId: "g5", amount: 80, price: 15000, label: "80 CP" },
    { id: "d25", gameId: "g5", amount: 400, price: 70000, label: "400 CP" },
    { id: "d26", gameId: "g5", amount: 800, price: 140000, label: "800 CP", discount: 5 },
    { id: "d27", gameId: "g5", amount: 2000, price: 330000, label: "2000 CP", discount: 10 },
  ],
  g6: [
    { id: "d28", gameId: "g6", amount: 105, price: 16000, label: "105 Wild Cores" },
    { id: "d29", gameId: "g6", amount: 520, price: 75000, label: "520 Wild Cores" },
    { id: "d30", gameId: "g6", amount: 1040, price: 150000, label: "1040 Wild Cores", discount: 5 },
    { id: "d31", gameId: "g6", amount: 2600, price: 375000, label: "2600 Wild Cores", discount: 10 },
  ],
  g7: [
    { id: "d32", gameId: "g7", amount: 475, price: 50000, label: "475 VP" },
    { id: "d33", gameId: "g7", amount: 1000, price: 100000, label: "1000 VP" },
    { id: "d34", gameId: "g7", amount: 2050, price: 200000, label: "2050 VP", discount: 5 },
    { id: "d35", gameId: "g7", amount: 3650, price: 350000, label: "3650 VP", discount: 10 },
    { id: "d36", gameId: "g7", amount: 7400, price: 700000, label: "7400 VP", discount: 15 },
  ],
  g8: [
    { id: "d37", gameId: "g8", amount: 500, price: 55000, label: "500 Apex Coins" },
    { id: "d38", gameId: "g8", amount: 1000, price: 100000, label: "1000 Apex Coins" },
    { id: "d39", gameId: "g8", amount: 2150, price: 215000, label: "2150 Apex Coins", discount: 5 },
    { id: "d40", gameId: "g8", amount: 4350, price: 420000, label: "4350 Apex Coins", discount: 8 },
    { id: "d41", gameId: "g8", amount: 8700, price: 800000, label: "8700 Apex Coins", discount: 12 },
  ],
};

export function getGameBySlug(slug: string): Game | undefined {
  return games.find(game => game.slug === slug);
}

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id);
}

export function getDenominationsByGameId(gameId: string): GameDenomination[] {
  return gameDenominations[gameId] || [];
}

export function getFeaturedGames(): Game[] {
  return games.filter(game => game.featured);
}

export function getPopularGames(): Game[] {
  return games.filter(game => game.popular);
}

export function getAllGames(): Game[] {
  return games;
}