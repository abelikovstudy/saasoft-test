export interface FieldData {
    id: number
    marks: Mark[]
    local: boolean
    login: string
    password?: string
  }
export interface Mark {
  text: string
}

  // Можно также создать тип для состояния хранилища
  export interface FieldDataState {
    fieldsData: FieldData[]
  }