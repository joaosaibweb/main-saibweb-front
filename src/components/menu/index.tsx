"use client";

import React, { useEffect, useState, Fragment } from "react";
// import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { IconButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";

// import MenuData from "../../../mocks/Menu.json";

import produce from "immer";

// import { ApiService, ApiTypes } from 'services/apiService';

import MenuIcon from "@material-ui/icons/Menu";

/* ===== Styles ===== */

import {
  MenuDiv,
  SideMenuContainer,
  ClickableBody,
  SideMenu,
  SideMenuTopContainer,
  SideMenuLogoContainer,
  SideMenuOptionsContainer,
  SideMenuItensContainer,
  ItemTitle,
  MenuScroll,
  SubitensContainer,
  SubitemTitle,
} from "./styles";
import { CssBaseline } from "@mui/material";
import Image from "next/image";
import { useAuth } from "@/store/authSlice";
import dynamic, { LoaderComponent } from "next/dynamic";
// import BotaoModulos from "../SelectModulo";
// import { makeStyles } from "@mui/styles";
/* ===== Styles ===== */

const DrawerWidth = 0;

interface RootState {
  auth: any;
}

interface MenuItem {
  item_id?: number;
  titulo: string;
  identificador: string;
  ativo: boolean;
  rota: string;
  icone: string;
  paddingLeft?: number;
  itens: MenuItem[];
}

type ItemApi = {
  ITEM_ID: number;
  NIVEL_SUPERIOR: string | number;
  NOME: string;
  ROTA: string;
  ICONE: string;
};

