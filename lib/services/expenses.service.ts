import apiClient from '../api-client';

export interface ExpenseSplit {
  user: string;
  amount: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  householdId: string;
  paidBy: string;
  splits: ExpenseSplit[];
  status: 'pending' | 'paid';
  date: string;
}

export interface CreateExpenseData {
  description: string;
  amount: number;
  householdId: string;
  splits: ExpenseSplit[];
}

export const expensesService = {
  async createExpense(expenseData: CreateExpenseData) {
    const { data } = await apiClient.post<Expense>('/expenses', expenseData);
    return data;
  },

  async getHouseholdExpenses(householdId: string, params?: {
    status?: 'pending' | 'paid';
    startDate?: string;
    endDate?: string;
  }) {
    const { data } = await apiClient.get<Expense[]>(`/expenses/household/${householdId}`, { params });
    return data;
  },

  async markAsPaid(expenseId: string) {
    const { data } = await apiClient.post(`/expenses/${expenseId}/pay`);
    return data;
  },
};