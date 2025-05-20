"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Zap } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-orange-300/20 dark:bg-orange-700/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-300/20 dark:bg-purple-700/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0 text-center lg:text-left"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" /> Promo Spesial Mingguan
            </motion.div>
            
            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              TopUp Instan, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Main Tanpa Batas!</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              TopUp game favoritmu dengan cepat, aman, dan harga terbaik. Proses instan dan langsung masuk ke akun game Anda.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Link href="/games">
                  TopUp Sekarang <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-purple-200 hover:bg-purple-100 dark:border-purple-800 dark:hover:bg-purple-900/30"
              >
                <Link href="/check-order">
                  Cek Status Pesanan
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={item} className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-muted-foreground">(2.5k+ reviews)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Game TopUp"
                  className="w-full h-auto"
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-4 left-4 px-3 py-1.5 bg-purple-600/90 text-white text-sm font-medium rounded-full backdrop-blur-sm"
                >
                  Diskon 20%
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500 rounded-xl -z-10 blur-md opacity-20"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500 rounded-full -z-10 blur-md opacity-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}