export type ErrorInResponse<T = any> = {
  status: number,
  message: string,
  data?: T
}