import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'
import { handleCreateTask, handleupdateTaskStatus, handleDeleteTask } from '../hook/useCrudTask'

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
    setVisibilityViewTask: (state: TaskState, action: PayloadAction<boolean>) => {
      state.visibilityViewTask = action.payload
    },
    createTask: (state, action: PayloadAction<{ projectId: string, task: Task }>) => handleCreateTask(state, action),
    deleteTask: (state, action: PayloadAction<string>) => handleDeleteTask(state, action),
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
  taskSelected
} = useTaskSlice.actions
