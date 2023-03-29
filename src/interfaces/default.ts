export interface DefaultResponseApi<T> {
  success: boolean;
  message?: string;
  errors?: any;
  retorno: T;
}
