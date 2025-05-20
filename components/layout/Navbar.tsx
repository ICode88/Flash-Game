"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/icons/Logo";
import { Menu, X, Search, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAllGames } from "@/data/games";

interface NavItem {
  label: string;
  href: string;
  isActive: boolean;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(getAllGames());

  const navItems: NavItem[] = [
    { label: "Beranda", href: "/", isActive: pathname === "/" },
    { label: "Game", href: "/games", isActive: pathname === "/games" || pathname.startsWith("/games/") },
    { label: "Promo", href: "/promo", isActive: pathname === "/promo" },
    { label: "Cek Pesanan", href: "/check-order", isActive: pathname === "/check-order" },
  ];

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = getAllGames().filter(game => 
      game.name.toLowerCase().includes(query.toLowerCase()) ||
      game.publisher.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSearchSelect = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/games/${slug}`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  item.isActive
                    ? "text-orange-500 bg-purple-100 dark:bg-purple-950/40"
                    : "text-foreground/70 hover:text-orange-500 hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-orange-500"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Cari"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/transactions">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/70 hover:text-orange-500"
                aria-label="Riwayat"
              >
                <History className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              className="hidden md:flex bg-purple-500 hover:bg-purple-600 text-white"
            >
              Masuk / Daftar
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    item.isActive
                      ? "text-orange-500 bg-purple-100 dark:bg-purple-950/40"
                      : "text-foreground/70 hover:text-orange-500 hover:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Masuk / Daftar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-4">
            <Input
              placeholder="Cari game..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {searchResults.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleSearchSelect(game.slug)}
                  className="w-full text-left p-2 hover:bg-accent rounded-md flex items-center space-x-3"
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{game.name}</p>
                    <p className="text-sm text-muted-foreground">{game.publisher}</p>
                  </div>
                </button>
              ))}
              {searchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Tidak ada hasil yang ditemukan
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}