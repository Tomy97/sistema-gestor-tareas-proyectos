import '../../asset/base.css'

interface BulletColorProps {
  backgroundColor: string
}

export const BulletColor = (props: BulletColorProps) => {
  return (
    <div
      className="bullet_class mr-2"
      style={{ backgroundColor: props.backgroundColor }}
    />
  )
}
