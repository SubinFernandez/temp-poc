export interface Invoice {
  id: number
  supplier: string
  amount: number
  reference: string
  due_date: string
  date: string
  is_open: boolean
  data_error: string
  error_state: number
}