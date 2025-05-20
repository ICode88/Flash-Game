"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getTransactionById } from "@/data/transactions";
import { Transaction } from "@/types";
import TransactionDetails from "@/components/transactions/TransactionDetails";
import { Button } from "@/components/ui/button";

export default function TransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTransaction = () => {
      try {
        const foundTransaction = getTransactionById(params.id);
        if (foundTransaction) {
          setTransaction(foundTransaction);
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransaction();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }
  
  if (!transaction) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Transaction Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The transaction you are looking for does not exist or has been removed.
        </p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Back to Home
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Transaction Details</h1>
        <TransactionDetails transaction={transaction} />
      </div>
    </div>
  );
}