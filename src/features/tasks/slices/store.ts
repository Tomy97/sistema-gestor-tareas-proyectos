import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'
import { Project } from '../../../types/Project'
import { getItem, setItem } from '../../../utils/localStorage'

export interface TaskState {
  visibility: boolean
  tasks: Task[]
}

const initialState: TaskState = {
  visibility: false,
  tasks: []
}


const handleCreateTask = (state: TaskState, action: PayloadAction<{ projectId: string, task: Task }>) => {
  const { projectId, task } = action.payload
  const projects: Project[] = getItem('projects')

  let project: Project | undefined = projects.find((project: Project): boolean => project.id === projectId)
  if (project) {
    project.tasks.push(task)
    setItem('projects', projects)
    state.tasks.push(task)
  }
}

const handleDeleteTask = (state: TaskState, action: PayloadAction<string>) => {
  const id: string = action.payload
  const projects: Project[] = getItem('projects')
  const project = projects.find(project => project.tasks.some(task => task.id === id))
  if (project) {
    project.tasks = project.tasks.filter(task => task.id !== id)
    setItem('projects', projects)
    state.tasks = state.tasks.filter(task => task.id !== id)
  }
}

export const useTaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setVisibility: (state: TaskState, action: PayloadAction<boolean>) => {
      state.visibility = action.payload
    },
    createTask: (state, action: PayloadAction<{ projectId: string, task: Task }>) => handleCreateTask(state, action),
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const { id, status } = action.payload

      const findAndMoveTask = (source: Task[], target: Task[]) => {
        const index = source.findIndex(task => task.id === id)
        if (index !== -1) {
          const [task] = source.splice(index, 1)
          task.status = status
          target.push(task)
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => handleDeleteTask(state, action)
  }
})

export const {
  setVisibility,
  createTask,
  updateTaskStatus,
  deleteTask
} = useTaskSlice.actions
