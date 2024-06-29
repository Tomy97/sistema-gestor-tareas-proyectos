import React from 'react'
import { Dialog } from 'primereact/dialog'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setVisibility } from '../slices/store'


export const CrateTaskDialog = () => {
  const taskStore = useAppSelector(({ tasks }) => tasks)
  const dispatch = useAppDispatch()

  const handleCloseDialog = (val: boolean) => {
    dispatch(setVisibility(val))
  }

  return (
    <Dialog header="Crear Tarea" visible={taskStore.visibility} className="w-full md:w-6" onHide={() => {
      if (!taskStore.visibility) return
      handleCloseDialog(false)
    }}>
      formulario para crear la tarea
    </Dialog>
  )
}
