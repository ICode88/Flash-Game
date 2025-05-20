"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction } from "@/types";
import { getUserTransactions } from "@/data/transactions";
import SectionHeading from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2, XCircle } from "lucide-react";

// Helper function to mask phone number
const maskPhoneNumber = (phone: string) => {
  return phone.slice(0, 4) + "****" + phone.slice(-4);
};

// Helper function to mask transaction ID
const maskTransactionId = (id: string) => {
  return id.slice(0, 2) + "***" + id.slice(-2);
};

// Status badge component
const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const getStatusConfig = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return {
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
        };
      case "failed":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          icon: <XCircle className="h-4 w-4 mr-1" />,
        };
      default:
        return {
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          icon: <Clock className="h-4 w-4 mr-1" />,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={`flex items-center ${config.color}`}>
      {config.icon}
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulate real-time updates
  useEffect(() => {
    // Initial load
    const loadTransactions = () => {
      // In a real app, this would fetch from an API
      const allTransactions = getUserTransactions("all");
      // Sort by date descending and take last 10
      const recentTransactions = allTransactions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
      setTransactions(recentTransactions);
    };

    loadTransactions();

    // Set up polling for real-time updates
    const interval = setInterval(loadTransactions, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeading
        title="Transaction History"
        description="View your recent transactions"
        className="mb-8"
      />

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/transactions/${transaction.id}`}>
              <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden">
                      <img
                        src={transaction.gameImage}
                        alt={transaction.gameName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{transaction.gameName}</h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {maskTransactionId(transaction.id)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(transaction.price)}</p>
                      <p className="text-sm text-muted-foreground">
                        {maskPhoneNumber(transaction.whatsappNumber)}
                      </p>
                    </div>
                    <StatusBadge status={transaction.status} />
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}