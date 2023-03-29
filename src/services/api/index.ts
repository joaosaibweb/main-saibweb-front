import axios from "axios";
import { ApiError } from "../apiError";
import { GetApiBaseUrl } from "../utils";
// import { ApiError } from "./apiError";

export const ApiTypes = {
  EMISSORES: "EMISSORES",
  SAIBWEB: "SAIBWEB",
  SAIBWEB1: "SAIBWEB1",
  ADM: "ADM",
};

export class ApiService {
  static baseUrl = (apiType: string) => GetApiBaseUrl(apiType);

  static getInstance(apiType: string) {
    const baseUrl = GetApiBaseUrl(apiType);
    const token = localStorage.getItem("token");

    const api = axios.create({
      baseURL: baseUrl,
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    /* Ficou definido que o campo message será utilizado como campo auxiliar,
     * sendo que o retorno poderá ser '1' ou '2'. De modo que:
     * 1 - Se refere a um contexto simples onde errors será uma mensagem de erro
     * 2 - Se refere a um contexto específico onde o errors retornará um complemento para exibir em tela
     */
    api.interceptors.response.use((response) => {
      if (response.data.success === false) {
        if (response.data.message !== "2") {
          if (response.data.errors instanceof Object) {
            throw new ApiError(response.data.errors.message);
          }
          throw new ApiError(response.data.errors);
        }

        throw new ApiError(
          "Falha ao completar a operação!",
          response.data.errors
        );
      } else {
        return response;
      }
    });

    return api;
  }
}

export const Api = (type = ApiTypes.SAIBWEB) => ApiService.getInstance(type);
export const Api1 = (type = ApiTypes.SAIBWEB1) => ApiService.getInstance(type);
