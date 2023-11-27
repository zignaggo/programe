import Store from 'electron-store'

export interface time {
  id: string
  type: 'hour' | 'min' | 'sec'
  number: number
}

// const schema: Schema<{ timelist: time[] }> = [{ timelist: [{ id: '1', type: '' }] }]
export const store = new Store()
