import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { TaskBoard } from "@/components/dashboard/task-board"
import { ExpenseTracker } from "@/components/dashboard/expense-tracker"
import { CoinBalance } from "@/components/dashboard/coin-balance"

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <CoinBalance />
          <TaskBoard />
        </div>
        <div>
          <ExpenseTracker />
        </div>
      </div>
    </DashboardShell>
  )
}