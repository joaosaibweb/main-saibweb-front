"use client";
import { AuthService } from "@/services/auth";
import {
  AuthData,
  ChangeCompanyParams,
  GetAuthorizedCompaniesParams,
} from "@/services/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { SetSelectedModuleInterface, SignInSuccessPayload } from "./types";
import { RootState } from "..";
import { useCallback, useMemo } from "react";
export const initialState = {
  token: "",
  signed: false,
  loading: false,
  usr_id: "",
  usr_saibweb_id: "",
  usr_tipo: "",
  usr_login: "",
  emp_id: "",
  emp_saibweb: "",
  emp_razao_social: "",
  optionsEmp: [],
  optionsModules: [],
  selectedModule: {
    route: "",
    module: "",
    id: 0,
    menu: [{ ITEM_ID: 0, NIVEL_SUPERIOR: "", NOME: "AA", ROTA: "", ICONE: "" }],
  },
};
export const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    sigInSuccess: (state, { payload }: PayloadAction<SignInSuccessPayload>) => {
      return {
        ...state,
        token: payload.token,
        signed: true,
        loading: false,
        usr_id: payload.usr_id,
        usr_saibweb_id: payload.usr_saibweb_id,
        usr_tipo: payload.usr_tipo,
        usr_login: payload.usr_login,
        emp_id: payload.emp_id,
        emp_saibweb: payload.emp_saibweb,
        emp_razao_social: payload.emp_razao_social,
        optionsEmp: payload.optionsEmp ?? state.optionsEmp ?? [],
        optionsModules: payload.optionsModules ?? state.optionsModules ?? [],
      };
    },

    logOut: (state) => {
      return {
        ...state,
        signed: false,
      };
    },

    setModuleSelected: (
      state,
      { payload }: PayloadAction<SetSelectedModuleInterface>
    ) => {
      return {
        ...state,
        selectedModule: {
          ...payload,
          id: payload.id ?? 0,
        },
      };
    },
  },
});

export const { sigInSuccess, setModuleSelected, logOut } = slice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.auth);

  const signIn = useCallback(
    async (payload: GetAuthorizedCompaniesParams) => {
      const authService = new AuthService();

      const responseAuthorizedCompanies =
        await authService.getAuthorizedCompanies(payload);

      const { success, retorno, errors } = responseAuthorizedCompanies.data;
      console.log(responseAuthorizedCompanies.data);
      if (!success) {
        // toast.error(`Acesso Negado!! ${errors.response.message}`);
        // yield put(signFailure());

        return;
      }

      const responseLogin = await authService.authenticate({
        username: payload.username,
        password: payload.password,
        EMP_ID: retorno[0].EMP_ID,
        EMP_SAIBWEB: retorno[0].EMP_SAIBWEB,
        EMP_RAZAO_SOCIAL: retorno[0].EMP_NOME,
        PWDCERT: retorno[0].PWDCERT,
      });

      const successlogin = responseLogin.data.success;
      const {
        token,
        EMP_ID,
        EMP_SAIBWEB,
        EMP_RAZAO_SOCIAL,
        USR_ID,
        USR_SAIBWEB_ID,
      } = responseLogin.data.retorno;

      if (successlogin) {
        const userType = await authService.getUserType(USR_ID);
        const responseOptionsModules = await authService.getModules({
          usr_id: USR_ID,
          usr_tipo: userType,
        });

        console.log("optionsModules", responseOptionsModules);

        const optionsEmp = retorno.map((emp: any) => emp);

        dispatch(
          sigInSuccess({
            token: token,
            signed: true,
            loading: false,
            usr_id: USR_ID,
            usr_saibweb_id: USR_SAIBWEB_ID,
            usr_tipo: userType,
            usr_login: payload.username,
            emp_id: EMP_ID,
            emp_saibweb: EMP_SAIBWEB,
            emp_razao_social: EMP_RAZAO_SOCIAL,
            optionsEmp: optionsEmp,
            optionsModules: responseOptionsModules.retorno,
          })
        );
      }

      return successlogin;
    },
    [dispatch]
  );

  const setSelectedModule = useCallback(
    (data: SetSelectedModuleInterface) => {
      dispatch(setModuleSelected(data));
    },
    [dispatch]
  );

  const setNewCompany = useCallback(async (payload: ChangeCompanyParams) => {
    const authService = new AuthService();
    try {
      const response = await authService.changeCompany({
        username: payload.username,
        EMP_ID: payload.EMP_ID,
        USR_ID: payload.USR_ID,
      });

      const { success, retorno, errors } = response;

      if (!success) {
        // toast.error(`${errors.response.message}`);
        // yield put(signFailure());

        return;
      }

      const { token, EMP_SAIBWEB, EMP_RAZAO_SOCIAL, ...rest } = retorno;

      if (success) {
        dispatch(
          sigInSuccess({
            token: token,
            signed: true,
            loading: false,
            usr_id: String(rest.USR_ID),
            usr_saibweb_id: String(rest.USR_SAIBWEB_ID),
            usr_tipo: authData.usr_tipo,
            usr_login: rest.username,
            emp_id: rest.EMP_ID,
            emp_saibweb: authData.emp_saibweb,
            emp_razao_social: EMP_RAZAO_SOCIAL,
          })
        );

        // history('/');
        // window.history.forward("/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
      }
    } catch (err) {
      // yield put(signFailure());
      // toast.error(
      //   `Erro ao localizar empresa. Faça login novamente!!! \n ${err}`
      // );
      // // history('/');
      // window.history.forward("/");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    }
  }, []);

  const signOut = useCallback(async () => {
    dispatch(logOut());
  }, []);

  const data = useMemo(
    () => ({
      authData: authData,
      signIn: signIn,
      setSelectedModule: setSelectedModule,
      setNewCompany: setNewCompany,
      signOut: signOut,
    }),
    [authData, signIn, setSelectedModule, setNewCompany]
  );

  return data;
};

export default slice.reducer;
