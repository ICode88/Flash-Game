"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionById } from "@/data/transactions";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { ArrowRight, History, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

export default function CheckOrderPage() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<string[]>([]);
  
  // Load recent transactions from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const stored = storage.getRecentTransactions();
      setRecentTransactions(stored);
    }
  });
  
  const handleCheckTransaction = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const transaction = getTransactionById(transactionId);
      
      if (transaction) {
        router.push(`/transactions/${transaction.id}`);
      } else {
        toast.error("Transaction not found. Please check the ID and try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error checking transaction:", error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };
  
  const handleViewRecentTransaction = (id: string) => {
    router.push(`/transactions/${id}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeading
        title="Check Your Order"
        description="Enter your transaction ID to check the status of your order"
        className="text-center mb-12"
      />
      
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>
                Enter your transaction ID to check its status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="transactionId" className="text-sm font-medium">
                    Transaction ID
                  </label>
                  <Input
                    id="transactionId"
                    placeholder="e.g. t1, t2, etc."
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can find this in your transaction confirmation
                  </p>
                </div>
                
                {recentTransactions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <History className="h-4 w-4" />
                      <span>Recent Transactions</span>
                    </div>
                    <div className="space-y-2">
                      {recentTransactions.map((id) => (
                        <button
                          key={id}
                          onClick={() => handleViewRecentTransaction(id)}
                          className="w-full text-left p-2 rounded-md text-sm hover:bg-accent flex items-center justify-between group"
                        >
                          <span>{id}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleCheckTransaction}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Check Order"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}