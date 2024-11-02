import apiClient from '../api-client';

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  coins: number;
  householdId: string;
  assignedTo?: string;
  status: 'pending' | 'completed';
  dueDate?: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  difficulty: number;
  coins: number;
  householdId: string;
  assignedTo?: string;
  dueDate?: string;
}

export const tasksService = {
  async createTask(taskData: CreateTaskData) {
    const { data } = await apiClient.post<Task>('/tasks', taskData);
    return data;
  },

  async getHouseholdTasks(householdId: string, params?: {
    status?: 'pending' | 'completed';
    assignedTo?: string;
    sort?: string;
  }) {
    const { data } = await apiClient.get<Task[]>(`/tasks/household/${householdId}`, { params });
    return data;
  },

  async completeTask(taskId: string, rating?: number, comment?: string) {
    const { data } = await apiClient.post(`/tasks/${taskId}/complete`, { rating, comment });
    return data;
  },

  async assignTask(taskId: string, userId: string) {
    const { data } = await apiClient.post(`/tasks/${taskId}/assign`, { assignedTo: userId });
    return data;
  },
};