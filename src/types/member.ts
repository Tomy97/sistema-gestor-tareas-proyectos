export type Member = {
  id?: string
  name: string
  rol: string
  email: string
  proyects: never[]
  seniority: string
}

export interface MembersGroup {
  label: string
  items: Member[]
}
