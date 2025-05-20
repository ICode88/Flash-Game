import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency to IDR
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Validate game ID
export function validateGameId(id: string): boolean {
  return id.trim().length > 0;
}

// Validate Indonesian phone number
export function validateWhatsAppNumber(number: string): boolean {
  // Basic validation for Indonesian numbers
  // Should start with 62 (country code) and have 10-13 digits total
  const regex = /^(62|0)[0-9]{9,12}$/;
  
  // Remove any spaces or special characters
  const cleanNumber = number.replace(/[^0-9]/g, '');
  
  return regex.test(cleanNumber);
}

// Format WhatsApp number to standard format (62...)
export function formatWhatsAppNumber(number: string): string {
  let cleaned = number.replace(/[^0-9]/g, '');
  
  // If starts with 0, replace with 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  return cleaned;
}

// Generate random transaction ID for testing
export function generateTransactionId(): string {
  return `TRX${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000)}`;
}

// Calculate discounted price
export function calculateDiscountedPrice(price: number, discount?: number): number {
  if (!discount) return price;
  
  return Math.round(price - (price * discount / 100));
}

// Simple request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds

export function canMakeRequest(): boolean {
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    return false;
  }
  lastRequestTime = now;
  return true;
}

// Generate a simple hash for transaction security
export function generateTransactionHash(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}