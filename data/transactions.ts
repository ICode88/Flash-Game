import { Transaction, TransactionStatus } from "@/types";

// Mock transaction data
export const transactions: Transaction[] = [
  {
    id: "t1",
    gameId: "g1",
    gameName: "Mobile Legends",
    gameImage: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=500",
    userId: "123456789",
    server: "12345",
    denomination: 257,
    price: 60000,
    paymentMethodId: "pm1",
    paymentMethod: "GoPay",
    paymentMethodType: "e-wallet",
    status: "success",
    whatsappNumber: "6281234567890",
    createdAt: "2024-03-20T09:30:00Z",
    updatedAt: "2024-03-20T09:32:00Z",
  },
  {
    id: "t2",
    gameId: "g3",
    gameName: "Free Fire",
    gameImage: "https://images.pexels.com/photos/7915579/pexels-photo-7915579.jpeg?auto=compress&cs=tinysrgb&w=500",
    userId: "987654321",
    server: "",
    denomination: 520,
    price: 80000,
    paymentMethodId: "pm3",
    paymentMethod: "DANA",
    paymentMethodType: "e-wallet",
    status: "pending",
    whatsappNumber: "6281987654321",
    createdAt: "2024-03-20T14:15:00Z",
    updatedAt: "2024-03-20T14:15:00Z",
  },
  {
    id: "t3",
    gameId: "g2",
    gameName: "PUBG Mobile",
    gameImage: "https://images.pexels.com/photos/7915478/pexels-photo-7915478.jpeg?auto=compress&cs=tinysrgb&w=500",
    userId: "567891234",
    server: "",
    denomination: 1800,
    price: 375000,
    paymentMethodId: "pm6",
    paymentMethod: "Bank BCA",
    paymentMethodType: "bank-transfer",
    status: "failed",
    whatsappNumber: "6282345678901",
    createdAt: "2024-03-20T18:45:00Z",
    updatedAt: "2024-03-20T18:50:00Z",
  },
  {
    id: "t4",
    gameId: "g4",
    gameName: "Genshin Impact",
    gameImage: "https://images.pexels.com/photos/7915525/pexels-photo-7915525.jpeg?auto=compress&cs=tinysrgb&w=500",
    userId: "112233445",
    server: "Asia",
    denomination: 980,
    price: 250000,
    paymentMethodId: "pm2",
    paymentMethod: "OVO",
    paymentMethodType: "e-wallet",
    status: "success",
    whatsappNumber: "6282112233445",
    createdAt: "2024-03-20T20:15:00Z",
    updatedAt: "2024-03-20T20:17:00Z",
  },
  {
    id: "t5",
    gameId: "g1",
    gameName: "Mobile Legends",
    gameImage: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=500",
    userId: "998877665",
    server: "54321",
    denomination: 514,
    price: 120000,
    paymentMethodId: "pm4",
    paymentMethod: "ShopeePay",
    paymentMethodType: "e-wallet",
    status: "pending",
    whatsappNumber: "6281998877665",
    createdAt: "2024-03-20T21:30:00Z",
    updatedAt: "2024-03-20T21:30:00Z",
  },
];

// Helper function to get transaction by ID
export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find((transaction) => transaction.id === id);
};

// Helper function to create new transaction
export const createTransaction = (
  transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
): Transaction => {
  const now = new Date().toISOString();
  const newTransaction: Transaction = {
    ...transaction,
    id: `t${transactions.length + 1}`,
    createdAt: now,
    updatedAt: now,
  };
  
  // In a real app, this would save to a database
  transactions.push(newTransaction);
  
  return newTransaction;
};

// Helper function to update transaction status
export const updateTransactionStatus = (
  id: string, 
  status: TransactionStatus
): Transaction | null => {
  const transaction = transactions.find(t => t.id === id);
  
  if (!transaction) {
    return null;
  }
  
  transaction.status = status;
  transaction.updatedAt = new Date().toISOString();
  
  return transaction;
};

// Helper function to get user's transactions
export const getUserTransactions = (
  whatsappNumber: string
): Transaction[] => {
  if (whatsappNumber === "all") {
    return transactions;
  }
  return transactions.filter(t => t.whatsappNumber === whatsappNumber);
};