import React from 'react'
import { Dialog } from 'primereact/dialog'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createTask, setVisibility } from '../slices/store'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MemberMultiSelect } from '../../projects/components/input/MemberMultiSelect'
import { Project } from '../../../types/Project'
import { Button } from 'primereact/button'
import { v4 as uuidv4 } from 'uuid'

interface CreateTaskDialigProp {
  id: string
}

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre de la tarea es requerido'),
  description: Yup.string().required('La descripción de la tarea es requerida'),
  priority: Yup.string().required('Debes seleccionar una prioridad'),
  status: Yup.string().required('Debes seleccionar un estado'),
  developerAssigned: Yup.object().required('Debes seleccionar al menos un miembro')
})

export const CrateTaskDialog = ({ id }: CreateTaskDialigProp) => {
  const taskStore = useAppSelector(({ tasks }) => tasks)
  const projectStore: Project[] = useAppSelector(({ projects }) => projects)
  const dispatch = useAppDispatch()

  const handleCloseDialog = (val: boolean) => {
    dispatch(setVisibility(val))
  }

  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      name: '',
      description: '',
      developerAssigned: null,
      priority: '',
      status: '',
      dateCreated: new Date().toDateString(),
      dateUpdated: new Date().toDateString()
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('valor', values)
      dispatch(createTask({
        projectId: id,
        task: values
      }))
      formik.resetForm()
      handleCloseDialog(false)
    }
  })

  const status = [
    { label: 'Por hacer', value: 'to-do' },
    { label: 'En progreso', value: 'in-progress' },
    { label: 'Terminado', value: 'done' }
  ]

  const priorities = [
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' }
  ]

  const project: Project | undefined = projectStore.find(elem => elem.id === id)
  let getMemberProject: any[] = []
  if (project !== undefined) {
    getMemberProject = project.members
  }

  return (
    <Dialog header="Crear Tarea" visible={taskStore.visibility} className="w-full md:w-6" onHide={() => {
      if (!taskStore.visibility) return
      handleCloseDialog(false)
    }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid">
          <div className="col-12 md:col-6">
            <div className="flex flex-column gap-2">
              <label>Nombre de la tarea</label>
              <InputText
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                id="name"
                className={
                  formik.touched.name && formik.errors.name ? 'p-invalid' : ''
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <small className="p-error">{formik.errors.name}</small>
              ) : null}
            </div>
          </div>
          <div className="col-12 md:col-6">
            <MemberMultiSelect
              label="Seleccionar Miembros"
              value={formik.values.developerAssigned}
              onChange={(e) => formik.setFieldValue('developerAssigned', e.value)}
              developerOption={getMemberProject}
              customClass={
                formik.touched.developerAssigned && formik.errors.developerAssigned
                  ? 'p-invalid' : ''
              }
            />
            {formik.touched.developerAssigned && formik.errors.developerAssigned ? (
              <small className="p-error">{formik.errors.developerAssigned} </small>
            ) : null}
          </div>
          <div className="col-12">
            <div className="flex flex-column gap-2">
              <label>Descripción de la tarea</label>
              <InputTextarea
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="description"
                id="description"
                className={
                  formik.touched.description && formik.errors.description
                    ? 'p-invalid'
                    : ''
                }
              />
              {formik.touched.description && formik.errors.description ? (
                <small className="p-error">{formik.errors.description}</small>
              ) : null}
            </div>
          </div>
          <div className="col-12 md:4">
            <div className="flex flex-column gap-2">
              <label>Prioridad</label>
              <Dropdown
                value={formik.values.priority}
                options={priorities}
                onChange={(e) => formik.setFieldValue('priority', e.value)}
                placeholder="Seleccionar prioridad"
                className={
                  formik.touched.priority && formik.errors.priority
                    ? 'p-invalid'
                    : ''
                }
              />
              {formik.touched.priority && formik.errors.priority ? (
                <small className="p-error">{formik.errors.priority}</small>
              ) : null}
            </div>
          </div>
          <div className="col-12 md:4">
            <div className="flex flex-column gap-2">
              <label>Estado</label>
              <Dropdown
                value={formik.values.status}
                options={status}
                onChange={(e) => formik.setFieldValue('status', e.value)}
                placeholder="Seleccionar estado"
                className={
                  formik.touched.status && formik.errors.status
                    ? 'p-invalid'
                    : ''
                }
              />
              {formik.touched.status && formik.errors.status ? (
                <small className="p-error">{formik.errors.status}</small>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid mt-2 justify-content-end">
          <div className="col-3">
            <Button type="submit" label="Crear Proyecto" className="bg-pills border-none" />
          </div>
        </div>
      </form>
    </Dialog>
  )
}
