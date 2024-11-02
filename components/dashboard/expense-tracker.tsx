"use client"

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { expensesService } from '@/lib/services/expenses.service'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

export function ExpenseTracker() {
  const queryClient = useQueryClient()
  const householdId = "current-household" // You'll need to get this from context/state

  const { data: expenses, isLoading } = useQuery(
    ['householdExpenses', householdId],
    () => expensesService.getHouseholdExpenses(householdId, { status: 'pending' })
  )

  const markAsPaidMutation = useMutation(
    (expenseId: string) => expensesService.markAsPaid(expenseId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['householdExpenses', householdId])
        toast.success('Expense marked as paid')
      }
    }
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Expenses</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Expenses</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses?.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${expense.paidBy}`} />
                  <AvatarFallback>{expense.paidBy[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-muted-foreground">
                    Paid by {expense.paidBy}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">${expense.amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  Split × {expense.splits.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}