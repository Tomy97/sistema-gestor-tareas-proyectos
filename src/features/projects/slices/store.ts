import { createSlice } from '@reduxjs/toolkit'
import { Project } from '../../../types/Project'

const initialState: Project[] = []

export const useProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      action.payload.date = new Date().toISOString()
      state.push(action.payload)
      localStorage.setItem('projects', JSON.stringify(state))
      return state
    },
    getProjects: (state) => {
      const projects = localStorage.getItem('projects')
      if (projects) {
        return JSON.parse(projects)
      }
      return state
    },
    updateProjectName(state, action) {
      const projectIndex = state.findIndex((project) => project.id === action.payload.id)
      state[projectIndex].name = action.payload.name
      localStorage.setItem('projects', JSON.stringify(state))
      return state
    }
  }
})

export const { setProject, getProjects, updateProjectName } = useProjectSlice.actions