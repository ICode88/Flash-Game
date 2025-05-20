import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/icons/Logo";
import { Headphones, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-50 dark:bg-purple-950/20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo className="mb-4" />
            <p className="text-muted-foreground text-sm max-w-xs">
              TopUp Instan, Main Tanpa Batas! Nikmati pengalaman top up game
              online yang cepat, aman, dan terpercaya bersama FlashGames.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="#"
                className="text-purple-500 hover:text-orange-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-purple-500 hover:text-orange-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-purple-500 hover:text-orange-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/games?category=favorite"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Favorite Games
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  All Games
                </Link>
              </li>
              <li>
                <Link
                  href="/games?category=voucher"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Game Vouchers
                </Link>
              </li>
              <li>
                <Link
                  href="/games?category=other"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Other Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                <span className="text-muted-foreground">
                  Jl. Game Center No. 123, Jakarta Pusat, Indonesia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <a
                  href="mailto:hello@flashgames.com"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  hello@flashgames.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Headphones className="h-5 w-5 text-orange-500" />
                <a
                  href="tel:+6281234567890"
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-200 dark:border-purple-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FlashGames. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.pexels.com/photos/6289066/pexels-photo-6289066.jpeg?auto=compress&cs=tinysrgb&w=60"
                alt="Payment Methods"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}