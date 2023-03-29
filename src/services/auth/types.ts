export interface GetAuthorizedCompaniesParams {
  username: string;
  password: string;
  empId?: number;
}

export interface AuthenticateParams {
  username: string;
  password: string;
  empId?: number;
  EMP_ID: number;
  EMP_SAIBWEB: number;
  EMP_RAZAO_SOCIAL: number;
  PWDCERT: number;
}

export interface AuthenticateResposeInterface {
  token: string;
  EMP_ID: number;
  EMP_SAIBWEB: string;
  EMP_RAZAO_SOCIAL: string;
  USR_ID: number;
  USR_SAIBWEB_ID: number;
}

export interface AuthData {
  token: string;
  signed: boolean;
  loading: boolean;
  usr_id: string;
  usr_saibweb_id: string;
  usr_tipo: string;
  usr_login: string;
  emp_id: string;
  emp_saibweb: string;
  emp_razao_social: string;
  optionsEmp: [];
  optionsModules: [];
  selectedModule: {
    route: string;
    module: string;
    menu: Array<MenuData>;
  };
}

export interface MenuData {
  ITEM_ID: number;
  NIVEL_SUPERIOR: string;
  NOME: string;
  ROTA: string;
  ICONE: string;
}

export interface GetModulesParams {
  usr_id: number;
  usr_tipo: string;
}

export interface ChangeCompanyParams {
  username: string;
  USR_ID: number;
  EMP_ID: number;
}

export interface DataChangeCompanyResponse {
  username: string;
  password: string;
  USR_ID: number;
  USR_SAIBWEB_ID: number;
  EMP_ID: string;
  EMP_SAIBWEB: number;
  EMP_UF: string;
  EMP_RAZAO_SOCIAL: string;
  EMP_CNPJ: string;
  PWDCERT: string;
  token: string;
}
