import { CustomTag } from './CustomTag'

export const CardHeader = () => {
  return (
    <div className="flex justify-content-between align-items-center px-3">
      <div>
        <CustomTag status="done" />
      </div>
      <div>
        <i className="pi pi-ellipsis-h" />
      </div>
    </div>
  )
}
