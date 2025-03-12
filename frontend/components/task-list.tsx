"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Eye, Clock, CheckCircle2, RotateCcw } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  if (loading === "pending") {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-12 bg-muted/50 rounded-lg border border-dashed">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No tasks found</h2>
        <p className="text-muted-foreground mb-6">Get started by creating your first task</p>
        <Link href="/tasks/new">
          <Button className="btn-hover-effect">Create Task</Button>
        </Link>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <RotateCcw className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="task-card h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xl font-medium line-clamp-2">{task.title}</h3>
                <Badge className={`${getStatusColor(task.status)} flex items-center gap-1`}>
                  {getStatusIcon(task.status)}
                  <span>{task.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <p className="text-muted-foreground line-clamp-3">{task.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/tasks/${task.id}`} className="w-full">
                <Button variant="outline" className="w-full btn-hover-effect">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

