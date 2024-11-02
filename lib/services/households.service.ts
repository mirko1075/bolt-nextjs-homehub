import apiClient from '../api-client';
import { User } from './auth.service';

export interface Household {
  id: string;
  name: string;
  inviteCode: string;
  members: User[];
}

export interface CreateHouseholdData {
  name: string;
}

export const householdsService = {
  async createHousehold(data: CreateHouseholdData) {
    const { data: response } = await apiClient.post<Household>('/households', data);
    return response;
  },

  async joinHousehold(inviteCode: string) {
    const { data } = await apiClient.post<Household>('/households/join', { inviteCode });
    return data;
  },

  async getHouseholdDetails(householdId: string, include?: string[]) {
    const { data } = await apiClient.get<Household>(`/households/${householdId}`, {
      params: { include: include?.join(',') },
    });
    return data;
  },
};