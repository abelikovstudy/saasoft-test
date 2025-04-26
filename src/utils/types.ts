export interface FieldData {
    id: number
    marks: string[]
    local: boolean
    login: string
    password?: string
  }


  // Можно также создать тип для состояния хранилища
  export interface FieldDataState {
    fieldsData: FieldData[]
  }