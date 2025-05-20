"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { PaymentMethod } from "@/types";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  isSelected: boolean;
  onSelect: (paymentMethod: PaymentMethod) => void;
}

export default function PaymentMethodCard({
  paymentMethod,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer rounded-lg p-4 transition-all",
        isSelected
          ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500"
          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700"
      )}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(paymentMethod)}
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
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
            {/* This would be an actual image in production */}
            <span className="font-medium text-xs">{paymentMethod.name.slice(0, 2)}</span>
          </div>
          <div>
            <h3 className="font-medium">{paymentMethod.name}</h3>
            {paymentMethod.fee > 0 && (
              <p className="text-xs text-muted-foreground">
                Fee: {formatCurrency(paymentMethod.fee)}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}