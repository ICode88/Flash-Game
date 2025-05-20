// localStorage utility functions
export const storage = {
  // Game ID storage
  saveGameId: (gameId: string, userId: string, server?: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const gameAccounts = JSON.parse(localStorage.getItem('gameAccounts') || '{}');
      
      // Store by gameId
      gameAccounts[gameId] = {
        userId,
        server: server || '',
        lastUsed: new Date().toISOString(),
      };
      
      localStorage.setItem('gameAccounts', JSON.stringify(gameAccounts));
    } catch (error) {
      console.error('Error saving game ID to localStorage:', error);
    }
  },
  
  getGameAccount: (gameId: string) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const gameAccounts = JSON.parse(localStorage.getItem('gameAccounts') || '{}');
      return gameAccounts[gameId] || null;
    } catch (error) {
      console.error('Error getting game ID from localStorage:', error);
      return null;
    }
  },
  
  // WhatsApp number storage
  saveWhatsAppNumber: (number: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('whatsappNumber', number);
    } catch (error) {
      console.error('Error saving WhatsApp number to localStorage:', error);
    }
  },
  
  getWhatsAppNumber: () => {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem('whatsappNumber');
    } catch (error) {
      console.error('Error getting WhatsApp number from localStorage:', error);
      return null;
    }
  },
  
  // Recent transactions storage
  saveRecentTransaction: (transactionId: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const recentTransactions:any = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
      
      // Add to beginning of array and keep only the last 5
      recentTransactions.unshift(transactionId);
      const uniqueTransactions = [...new Set(recentTransactions)].slice(0, 5);
      
      localStorage.setItem('recentTransactions', JSON.stringify(uniqueTransactions));
    } catch (error) {
      console.error('Error saving recent transaction to localStorage:', error);
    }
  },
  
  getRecentTransactions: () => {
    if (typeof window === 'undefined') return [];
    
    try {
      return JSON.parse(localStorage.getItem('recentTransactions') || '[]');
    } catch (error) {
      console.error('Error getting recent transactions from localStorage:', error);
      return [];
    }
  },
  
  // Clear all storage
  clearAll: () => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('gameAccounts');
      localStorage.removeItem('whatsappNumber');
      localStorage.removeItem('recentTransactions');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};