"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface TaskFormProps {
  initialData?: {
    title: string
    description: string
    status: string
  }
  onSubmit: (data: { title: string; description: string; status: string }) => void
}

export default function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "pending",
  })
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})
  const { loading } = useSelector((state: RootState) => state.tasks)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle>{initialData ? "Edit Task" : "Create New Task"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className={`${errors.title ? "border-destructive" : ""} transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
              />
              {errors.title && (
                <div className="flex items-center text-destructive text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.title}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={5}
                className={`${errors.description ? "border-destructive" : ""} transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none`}
              />
              {errors.description && (
                <div className="flex items-center text-destructive text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-base">
                Status
              </Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full btn-hover-effect" disabled={loading === "pending"}>
              {loading === "pending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {initialData ? "Update Task" : "Create Task"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

