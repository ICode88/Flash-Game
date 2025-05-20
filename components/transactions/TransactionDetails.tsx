"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { sendTransactionConfirmation } from "@/lib/whatsapp";
import { Transaction } from "@/types";
import { toast } from "sonner";
import { Copy, Loader2, RefreshCw, Share2, CheckCircle, XCircle, ClockIcon } from "lucide-react";

interface TransactionDetailsProps {
  transaction: Transaction;
}

// Status Badge component
function StatusBadge({ status }: { status: Transaction["status"] }) {
  let bgColor, textColor, icon;
  
  switch (status) {
    case "success":
      bgColor = "bg-green-100 dark:bg-green-900/30";
      textColor = "text-green-800 dark:text-green-300";
      icon = <CheckCircle className="h-4 w-4 mr-1" />;
      break;
    case "failed":
      bgColor = "bg-red-100 dark:bg-red-900/30";
      textColor = "text-red-800 dark:text-red-300";
      icon = <XCircle className="h-4 w-4 mr-1" />;
      break;
    default:
      bgColor = "bg-yellow-100 dark:bg-yellow-900/30";
      textColor = "text-yellow-800 dark:text-yellow-300";
      icon = <ClockIcon className="h-4 w-4 mr-1" />;
  }
  
  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
      {icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}

export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
  const [isResending, setIsResending] = useState(false);
  
  const handleResendWhatsApp = async () => {
    setIsResending(true);
    try {
      await sendTransactionConfirmation(transaction);
      toast.success("WhatsApp notification has been resent.");
    } catch (error) {
      toast.error("Failed to resend WhatsApp notification.");
    } finally {
      setIsResending(false);
    }
  };
  
  const handleCopyTransactionId = () => {
    navigator.clipboard.writeText(transaction.id);
    toast.success("Transaction ID copied to clipboard");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle>Transaction Details</CardTitle>
          <StatusBadge status={transaction.status} />
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <img
                    src={transaction.gameImage}
                    alt={transaction.gameName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{transaction.gameName}</h3>
                  <p className="text-sm text-muted-foreground">Transaction ID: {transaction.id}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Game Account</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">User ID:</div>
                  <div className="font-medium">{transaction.userId}</div>
                  
                  {transaction.server && (
                    <>
                      <div className="text-muted-foreground">Server:</div>
                      <div className="font-medium">{transaction.server}</div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Order Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Amount:</div>
                  <div className="font-medium">{transaction.denomination} Credits</div>
                  
                  <div className="text-muted-foreground">Price:</div>
                  <div className="font-medium">{formatCurrency(transaction.price)}</div>
                  
                  <div className="text-muted-foreground">Payment Method:</div>
                  <div className="font-medium">{transaction.paymentMethod}</div>
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                <h4 className="font-medium mb-3">Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatCurrency(transaction.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Fee:</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>{formatCurrency(transaction.price)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">WhatsApp Notification</h4>
                <div className="text-sm text-muted-foreground">
                  A confirmation has been sent to:<br />
                  <span className="font-medium text-foreground">{transaction.whatsappNumber}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleResendWhatsApp}
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Notification
                    </>
                  )}
                </Button>
              </div>
              
              {transaction.status === "pending" && (
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 p-4">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Payment Pending</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Your payment is being processed. Once completed, your game credits will be delivered instantly.
                  </p>
                </div>
              )}
              
              {transaction.status === "success" && (
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">TopUp Successful</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Your game credits have been successfully delivered to your account. Thank you for your purchase!
                  </p>
                </div>
              )}
              
              {transaction.status === "failed" && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Payment Failed</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Your payment could not be processed. Please try again or contact our customer support for assistance.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap justify-between gap-3 border-t pt-6">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyTransactionId}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy ID
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/check-order">
                Check Other Order
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}