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
    }
  }
})

export const { setProject, getProjects} = useProjectSlice.actions