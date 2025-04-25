import { defineStore } from 'pinia'
import type { FieldData, FieldDataState } from '../utils/types.ts'

export const useFieldsStore = defineStore('field', {
  state: (): FieldDataState => ({
    fieldsData: []
  }),

  getters: {
    allFields: (state) => state.fieldsData,
    localFields: (state) => state.fieldsData.filter(field => field.local),
    ldapFields: (state) => state.fieldsData.filter(field => !field.local),
    
  },

  actions: {
    addField(item: Omit<FieldData, 'id'>) {
      this.fieldsData.push({
        ...item,
        id: this.fieldsData.length > 0 ? Math.max(...this.fieldsData.map(i => i.id)) + 1 : 1
      })
    },
    removeField(id: number) {
      this.fieldsData = this.fieldsData.filter(field => field.id !== id)  
    },
  }
})