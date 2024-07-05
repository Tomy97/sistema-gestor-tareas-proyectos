import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'
import { Project } from '../../../types/Project'

export interface TaskState {
  visibility: boolean
}

const initialState: TaskState = {
  visibility: false
}


const handleCreateTask = (state: TaskState, action: PayloadAction<{ projectId: string, task: Task }>) => {
  const { projectId, task } = action.payload
  const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]') as Project[]

  let project: Project | undefined = projects.find((project: Project): boolean => project.id === projectId)
  if (project) {
    project.tasks.push(task)
    localStorage.setItem('projects', JSON.stringify(projects))
  }
}

const handleDeleteTask = (state: TaskState, action: PayloadAction<string>) => {
  const id: string = action.payload
  const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]') as Project[]
  const project = projects.find(project => project.tasks.some(task => task.id === id))
  if (project) {
    project.tasks = project.tasks.filter(task => task.id !== id)
    console.log('se borro este tasks', project.tasks)
    localStorage.setItem('projects', JSON.stringify(projects))
  }
}
export const useTaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setVisibility: (state: TaskState, action: PayloadAction<boolean>) => {
      state.visibility = action.payload
    },
    setTodo: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.todo = action.payload
    },
    setInProgress: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.inProgress = action.payload
    },
    setDone: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.done = action.payload
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

      switch (status) {
        case 'to-do':
          findAndMoveTask(state.inProgress, state.todo)
          findAndMoveTask(state.done, state.todo)
          break
        case 'in-progress':
          findAndMoveTask(state.todo, state.inProgress)
          findAndMoveTask(state.done, state.inProgress)
          break
        case 'done':
          findAndMoveTask(state.todo, state.done)
          findAndMoveTask(state.inProgress, state.done)
          break
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => handleDeleteTask(state, action)
  }
})

export const {
  setVisibility,
  setDone,
  setInProgress,
  setTodo,
  createTask,
  updateTaskStatus,
  deleteTask
} = useTaskSlice.actions
