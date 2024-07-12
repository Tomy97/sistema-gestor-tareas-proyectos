import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'
import { handleCreateTask, handleupdateTaskStatus, handleDeleteTask, handleUpdateTask } from '../hook/useCrudTask'

export interface TaskState {
  visibility: boolean
  visibilityViewTask: boolean
  tasks: Task[]
  taskSelected: Task | null
}

const initialState: TaskState = {
  visibility: false,
  visibilityViewTask: false,
  tasks: [],
  taskSelected: null
}

export const useTaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setVisibilityCreateTask: (state: TaskState, action: PayloadAction<boolean>) => {
      state.visibility = action.payload
    },
    setVisibilityViewTask: (state: TaskState, action: PayloadAction<{ visibility: boolean, taskId: string }>) => {
      state.visibilityViewTask = action.payload.visibility

      if (action.payload.visibility && action.payload.taskId) {
        state.taskSelected = state.tasks.find((task: Task): boolean => task.id === action.payload.taskId) || null
      }
      if (!action.payload.visibility) {
        state.taskSelected = null
      }
    },
    createTask: (state, action: PayloadAction<{ projectId: string, task: Task }>) => handleCreateTask(state, action),
    deleteTask: (state, action: PayloadAction<string>) => handleDeleteTask(state, action),
    updateTask: (state, action: PayloadAction<Task>) => handleUpdateTask(state, action),
    updateTaskStatus: (state, action: PayloadAction<{
      id: string,
      status: string
    }>) => handleupdateTaskStatus(state, action),
    taskSelected: (state, action: PayloadAction<Task | null>) => {
      state.taskSelected = action.payload
    }
  }
})

export const {
  setVisibilityCreateTask,
  setVisibilityViewTask,
  createTask,
  deleteTask,
  updateTaskStatus,
  taskSelected,
  updateTask
} = useTaskSlice.actions
