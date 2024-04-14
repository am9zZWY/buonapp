export interface Recipe {
  id?: string
  name: string
  description: string
  ingredients: string[]
  steps: string[]
  tags?: string[]
}
