import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Types
interface Task {
  id: string
  title: string
  description: string
  status: string
}

interface TasksState {
  tasks: Task[]
  selectedTask: Task | null
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

// Initial state
const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  loading: "idle",
  error: null,
}

// Mock API functions (replace with actual API calls)
const mockApi = {
  getTasks: async (): Promise<Task[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Get tasks from localStorage or return default tasks
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      return JSON.parse(storedTasks)
    }

    // Default tasks if none exist
    const defaultTasks: Task[] = [
      {
        id: "1",
        title: "Complete project documentation",
        description:
          "Write comprehensive documentation for the new feature set including API endpoints and usage examples.",
        status: "pending",
      },
      {
        id: "2",
        title: "Fix navigation bug",
        description: "Address the issue where the dropdown menu doesn't close when clicking outside of it.",
        status: "in-progress",
      },
      {
        id: "3",
        title: "Update dependencies",
        description: "Update all npm packages to their latest versions and ensure compatibility.",
        status: "completed",
      },
    ]

    localStorage.setItem("tasks", JSON.stringify(defaultTasks))
    return defaultTasks
  },

  getTaskById: async (id: string): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const storedTasks = localStorage.getItem("tasks")
    if (!storedTasks) {
      throw new Error("Task not found")
    }

    const tasks: Task[] = JSON.parse(storedTasks)
    const task = tasks.find((t) => t.id === id)

    if (!task) {
      throw new Error("Task not found")
    }

    return task
  },

  createTask: async (taskData: Omit<Task, "id">): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    }

    const storedTasks = localStorage.getItem("tasks")
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : []

    const updatedTasks = [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    return newTask
  },

  updateTask: async (taskData: Task): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const storedTasks = localStorage.getItem("tasks")
    if (!storedTasks) {
      throw new Error("Tasks not found")
    }

    const tasks: Task[] = JSON.parse(storedTasks)
    const taskIndex = tasks.findIndex((t) => t.id === taskData.id)

    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    tasks[taskIndex] = taskData
    localStorage.setItem("tasks", JSON.stringify(tasks))

    return taskData
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const storedTasks = localStorage.getItem("tasks")
    if (!storedTasks) {
      throw new Error("Tasks not found")
    }

    const tasks: Task[] = JSON.parse(storedTasks)
    const updatedTasks = tasks.filter((t) => t.id !== id)

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  },
}

// Async thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    return await mockApi.getTasks()
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById", async (id: string, { rejectWithValue }) => {
  try {
    return await mockApi.getTaskById(id)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addTask = createAsyncThunk("tasks/addTask", async (taskData: Omit<Task, "id">, { rejectWithValue }) => {
  try {
    return await mockApi.createTask(taskData)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateTask = createAsyncThunk("tasks/updateTask", async (taskData: Task, { rejectWithValue }) => {
  try {
    return await mockApi.updateTask(taskData)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string, { rejectWithValue }) => {
  try {
    await mockApi.deleteTask(id)
    return id
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

// Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.payload as string
      })

    // Fetch task by ID
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = "succeeded"
        state.selectedTask = action.payload
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.payload as string
      })

    // Add task
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = "succeeded"
        state.tasks.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.payload as string
      })

    // Update task
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = "succeeded"
        const index = state.tasks.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
        state.selectedTask = action.payload
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.payload as string
      })

    // Delete task
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = "pending"
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = "succeeded"
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        state.selectedTask = null
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.payload as string
      })
  },
})

export default tasksSlice.reducer

