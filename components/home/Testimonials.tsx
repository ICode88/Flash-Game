"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "../ui/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  game: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Budi Santoso",
    avatar: "BS",
    role: "Mobile Gamer",
    content: "TopUp diamond ML super cepat, langsung masuk ke akun dan harganya terjangkau. Recommended banget!",
    rating: 5,
    game: "Mobile Legends",
  },
  {
    id: "t2",
    name: "Siti Aminah",
    avatar: "SA",
    role: "Streamer",
    content: "Pelayanan sangat baik dan proses topup instan. Notifikasi WhatsApp sangat membantu untuk tracking status pesanan.",
    rating: 5,
    game: "Free Fire",
  },
  {
    id: "t3",
    name: "Rudi Hermawan",
    avatar: "RH",
    role: "Pro Gamer",
    content: "Saya sudah langganan topup UC PUBG di sini karena prosesnya cepat dan aman. Terima kasih FlashGames!",
    rating: 4,
    game: "PUBG Mobile",
  },
];

export default function Testimonials() {
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
          title="Yang Mereka Katakan"
          description="Testimoni dari pelanggan setia FlashGames"
          className="text-center mb-12"
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center mb-4 space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    <AvatarImage src="" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Game</span>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {testimonial.game}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}