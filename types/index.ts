// Game-related types
export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  publisher: string;
  popular: boolean;
  featured: boolean;
}

export interface GameDenomination {
  id: string;
  gameId: string;
  amount: number;
  price: number;
  discount?: number;
  label?: string;
}

// Payment-related types
export interface PaymentMethod {
  id: string;
  name: string;
  type: 'e-wallet' | 'bank-transfer' | 'retail' | 'credit-card';
  image: string;
  fee: number;
}

// Transaction-related types
export type TransactionStatus = 'pending' | 'success' | 'failed';

export interface Transaction {
  id: string;
  gameId: string;
  gameName: string;
  gameImage: string;
  userId: string;
  server: string;
  denomination: number;
  price: number;
  paymentMethodId: string;
  paymentMethod: string;
  paymentMethodType: string;
  status: TransactionStatus;
  whatsappNumber: string;
  createdAt: string;
  updatedAt: string;
}

// User-related types
export interface UserGameAccount {
  id: string;
  gameId: string;
  userId: string;
  server?: string;
  lastUsed: string;
}