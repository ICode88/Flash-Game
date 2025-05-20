"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleChat = () => {
    // In a real app, this would open a chat widget or redirect to WhatsApp
    window.open("https://wa.me/6281234567890", "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-[300px]"
          >
            <h3 className="font-medium mb-2">Butuh bantuan?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Customer service kami siap membantu Anda 24/7
            </p>
            <Button
              onClick={handleChat}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Chat Sekarang
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={`rounded-full shadow-lg ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"
        } text-white`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 mr-2" />
            <span>Chat CS</span>
          </>
        )}
      </Button>
    </div>
  );
}