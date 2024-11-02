import apiClient from '../api-client';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await apiClient.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(userData: RegisterData) {
    const { data } = await apiClient.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};