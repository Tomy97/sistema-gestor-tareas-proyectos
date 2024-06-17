import { useFormik } from 'formik'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { MemberMultiSelect } from './input/MemberMultiSelect'
import { Calendar } from 'primereact/calendar'
import * as Yup from 'yup'

export const CardFromProject = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      members: [],
      date: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre del proyecto es requerido'),
      members: Yup.array()
        .min(1, 'Debes seleccionar al menos un miembro')
        .required('Debes seleccionar al menos un miembro'),
      date: Yup.date().required('Debes seleccionar una fecha'),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <Card title="Nuevo Proyecto">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid">
          <div className="col-12 md:col-4">
            <div className="flex flex-column gap-2">
              <label>Nombre del proyecto</label>
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
          <div className="col-12 md:col-4">
            <MemberMultiSelect
              label="Seleccionar Miembros"
              value={formik.values.members}
              onChange={(e) => formik.setFieldValue('members', e.value)}
            />
            {formik.touched.members && formik.errors.members ? (
              <small className="p-error">{formik.errors.members}</small>
            ) : null}
          </div>
          <div className="col-12 md:col-4">
            <div className="flex flex-column justify-content-center">
              <label className="mb-2">Fecha limite</label>
              <Calendar
                value={formik.values.date}
                onChange={(e) => formik.setFieldValue('date', e.value)}
                onBlur={formik.handleBlur}
                name="date"
                dateFormat="dd/mm/yy"
                showIcon
                className={
                  formik.touched.date && formik.errors.date ? 'p-invalid' : ''
                }
              />
              {formik.touched.date && formik.errors.date ? (
                <small className="p-error">{formik.errors.date}</small>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-12">
            <Button label="Crear Proyecto" type="submit" className="w-full" />
          </div>
        </div>
      </form>
    </Card>
  )
}
