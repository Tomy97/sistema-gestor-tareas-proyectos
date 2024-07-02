import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'

export interface InitialStateI {
  visibility: boolean
  todo: Task[]
  inProgress: Task[]
  done: Task[]
}

const initialState: InitialStateI = {
  visibility: false,
  todo: [],
  inProgress: [],
  done: []
}

export const useTaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setVisibility: (state: InitialStateI, action: PayloadAction<boolean>) => {
      state.visibility = action.payload
    },
    setTodo: (state: InitialStateI, action: PayloadAction<Task[]>) => {
      state.todo = action.payload
    },
    setInProgress: (state: InitialStateI, action: PayloadAction<Task[]>) => {
      state.inProgress = action.payload
    },
    setDone: (state: InitialStateI, action: PayloadAction<Task[]>) => {
      state.done = action.payload
    },
    createTask: (state: InitialStateI, action: PayloadAction<Task>) => {

    }
  }
})

export const { setVisibility, setDone, setInProgress, setTodo, createTask } = useTaskSlice.actions