interface Subitem {
  identificador: string;
  itens?: Subitem[];
  ativo?: boolean;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DrawerWidth}px)`,
    marginLeft: DrawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: DrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    height: "40px",
    alignItems: "center",
    padding: theme.spacing(0, 4),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DrawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export function Menu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const authStore = useAuth();

  const { authData } = authStore;

  const [listaItensMenu, setItensMenu] = useState<MenuItem[]>([]);

  // const api = ApiService.getInstance(ApiTypes.ADM);

  const BotaoEmpresa = dynamic(() => import("../SelectEmpresa"), {
    ssr: false,
  });
  const BotaoModulos = dynamic(() => import("../SelectModulo"), {
    ssr: false,
  });
  /* ============ Padronização dos itens para o menu ======= */
  const padronizaIdentificador = (str: string): string => {
    let stringPadronizada = "/";

    stringPadronizada += str
      .replace(/\//gi, "")
      .replace(/[áÁãÃâÂàÀ]/gi, "a")
      .replace(/[éÉêÊ]/gi, "e")
      .replace(/[íÍ]/gi, "i")
      .replace(/[óÓõÕôÔ]/gi, "o")
      .replace(/[úÚ]/gi, "u")
      .replace(/[çÇ]/gi, "c")
      .replace(/ /gi, "-")
      .trim()
      .toLowerCase();

    return stringPadronizada;
  };

  const getItensFilhos = (
    array: any[],
    idNivelSuperior: number,
    identificador: string
  ): MenuItem[] => {
    const arrayPadronizar = array.filter(
      (item) => item.NIVEL_SUPERIOR === idNivelSuperior
    );
    const arrayPadronizado: MenuItem[] = [];

    arrayPadronizar.forEach((item) => {
      const identificadorItem = padronizaIdentificador(item.NOME);
      const itemPadronizado: MenuItem = {
        item_id: item.ITEM_ID,
        titulo: item.NOME,
        identificador: `${identificador}${identificadorItem}`,
        ativo: false,
        rota: item.ROTA,
        icone: item.ICONE,
        paddingLeft: 16,
        itens: [],
      };

      const itensFilhos = array
        .filter((x) => x.NIVEL_SUPERIOR === itemPadronizado.item_id)
        .map((filho) => {
          const identificadorFilho = `${identificador}${identificadorItem}${padronizaIdentificador(
            filho.NOME
          )}`;
          return {
            item_id: filho.ITEM_ID,
            titulo: filho.NOME,
            identificador: `${identificadorFilho}`,
            ativo: false,
            rota: filho.ROTA,
            icone: filho.ICONE,
            paddingLeft: 28,
            itens: [],
          };
        });

      if (itensFilhos.length > 0) {
        itemPadronizado.itens = itensFilhos;
      }

      arrayPadronizado.push(itemPadronizado);
    });
    return arrayPadronizado;
  };

  const mapeiaModulosDaApiParaTela = (
    arrayItensApi: Array<ItemApi>
  ): MenuItem[] => {
    const arrayPadronizado: MenuItem[] = [];
    arrayItensApi.forEach((item: ItemApi) => {
      const itemPrincipal: MenuItem = {
        titulo: item.NOME,
        identificador: `${padronizaIdentificador(item.NOME)}`,
        ativo: false,
        rota: item.ROTA,
        icone: item.ICONE,
        itens: [],
      };
      const itensComNivelSuperior = arrayItensApi.filter(
        (x) => x.NIVEL_SUPERIOR !== ""
      );

      const itensFilhos = getItensFilhos(
        itensComNivelSuperior,
        item.ITEM_ID,
        itemPrincipal.identificador
      );

      if (itensFilhos.length > 0) {
        itemPrincipal.itens = itensFilhos;
      }
      /* Adiciona na raiz do módulo apenas itens que não são filhos */
      if (!item.NIVEL_SUPERIOR) {
        arrayPadronizado.push(itemPrincipal);
      }
    });
    // console.log('modulos api', arrayModulosApi);
    // console.log('modulos padronizados menu', arrayPadronizado);
    return arrayPadronizado;
  };

  /* ============ Métodos e renderização do menu =========== */

  useEffect(() => {
    if (
      authData.selectedModule?.menu[0] &&
      authData.selectedModule.menu[0]?.ITEM_ID
    ) {
      const modulosParaTela = mapeiaModulosDaApiParaTela(
        authData.selectedModule?.menu
      );
      setItensMenu(modulosParaTela);
    } else {
      setItensMenu([]);
    }
  }, [authData.selectedModule]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSubitem = (
    listaSubitens: Subitem[],
    arrayIdexes: Array<string>,
    index: number
  ) => {
    listaSubitens.forEach((subitem: Subitem) => {
      if (subitem.identificador.endsWith(`/${arrayIdexes[index]}`)) {
        if (subitem.itens && arrayIdexes.length > index + 1) {
          toggleSubitem(subitem.itens, arrayIdexes, index + 1);
        } else {
          subitem.ativo = !subitem.ativo;
        }
      }
    });
  };

  const recolheMenu = () => {
    handleDrawerClose();

    const tempListaOpcoes = produce(listaItensMenu, (draft) => {
      draft.forEach((modulo) => {
        modulo.ativo = false;
      });
    });

    setItensMenu(tempListaOpcoes);
  };

  const toggleItemMenu = async (itemClicked: MenuItem): Promise<void> => {
    if (itemClicked.itens.length <= 0 && itemClicked.rota) {
      // redirecionarParaRota(itemClicked.rota);
    } else {
      const identificadorItem = itemClicked.identificador;
      const arrayIdexes = identificadorItem.substring(1).split("/");

      const tempArray = await Promise.all(
        listaItensMenu.map(async (item) => {
          if (item.identificador.endsWith(`/${arrayIdexes[0]}`)) {
            if (item.itens && arrayIdexes.length > 1) {
              /* se existirem mais niveis (registrados na variável arrayIndexes)
               * para percorrer chama a função recursivamente até chegar
               * no item selecionado na tela
               */
              toggleSubitem(item.itens, arrayIdexes, 1);
            } else {
              item.ativo = !item.ativo;
            }
          }

          return item;
        })
      );

      // const tempArray = produce(listaItensMenu, (draft) => {
      //   draft.forEach(async (item: MenuItem) => {
      //     console.log("draft", draft);
      //     if (item.identificador.endsWith(`/${arrayIdexes[0]}`)) {
      //       if (item.itens && arrayIdexes.length > 1) {
      //         /* se existirem mais niveis (registrados na variável arrayIndexes)
      //          * para percorrer chama a função recursivamente até chegar
      //          * no item selecionado na tela
      //          */
      //         await toggleSubitem(item.itens, arrayIdexes, 1);
      //       } else {
      //         item.ativo = !item.ativo;
      //       }
      //     }
      //   });
      // });
      setItensMenu(tempArray);
    }
  };

  /* ============ Configurações do módulo ============== */

  return (
    <>
      {/* ========== Layout do Menu ========== */}
      <MenuDiv className={classes.root}>
        <CssBaseline />
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>

        <SideMenuContainer visible={open}>
          <SideMenu>
            <SideMenuTopContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "156px",
                  backgroundColor: "#f3f3f3",
                }}
              >
                <Image priority alt="Logo" src={logo} />
              </div>

              <SideMenuOptionsContainer>
                <BotaoEmpresa />
                <BotaoModulos />
              </SideMenuOptionsContainer>
            </SideMenuTopContainer>

            <MenuScroll>
              <SideMenuItensContainer>
                {listaItensMenu.map((item) => (
                  <Fragment key={item.identificador}>
                    <ItemTitle
                      expanded={item.ativo}
                      onClick={() => toggleItemMenu(item)}
                      href={item.rota}
                    >
                      <i className={`fas fa-${item.icone}`} />
                      &nbsp;&nbsp;{item.titulo.toUpperCase()}
                      {item.itens.length > 0 && (
                        <span>
                          <i
                            className={
                              item.ativo
                                ? "fas fa-chevron-up"
                                : "fas fa-chevron-down"
                            }
                          />
                        </span>
                      )}
                    </ItemTitle>

                    {item.ativo && item.itens.length > 0 && (
                      <SubitensContainer aria-expanded={item.ativo}>
                        {/* {expanded={item.ativo}} */}
                        {/* primeiro nivel de subitens */}
                        {item.itens.map((subitem) => (
                          <Fragment key={subitem.titulo}>
                            <SubitemTitle
                              pdleft={subitem.paddingLeft}
                              expanded={subitem.ativo}
                              onClick={() => toggleItemMenu(subitem)}
                              href={subitem.rota}
                            >
                              <i className={`fas fa-${subitem.icone}`} />
                              &nbsp;&nbsp;{subitem.titulo.toUpperCase()}
                              {subitem.itens.length > 0 && (
                                <span>
                                  <i
                                    className={
                                      subitem.ativo
                                        ? "fas fa-chevron-up"
                                        : "fas fa-chevron-down"
                                    }
                                  />
                                </span>
                              )}
                            </SubitemTitle>
                            {/* segundo nivel de subitens */}
                            {subitem.ativo &&
                              subitem.itens.length > 0 &&
                              subitem.itens.map((subitem2) => (
                                <Fragment key={subitem2.titulo}>
                                  <SubitemTitle
                                    pdleft={subitem2.paddingLeft}
                                    expanded={subitem2.ativo}
                                    onClick={() => toggleItemMenu(subitem2)}
                                    href={subitem2.rota}
                                  >
                                    <i className={`fas fa-${subitem2.icone}`} />
                                    &nbsp;&nbsp;{subitem2.titulo.toUpperCase()}
                                    {subitem2.itens.length > 0 && (
                                      <span>
                                        <i
                                          className={
                                            subitem2.ativo
                                              ? "fas fa-chevron-up"
                                              : "fas fa-chevron-down"
                                          }
                                        />
                                      </span>
                                    )}
                                  </SubitemTitle>
                                </Fragment>
                              ))}
                          </Fragment>
                        ))}
                      </SubitensContainer>
                    )}
                  </Fragment>
                ))}
              </SideMenuItensContainer>
            </MenuScroll>
          </SideMenu>

          <ClickableBody
            onClick={() => {
              recolheMenu();
            }}
          />
        </SideMenuContainer>
      </MenuDiv>
      {/* ========== Layout do Menu ========== */}
    </>
  );
}
