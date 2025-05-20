"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn, formatCurrency, calculateDiscountedPrice } from "@/lib/utils";
import { GameDenomination } from "@/types";

interface DenominationCardProps {
  denomination: GameDenomination;
  isSelected: boolean;
  onSelect: (denomination: GameDenomination) => void;
}

export default function DenominationCard({
  denomination,
  isSelected,
  onSelect,
}: DenominationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const finalPrice = denomination.discount
    ? calculateDiscountedPrice(denomination.price, denomination.discount)
    : denomination.price;
  
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer rounded-lg p-4 transition-all",
        isSelected
          ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500"
          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700"
      )}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(denomination)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center"
        >
          <Check className="h-4 w-4 text-white" />
        </motion.div>
      )}
      
      <div className="text-center space-y-2">
        <h3 className="font-medium text-lg">{denomination.label}</h3>
        
        <div className="space-y-1">
          {denomination.discount ? (
            <>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm line-through text-muted-foreground">
                  {formatCurrency(denomination.price)}
                </span>
                <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded">
                  -{denomination.discount}%
                </span>
              </div>
              <div className="font-semibold text-orange-500">
                {formatCurrency(finalPrice)}
              </div>
            </>
          ) : (
            <div className="font-semibold">
              {formatCurrency(denomination.price)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}