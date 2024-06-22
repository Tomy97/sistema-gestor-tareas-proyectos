import { Card } from 'primereact/card'
import type { Member } from '../../../../types/member'
import { CardHeader } from './CardHeader'
import { CardFooter } from './CardFooter'

interface CardProjectTaskProps {
  title: string
  description: string
  memberList: Member[]
}

export const CardProjectTask = ({
  title,
  description,
  memberList,
}: CardProjectTaskProps) => {
  return (
    <>
      <Card
        title={title}
        className="text-primario p-5"
        header={<CardHeader />}
        footer={<CardFooter memberList={memberList} />}
      >
        <span className="text-secundario">{description}</span>
      </Card>
    </>
  )
}
