import React, { CSSProperties, useEffect, useState } from "react";
import Select from "react-select";

import { toast } from "react-toastify";
import { AreaComp, BoxMenu, CustomSelect } from "./styles";
import { useAuth } from "@/store/authSlice";

interface ListAndSelectEmpresa {
  value: number;
  label: string;
}
interface PropsEmpresa {
  EMP_ID: number;
  EMP_NOME: string;
}
interface RootState {
  auth: {
    usr_login: string;
    value: number;
    emp_id: number;
    usr_id: number;
    token: string;
  };
}

const selectStyles = {
  container: (base: any, state: any) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "200",
  }),
  menuPortal: (styles: any) => ({ ...styles, zIndex: 280 }),
};

export default function BotaoEmpresa() {
  const authStore = useAuth();
  const [menuTarget, setMenuTarget] = useState<HTMLElement | null>();

  let listaEmpresas: ListAndSelectEmpresa[] = [
    { value: 0, label: "Selecionar Empresa" },
  ];
  let empresaSelecionada: ListAndSelectEmpresa = {
    value: 0,
    label: "Selecionar Empresa",
  };
  // percorre a lista de empresas e padroniza as opções
  // if (store.getState().auth.optionsEmp.length > 0) {
  //   const tempEmpresas = store
  //     .getState()
  //     .auth.optionsEmp.map((emp: PropsEmpresa) => ({
  //       value: emp.EMP_ID,
  //       label: emp.EMP_NOME,
  //     }));
  //   listaEmpresas = tempEmpresas;
  // }
  if (authStore.authData.optionsEmp.length > 0) {
    const tempEmpresas = authStore.authData.optionsEmp.map((emp: any) => ({
      value: emp.EMP_ID,
      label: emp.EMP_NOME,
    }));
    listaEmpresas = tempEmpresas;
  }

  const profile = authStore.authData;
  //useSelector((state: RootState) => state.auth);

  // atualiza a empresa selecionada para setar no Value do select usando dados do MOCK
  function getSelectedEmpresa() {
    empresaSelecionada = listaEmpresas.find(
      (emp: any) => emp.value === profile.emp_id
    )!;
  }
  // sempre atualiza a empresa selecionada na inicialização do componente
  getSelectedEmpresa();

  const handleEmpresa = (selectedOption: any) => {
    authStore.setNewCompany({
      username: profile.usr_login,
      USR_ID: Number(profile.usr_id),
      EMP_ID: selectedOption.value,
    });
    // dispatch(
    //   selectEmpRequest(
    //     profile.usr_login,
    //     profile.usr_id,
    //     selectedOption.value,
    //     profile.token
    //   )
    // );
    toast.success(`Empresa selecionada: ${selectedOption.label}`);
    // history('/');
  };

  useEffect(() => {
    const element = document.getElementById("root");
    setMenuTarget(element);
  }, []);
  return (
    <BoxMenu>
      <AreaComp wd="100">
        <label htmlFor="empresa">Empresa Ativa:</label>
        <CustomSelect
          name="change_empresa"
          id="empresa"
          classNamePrefix="Select"
          className="selectCompany"
          options={listaEmpresas}
          onChange={handleEmpresa}
          value={empresaSelecionada}
          styles={selectStyles}
          menuPortalTarget={menuTarget}
          theme={(theme: any) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#b196d0",
              primary25: "#e6d4fb",
            },
          })}
        />
      </AreaComp>
    </BoxMenu>
  );
}
