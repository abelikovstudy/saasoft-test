import { defineStore } from 'pinia'
import type { FieldData, FieldDataState } from '../utils/types.ts'

export const useItemsStore = defineStore('items', {
  state: (): FieldDataState => ({
    items: []
  }),

  getters: {
    allItems: (state) => state.items,
    localItems: (state) => state.items.filter(item => item.local),
    ldapItems: (state) => state.items.filter(item => !item.local),
    
  },

  actions: {
    addItem(item: Omit<FieldData, 'id'>) {
      this.items.push({
        ...item,
        id: this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1
      })
    },
    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id)  
    },
  }
})