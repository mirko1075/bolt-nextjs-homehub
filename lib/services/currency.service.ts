import apiClient from '../api-client';

export interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  reason: string;
  type: 'TRANSFER' | 'TASK_REWARD' | 'EXPENSE_PAYMENT';
  date: string;
}

export interface TransferCoinsData {
  receiverId: string;
  amount: number;
  reason: string;
  type: 'TRANSFER' | 'TASK_REWARD' | 'EXPENSE_PAYMENT';
}

export const currencyService = {
  async transferCoins(transferData: TransferCoinsData) {
    const { data } = await apiClient.post<Transaction>('/currency/transfer', transferData);
    return data;
  },

  async getBalance() {
    const { data } = await apiClient.get<{ balance: number }>('/currency/balance');
    return data.balance;
  },

  async getTransactions(params?: {
    type?: 'TRANSFER' | 'TASK_REWARD' | 'EXPENSE_PAYMENT';
    startDate?: string;
    endDate?: string;
  }) {
    const { data } = await apiClient.get<Transaction[]>('/currency/transactions', { params });
    return data;
  },
};