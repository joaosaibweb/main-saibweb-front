export class ApiError extends Error {
  public errorParams;
  /**
   * Classe de erro customizada para tratar erros da API
   * @param {String} message A mensagem que deve ser exibida
   * @param {any} params Os parâmetros adicionais do erro. O tipo deve ser alinhado com o Back-End
   */
  constructor(message: string = "", params?: any) {
    super(message);
    this.name = "Server Error";
    this.errorParams = params;
  }
}
