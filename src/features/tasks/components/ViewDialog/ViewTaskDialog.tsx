import { FC } from 'react'
import { Task } from '../../../../types/Task'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useAppDispatch } from '../../../../app/hooks'
import { setVisibilityViewTask, taskSelected } from '../../slices/store'


// Aca calculo que voy a tener que usar el store cerrar o abrir el dialog este
interface ViewTaskDialogProps {
  visible: boolean
  task: Task
}

export const ViewTaskDialog: FC<ViewTaskDialogProps> = ({ visible, task }: ViewTaskDialogProps) => {
  const dispatch = useAppDispatch()

  const handleCloseDialog = (val: boolean) => {
    dispatch(setVisibilityViewTask(val))
    dispatch(taskSelected(null))
  }

  return (
    <Dialog visible={visible} onHide={() => handleCloseDialog(false)}>
      <Button label="Close" />
    </Dialog>
  )
}
