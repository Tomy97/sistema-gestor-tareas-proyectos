import { PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../../types/Task'
import { Project } from '../../../types/Project'
import { getItem, setItem } from '../../../utils/localStorage'
import { TaskState } from '../slices/store'

export const handleCreateTask = (state: TaskState, action: PayloadAction<{ projectId: string, task: Task }>) => {
  const { projectId, task } = action.payload
  const projects: Project[] = getItem('projects')

  let project: Project | undefined = projects.find((project: Project): boolean => project.id === projectId)
  if (project) {
    project.tasks.push(task)
    setItem('projects', projects)
    state.tasks.push(task)
  }
}

export const handleDeleteTask = (state: TaskState, action: PayloadAction<string>) => {
  const id: string = action.payload
  const projects: Project[] = getItem('projects')
  const project = projects.find(project => project.tasks.some(task => task.id === id))
  if (project) {
    project.tasks = project.tasks.filter(task => task.id !== id)
    setItem('projects', projects)
    state.tasks = state.tasks.filter(task => task.id !== id)
  }
}

export const handleupdateTaskStatus = (state: TaskState, action: PayloadAction<{ id: string, status: string }>) => {
  const { id, status } = action.payload
  const projects: Project[] = getItem('projects')
  const project = projects.find(project => project.tasks.some(task => task.id === id))
  if (project) {
    const taskIndex = project.tasks.findIndex(task => task.id === id)
    project.tasks[taskIndex].status = status
    setItem('projects', projects)
    state.tasks = state.tasks.map(task =>
      task.id === id ? { ...task, status } : task
    )
  }
}