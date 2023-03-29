import { DefaultResponseApi } from "@/interfaces/default";
import axios from "axios";
import { Api, ApiService } from "../api";
import { GetApiBaseUrl } from "../utils";
import {
  AuthData,
  AuthenticateParams,
  ChangeCompanyParams,
  DataChangeCompanyResponse,
  GetAuthorizedCompaniesParams,
  GetModulesParams,
} from "./types";

export class AuthService {
  private baseUrlEmissores = GetApiBaseUrl("EMISSORES");
  private baseUrlSaibweb = GetApiBaseUrl("SAIBWEB");
  private apiEmissores = axios.create({
    baseURL: this.baseUrlEmissores,
  });

  private apiSaib = axios.create({
    baseURL: this.baseUrlSaibweb,
  });
  private api = ApiService.getInstance("EMISSORES");

  async signIn(payload: AuthenticateParams) {
    try {
      const responseAuthorizedCompanies = await this.getAuthorizedCompanies(
        payload
      );

      const { success, retorno, errors } = responseAuthorizedCompanies.data;
      console.log(responseAuthorizedCompanies.data);
      if (!success) {
        // toast.error(`Acesso Negado!! ${errors.response.message}`);
        // yield put(signFailure());

        return;
      }

      const loginResponse = await this.authenticate({
        username: payload.username,
        password: payload.password,
        EMP_ID: retorno[0].EMP_ID,
        EMP_SAIBWEB: retorno[0].EMP_SAIBWEB,
        EMP_RAZAO_SOCIAL: retorno[0].EMP_NOME,
        PWDCERT: retorno[0].PWDCERT,
      });

      const successlogin = loginResponse.data.success;
      const {
        token,
        EMP_ID,
        EMP_SAIBWEB,
        EMP_RAZAO_SOCIAL,
        USR_ID,
        USR_SAIBWEB_ID,
      } = loginResponse.data.retorno;

      if (successlogin) {
        this.apiEmissores.defaults.headers.Authorization = `Bearer ${token}`;
        this.apiSaib.defaults.headers.Authorization = `Bearer ${token}`;

        const responseTipo = await this.apiEmissores.get(
          `/v1/users/user_tipo/${USR_ID}`
        );
        const { TIPO } = responseTipo.data.retorno[0];
      }
    } catch (err) {}
  }

  async getAuthorizedCompanies(params: GetAuthorizedCompaniesParams) {
    const { username, password, empId } = params;
    const empr = empId || 0;
    const response = await this.api.post("v1/accounts/authenticate", {
      username,
      password,
      EMP_ID: empr,
    });
    return response;
  }

  async authenticate(params: AuthenticateParams) {
    const res = await this.api.post("v1/accounts/authenticate", params);

    const { success, retorno } = res.data;
    if (success) {
      localStorage.setItem("token", retorno.token);
    }
    return res;
  }

  async getUserType(idUser: number) {
    const api = ApiService.getInstance("EMISSORES");
    const responseTipo = await api.get(`/v1/users/user_tipo/${idUser}`);
    const { TIPO } = responseTipo.data.retorno[0];
    return TIPO;
  }

  async getModules(userParams: GetModulesParams) {
    const api = ApiService.getInstance("SAIBWEB");
    const urlModulos =
      String(userParams.usr_tipo) === "1"
        ? `/v1/system/modulos_menu`
        : `/v1/system/user_group_link/${userParams.usr_id}`;

    const { data } = await api.get(urlModulos);

    return data;
  }

  async changeCompany(
    params: ChangeCompanyParams
  ): Promise<DefaultResponseApi<DataChangeCompanyResponse>> {
    const api = ApiService.getInstance("EMISSORES");

    const res = await api.post("v1/accounts/changeEmp", params);

    return res.data;
  }
}
