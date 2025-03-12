"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchTaskById, deleteTask } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash, Edit, ArrowLeft, Clock, CheckCircle2, RotateCcw } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TaskDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedTask, loading, error } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id as string))
    }
  }, [dispatch, id])

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteTask(id as string))
      router.push("/")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5" />
      case "in-progress":
        return <RotateCcw className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
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
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="pl-0 btn-hover-effect">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </Button>
          </Link>
        </div>

        {loading === "pending" ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive px-6 py-4 rounded-lg">
            <h3 className="font-semibold mb-1">Error</h3>
            <p>{error}</p>
          </div>
        ) : !selectedTask ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-500 px-6 py-4 rounded-lg">
            <h3 className="font-semibold mb-1">Task Not Found</h3>
            <p>The task you're looking for doesn't exist or has been deleted.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle className="text-2xl md:text-3xl">{selectedTask.title}</CardTitle>
                  <Badge
                    className={`${getStatusColor(selectedTask.status)} flex items-center gap-1 px-3 py-1.5 text-sm`}
                  >
                    {getStatusIcon(selectedTask.status)}
                    <span className="capitalize">{selectedTask.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedTask.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-2 pb-6 px-6">
                <Button variant="destructive" onClick={handleDelete} className="btn-hover-effect">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Task
                </Button>
                <Link href={`/tasks/${id}/edit`}>
                  <Button className="btn-hover-effect">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Task
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

