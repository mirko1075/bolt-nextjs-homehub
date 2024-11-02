"use client"

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { tasksService } from '@/lib/services/tasks.service'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

const DIFFICULTY_LABELS = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
}

export function TaskBoard() {
  const queryClient = useQueryClient()
  const householdId = "current-household" // You'll need to get this from context/state

  const { data: tasks, isLoading } = useQuery(
    ['householdTasks', householdId],
    () => tasksService.getHouseholdTasks(householdId, { status: 'pending' })
  )

  const completeMutation = useMutation(
    (taskId: string) => tasksService.completeTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['householdTasks', householdId])
        queryClient.invalidateQueries('coinBalance')
        toast.success('Task completed!')
      }
    }
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Tasks</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20" />
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
        <CardTitle>Tasks</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    {DIFFICULTY_LABELS[task.difficulty as keyof typeof DIFFICULTY_LABELS]}
                  </Badge>
                  {task.assignedTo && (
                    <Badge variant="outline">{task.assignedTo}</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-bold text-yellow-500">{task.coins}</span> coins
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => completeMutation.mutate(task.id)}
                >
                  Complete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}