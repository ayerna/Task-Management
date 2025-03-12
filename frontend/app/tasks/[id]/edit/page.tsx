"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchTaskById, updateTask } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import TaskForm from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"

export default function EditTaskPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedTask, loading, error } = useSelector((state: RootState) => state.tasks)

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id as string))
    }
  }, [dispatch, id])

  const handleSubmit = async (formData: { title: string; description: string; status: string }) => {
    if (id) {
      await dispatch(updateTask({ id: id as string, ...formData }))
      router.push(`/tasks/${id}`)
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/tasks/${id}`}>
            <Button variant="ghost" className="pl-0 btn-hover-effect">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Task
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
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
            <TaskForm initialData={selectedTask} onSubmit={handleSubmit} />
          </div>
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

