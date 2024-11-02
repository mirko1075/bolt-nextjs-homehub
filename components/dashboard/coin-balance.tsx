"use client"

import { useQuery } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from "lucide-react"
import { currencyService } from '@/lib/services/currency.service'
import { Skeleton } from '@/components/ui/skeleton'

export function CoinBalance() {
  const { data: balance, isLoading } = useQuery(
    'coinBalance',
    currencyService.getBalance
  )

  const { data: transactions } = useQuery(
    'recentTransactions',
    () => currencyService.getTransactions({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  )

  const weeklyEarnings = transactions?.reduce((sum, tx) => 
    tx.type === 'TASK_REWARD' ? sum + tx.amount : sum, 0) || 0

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Coin Balance</CardTitle>
          <Coins className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32 mt-2" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Coin Balance</CardTitle>
        <Coins className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{balance}</div>
        <p className="text-xs text-muted-foreground">
          +{weeklyEarnings} earned this week
        </p>
      </CardContent>
    </Card>
  )
}