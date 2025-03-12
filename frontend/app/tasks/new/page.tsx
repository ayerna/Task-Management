"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { addTask } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch } from "@/lib/store"
import TaskForm from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTaskPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (formData: { title: string; description: string; status: string }) => {
    await dispatch(addTask(formData))
    router.push("/")
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
          <TaskForm onSubmit={handleSubmit} />
        </div>
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

