export type FieldErrors<T> = {
  [Property in keyof T]: string[]
}

export type ActionData<T> = {
  formError?: string
  fieldErrors?: FieldErrors<T>,
  data?: T
}