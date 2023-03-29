// "use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { BoxMenu, AreaComp, CustomSelect } from "./styles";
import { setModuleSelected, useAuth } from "@/store/authSlice";
import { ApiService, ApiTypes } from "@/services/api";
import { MenuData } from "@/store/authSlice/types";
import { useDispatch } from "react-redux";

interface Modulo {
  label: string;
  value: number | string;
}

interface ModuloEmpresa {
  MOD_ID: number;
  NOME: string;
  ITENS: Array<MenuData>;
}
interface RootState {
  auth: {
    usr_login: string;
    value: number;
    usr_tipo: number;
    emp_id: number | null;
    usr_id: number;
    token: string;
    signed: string;
    selectedModule: {
      module: string;
    }[];
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

export default function BotaoModulos() {
  const authStore = useAuth();
  const route = useRouter();
  const profile = authStore.authData;

  const [listaModulos, setListaModulos] = useState(profile.optionsModules);

  // const [optionsModulo, setOptionsModulo] = useState<Modulo[]>([]);
  const [moduloSelecionado, setModuloSelecionado] = useState<Modulo | null>({
    label: profile.selectedModule.module,
    value: profile.selectedModule.id,
  });
  const [idEmpresaAtual, setIdEmpresaAtual] = useState<number>();
  const pathName = usePathname();
  const [menuTarget, setMenuTarget] = useState<HTMLElement | null>();

  const api = ApiService.getInstance(ApiTypes.ADM);

  const padronizaRotaInicial = (str: string) => {
    let stringPadronizada = "/";

    stringPadronizada += str
      .replace(/[áÁãÃâÂàÀ]/gi, "a")
      .replace(/[éÉêÊ]/gi, "e")
      .replace(/[íÍ]/gi, "i")
      .replace(/[óÓõÕôÔ]/gi, "o")
      .replace(/[úÚ]/gi, "u")
      .replace(/[çÇ]/gi, "c")
      .replace(/ /gi, "")
      .replace(/-/gi, "")
      .trim()
      .toLowerCase();

    return stringPadronizada;
  };

  const dispatch = useDispatch();

  const getRotaInicial = (nomeModulo: string) =>
    nomeModulo.toLowerCase().includes("sistema")
      ? "/main"
      : padronizaRotaInicial(nomeModulo);

  /* atualiza o módulo selecionado */
  function getSelectedModule(
    optModulos: Modulo[],
    modulosEmpresa: ModuloEmpresa[]
  ) {
    let selectedModule: Modulo | null = null;
    let modulePayload: {
      route: string;
      module: string;
      menu: MenuData[];
      id?: number;
    } = { route: "", module: "", menu: [] };
    /* Tenta obter o módulo pré-selecionado do state global */
    const modulo = optModulos.find(
      (mod) => mod.label === profile.selectedModule.module
    );

    console.log("modulo", modulo);

    if (!modulo) {
      /* Se não tiver módulo selecionado pega o primeiro módulo habilitado */
      if (optModulos.length > 0) {
        [selectedModule] = optModulos;

        const objModulo = modulosEmpresa.find(
          (mod: any) => mod.MOD_ID === optModulos[0].value
        )!;
        modulePayload = {
          route: getRotaInicial(objModulo.NOME),
          module: objModulo.NOME,
          menu: objModulo.ITENS,
          id: objModulo.MOD_ID,
        };
      } else {
        /* Caso não tenha módulo habilitado redireciona para a página inicial */
        selectedModule = null;
        modulePayload = {
          route: "/main",
          module: "Selecione um Módulo",
          menu: [],
        };
      }

      setModuloSelecionado(selectedModule);
      authStore.setSelectedModule(modulePayload);
      // dispatch(selectModule([modulePayload]));
      // navigate(modulePayload.route);
    }

    if (modulo) {
      const objModulo = modulosEmpresa.find(
        (mod: any) => mod.MOD_ID === modulo.value
      )!;
      setModuloSelecionado(modulo);

      /* se existe id de empresa o usuário mudou de empresa logada.
       * Neste caso deve disparar a action de seleção de módulo
       * e o usuário deve voltar para a tela inicial do módulo.
       */
      if (idEmpresaAtual) {
        const rotaInicial = getRotaInicial(objModulo.NOME);

        authStore.setSelectedModule({
          route: rotaInicial,
          module: objModulo.NOME,
          menu: objModulo.ITENS,
          id: objModulo.MOD_ID,
        });

        route.push(rotaInicial);
      } else {
        /* se não existe id de empresa logada dispara a action de seleção de módulo
         * para garantir que os itens do menu sejam atualizados conforme o retorno da API,
         * porém mantém a referência da rota que está sendo acessada no momento.
         */
        let newRoutePath = pathName;
        console.log("pathName", pathName);
        if (profile.signed && pathName === "/") {
          newRoutePath = getRotaInicial(objModulo.NOME);
        }

        if (newRoutePath !== pathName) {
          // authStore.setSelectedModule({
          //   route: String(newRoutePath),
          //   module: objModulo.NOME,
          //   menu: objModulo.ITENS,
          //   id: objModulo.MOD_ID,
          // });
          // route.push(newRoutePath);
          console.log("entrando aqui");
        }
        console.log("newRoutePath", newRoutePath);
      }
    }
  }

  /* SOLUÇÃO TEMPORÁRIA
   * se não tiver grupo de usuário cadastrado para a empresa carrega
   * o módulo de MDF-e, pois hoje todas as empresas tem acesso ao mesmo.
   */

  //Função usando a API
  const carregaModuloPadrao = async (): Promise<void> => {
    try {
      const retornoModulos = await api.get("/v1/system/modulos_menu");
      if (retornoModulos.data && retornoModulos.data.success) {
        const optModulos: Modulo[] = retornoModulos.data.retorno
          .filter((mod: ModuloEmpresa) => mod.NOME === "MDF-e")
          .map((mod: ModuloEmpresa) => ({
            value: mod.MOD_ID,
            label: mod.NOME,
          }));

        setListaModulos(retornoModulos.data.retorno);

        getSelectedModule(optModulos, retornoModulos.data.retorno);
      }
    } catch (error) {}
  };

  //Função usando os Mocks

  // const carregaModuloPadrao = () => {
  //   const retornoModulos = ModulesSelect;
  //   // .filter((mod: any) => mod.NOME === "MDF-e")
  //   const optModulos: any = retornoModulos.map((mod: any) => ({
  //     value: mod.MOD_ID,
  //     label: mod.NOME,
  //   }));

  //   // setListaModulos(retornoModulos.retorno);
  //   setOptionsModulo(optModulos);
  //   console.log(retornoModulos);
  //   // getSelectedModule(optModulos, retornoModulos.retorno);
  // };

  const getModulos = async () => {
    if (profile.optionsModules.length) {
      const optModulos: Array<Modulo> = listaModulos.map(
        (mod: ModuloEmpresa) => ({
          value: mod.MOD_ID,
          label: mod.NOME,
        })
      );

      // setOptionsModulo(optModulos);
      getSelectedModule(optModulos, listaModulos);
    } else {
      carregaModuloPadrao();
    }
  };

  /* Executa sempre que trocar de empresa */
  const codeCompany = useMemo(() => profile.emp_id, [profile.emp_id]);
  useEffect(() => {
    console.log("render", profile.emp_id);
    setIdEmpresaAtual(Number(profile.emp_id));
    getModulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeCompany]);

  const handleModulo = async (selectedOption: any) => {
    /* busca o objeto completo referente ao módulo selecionado */
    const objModulo: ModuloEmpresa = listaModulos.find(
      (mod: any) => mod.MOD_ID === selectedOption.value
    )!;

    // window.document.title = `Saibweb | ${objModulo.NOME}`;
    const rotaInicial = getRotaInicial(objModulo.NOME);
    /* dispara a action para atualizar a renderização do menu */
    // dispatch(
    //   selectModule([
    //     {
    //       route: rotaInicial,
    //       module: objModulo.NOME,
    //       menu: objModulo.ITENS,
    //     },
    //   ])
    // );
    authStore.setSelectedModule({
      route: String(rotaInicial),
      module: objModulo.NOME,
      menu: objModulo.ITENS,
      id: objModulo.MOD_ID,
    });
    setModuloSelecionado(selectedOption);
    // navigate(rotaInicial);
    toast.success(`Você entrou no módulo: ${objModulo.NOME}`);
  };

  useEffect(() => {
    const element = document.getElementById("root");
    setMenuTarget(element);
  }, []);

  const optionsModulo = listaModulos.map((mod: ModuloEmpresa) => ({
    value: mod.MOD_ID,
    label: mod.NOME,
  }));

  return (
    <BoxMenu>
      <AreaComp wd="100">
        <label htmlFor="modulo">Módulo Ativo:</label>
        <CustomSelect
          name="change_modulo"
          id="modulo"
          classNamePrefix="Select"
          options={optionsModulo}
          onChange={handleModulo}
          value={moduloSelecionado}
          placeholder="Selecione um Módulo"
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
