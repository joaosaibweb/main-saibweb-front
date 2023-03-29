export interface SignInSuccessPayload {
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
  optionsEmp?: [];
  optionsModules?: [];
}

export interface MenuData {
  ITEM_ID: number;
  NIVEL_SUPERIOR: string;
  NOME: string;
  ROTA: string;
  ICONE: string;
}

export interface SetSelectedModuleInterface {
  menu: MenuData[];
  route: string;
  module: string;
  id?: number;
}
