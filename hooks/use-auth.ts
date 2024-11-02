"use client"

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { authService, LoginCredentials, RegisterData } from '@/lib/services/auth.service'
import { toast } from 'sonner'

export function useAuth() {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery(
    'currentUser',
    authService.getCurrentUser,
    { retry: false }
  )

  const loginMutation = useMutation(
    (credentials: LoginCredentials) => authService.login(credentials),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser')
        toast.success('Logged in successfully')
      },
      onError: () => toast.error('Invalid credentials')
    }
  )

  const registerMutation = useMutation(
    (data: RegisterData) => authService.register(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentUser')
        toast.success('Registration successful')
      },
      onError: () => toast.error('Registration failed')
    }
  )

  const logout = () => {
    authService.logout()
    queryClient.clear()
    toast.success('Logged out successfully')
  }

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout
  }
}