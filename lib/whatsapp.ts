// This is a dummy implementation of WhatsApp API integration
// In a real app, this would connect to a real WhatsApp Business API

import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "./utils";

// Simulate sending WhatsApp message
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string
): Promise<boolean> {
  console.log(`[WhatsApp API] Sending message to ${phoneNumber}:`);
  console.log(message);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Success simulation (95% success rate)
  return Math.random() < 0.95;
}

// Generate transaction confirmation message
export function generateTransactionMessage(transaction: Transaction): string {
  // Template for transaction confirmation
  return `
*FlashGames TopUp Confirmation*
Transaction ID: ${transaction.id}
Status: ${transaction.status.toUpperCase()}
Date: ${formatDate(transaction.createdAt)}

Game: ${transaction.gameName}
User ID: ${transaction.userId}
${transaction.server ? `Server: ${transaction.server}` : ''}
Amount: ${transaction.denomination}
Price: ${formatCurrency(transaction.price)}
Payment: ${transaction.paymentMethod}

Thank you for shopping with FlashGames! If you have any questions, please reply to this message.
`;
}

// Send transaction confirmation
export async function sendTransactionConfirmation(
  transaction: Transaction
): Promise<boolean> {
  const message = generateTransactionMessage(transaction);
  return sendWhatsAppMessage(transaction.whatsappNumber, message);
}

// Send payment reminder
export async function sendPaymentReminder(
  transaction: Transaction
): Promise<boolean> {
  const message = `
*FlashGames Payment Reminder*
Transaction ID: ${transaction.id}
Status: PENDING
Game: ${transaction.gameName}

Your payment of ${formatCurrency(transaction.price)} is still pending. Please complete your payment to receive your game credits.

Thank you!
`;
  
  return sendWhatsAppMessage(transaction.whatsappNumber, message);
}

// Send custom notification
export async function sendCustomNotification(
  phoneNumber: string,
  title: string,
  content: string
): Promise<boolean> {
  const message = `
*${title}*

${content}

FlashGames - TopUp Instan, Main Tanpa Batas!
`;
  
  return sendWhatsAppMessage(phoneNumber, message);
}