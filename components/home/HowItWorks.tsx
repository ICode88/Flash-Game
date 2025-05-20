"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, CreditCard, Zap, Check } from "lucide-react";
import SectionHeading from "../ui/section-heading";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function Step({ icon, title, description, delay }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 bg-purple-50 dark:bg-purple-950/10">
      <div ref={ref} className="container mx-auto px-4">
        <SectionHeading
          title="Cara Mudah TopUp Game"
          description="Proses cepat dan mudah dalam 3 langkah sederhana"
          className="text-center mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step
            icon={<Search className="h-8 w-8" />}
            title="Pilih Game"
            description="Pilih game yang ingin kamu TopUp dari berbagai pilihan game populer"
            delay={0.1}
          />
          <Step
            icon={<CreditCard className="h-8 w-8" />}
            title="Pilih Nominal & Bayar"
            description="Pilih nominal topup dan metode pembayaran yang paling nyaman"
            delay={0.2}
          />
          <Step
            icon={<Zap className="h-8 w-8" />}
            title="TopUp Instan"
            description="Kredit game langsung masuk ke akun setelah pembayaran sukses"
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-purple-100 dark:border-purple-800/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">
                Keunggulan FlashGames
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Proses topup instan dan aman</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Harga termurah & berbagai promo</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Layanan pelanggan 24/7</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Notifikasi WhatsApp otomatis</span>
                </li>
              </ul>
            </div>
            <img
              src="https://images.pexels.com/photos/7915601/pexels-photo-7915601.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Gaming Setup"
              className="h-36 w-auto object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}