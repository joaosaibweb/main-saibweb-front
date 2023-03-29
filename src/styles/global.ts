import styled, { createGlobalStyle, css, keyframes } from "styled-components";
import { lighten } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { headShake } from "react-animations";
import "react-perfect-scrollbar/dist/css/styles.css";


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import "react-toastify/dist/ReactToastify.css";

import { device } from "./mediaQuery";

export default createGlobalStyle`
  .text-center{
    text-align: center;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar-thumb {
      background: rgba(98,9,139,0.50);
      border-radius: 8px;
      right: 2px;
      position: absolute;
    }
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  #clear_input {
    position: relative;
    float: right;
    height: 19px;
    width: 19px;
    font-weight:bold;
    font-size:14px;
    margin-top: -25px;
    right: 5px;
    border-radius: 20px;
    background: #E8E9EE;
    color: white;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  #clear_input:hover {
    background: #ccc;
  }

  input[type="radio"] {
    /* remove standard background appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* create custom radiobutton appearance */
    display: inline-block;
    width: 15px;
    height: 15px;
    /* padding: 6px; */
    /* background-color only for content */
    background-clip: content-box;
    border: 2px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
  }

/* appearance for checked radiobutton */
input[type="radio"]:checked {
  background-color: #61098a;
}
  .input_cad{
    border-radius: 6px;
    border: 1px solid #cac8c8;
    font-weight: bold;
    line-height: 1.3;
    color: #495057;
    background-color: #fefcff;
    width:100%;
    text-transform: uppercase;
    transition: background 0.3s;
    &::placeholder {
      color: #968c9c;
      font-size: 15px;
    }

    &:focus {
      background-color: #fefcff;
      border: 1px solid #b196d0;
      outline: 0;
      box-shadow: 0 0 0 1px #b196d0;
    }

    &:read-only {
      background-color: #f7f7f7;
      border: 1px solid #cac8c8;
      outline: 0;
      box-shadow: none;
    }

    @media ${device.mobileS} {
      padding: 4px 8px;
      font-size: 12px;
    }

    @media ${device.tablet} {
      padding: 4px 8px;
      font-size: 14px;
    }

    @media ${device.laptop} {
      padding: 4px 8px;
      font-size: 14px;
    }

    @media ${device.laptopL} {
      padding: 6px 10px;
      font-size: 15px;
    }

  }

  /* @media screen and (min-width: 320px) {
    .input_cad {
      padding: 4px 8px;
      font-size: 12px;
      height: auto;
    }
  }
  @media screen and (min-width: 768px) {
    .input_cad {
      padding: 4px 8px;
      font-size: 14px;
      height: auto;
    }
  }
  @media screen and (min-width: 1024px) {
    .input_cad {
      padding: 4px 8px;
      font-size: 14px;
    }
  }
  @media screen and (min-width: 1440px) {
    .input_cad {
      padding: 6px 10px;
      font-size: 15px;
      height: 32px;
    }
  } */

  .textarea_cad{
    font-size: 15px;
    font-weight: bold;
    background-color: #fefcff;
    border: 1px solid #cac8c8;
    border-radius: 6px;
    padding: 6px 10px;
    color: #495057;
    text-transform: uppercase;
    transition: background 0.3s;

    width:100%;
    &::placeholder {
      color: #968c9c;
      font-size: 15px;
    }

    &:focus {
      background-color: #fefcff;
      border: 1px solid #b196d0;
      outline: 0;
      box-shadow: 0 0 0 0.2rem #b196d0;
    }

    &:read-only {
      background-color: #fefcff;
      border: 1px solid #cac8c8;
      outline: 0;
      box-shadow: none;
    }
  }

  .btn1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 0;
    margin-top: 1px;
    padding: 0 12px;
    height: 32px;
    /* background: #61098a; */
    background: #543676;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 6px;
    font-size: 14px;
    transition: background 0.2s;

    @media ${device.mobileS} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.tablet} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.laptop} {
      font-size: 12px;
      height: 28px;
    }

    @media ${device.laptopL} {
      font-size: 16px;
      height: 32px;
    }

    &:hover {
      /* background: ${lighten(0.2, "#61098A")}; */
      background: ${lighten(0.2, "#4D2A75")};
    }

    &:disabled {
      /* background: #61098a; */
      background: #543676;
      cursor: not-allowed;
    }

    svg {
      @media ${device.mobileS} {
        font-size: 16px;
      }

      @media ${device.tablet} {
        font-size: 16px;
      }

      @media ${device.laptop} {
        font-size: 18px;
      }

      @media ${device.laptopL} {
        font-size: 21px;
      }
    }
  }

  .btn2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    margin-top: 1px;
    padding: 0 10px 0 10px;
    height: 32px;
    background: #149918;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: background 0.2s;

    @media ${device.mobileS} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.tablet} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.laptop} {
      font-size: 12px;
      height: 28px;
    }

    @media ${device.laptopL} {
      font-size: 16px;
      height: 32px;
    }

    &:hover {
      background: ${lighten(0.2, "#149918")};
    }

    &:disabled {
      background: #149918;
      cursor: not-allowed;
    }

    svg {
      @media ${device.mobileS} {
        font-size: 16px;
      }

      @media ${device.tablet} {
        font-size: 16px;
      }

      @media ${device.laptop} {
        font-size: 18px;
      }

      @media ${device.laptopL} {
        font-size: 21px;
      }
    }
  }

.btn3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-top: 1px;
  padding: 0 10px 0 10px;
  height: 32px;
  background: #e42a3c;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  transition: background 0.2s;

  @media ${device.mobileS} {
    font-size: 12px;
    padding: 10px;
    height: 26px;
  }

  @media ${device.tablet} {
    font-size: 12px;
    padding: 10px;
    height: 26px;
  }

  @media ${device.laptop} {
    font-size: 12px;
    height: 28px;
  }

  @media ${device.laptopL} {
    font-size: 16px;
    height: 32px;
  }

  &:hover {
    background: ${lighten(0.2, "#e42a3c")};
  }

  svg {
    @media ${device.mobileS} {
      font-size: 16px;
    }

    @media ${device.tablet} {
      font-size: 16px;
    }

    @media ${device.laptop} {
      font-size: 18px;
    }

    @media ${device.laptopL} {
      font-size: 21px;
    }
  }
}

.btn-success {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    margin-top: 1px;
    padding: 0 10px 0 10px;
    height: 32px;
    background: #02C3A7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.5s;

    @media ${device.mobileS} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.tablet} {
      font-size: 12px;
      padding: 10px;
      height: 26px;
    }

    @media ${device.laptop} {
      font-size: 12px;
      height: 28px;
    }

    @media ${device.laptopL} {
      font-size: 16px;
      height: 32px;
    }

    &:hover {
      background: #0BE1C1;
    }

    &:disabled {
      background: #31B9A5;
      cursor: not-allowed;
    }

    svg {
      @media ${device.mobileS} {
        font-size: 16px;
      }

      @media ${device.tablet} {
        font-size: 16px;
      }

      @media ${device.laptop} {
        font-size: 18px;
      }

      @media ${device.laptopL} {
        font-size: 21px;
      }
    }
  }

/* @media screen and (min-width: 320px) {
  .btn1, .btn2, .btn3, .btn-success {
    font-size: 12px;
    height: auto;
    padding: 10px;
    height: 26px;
  }
}
@media screen and (min-width: 768px) {
  .btn1, .btn2, .btn3, .btn-success {
    font-size: 12px;
    height: auto;
    padding: 10px;
    height: 26px;
  }
}
@media screen and (min-width: 1024px) {
  .btn1, .btn2, .btn3, .btn-success {
    font-size: 12px;
    height: 28px;
  }
}
@media screen and (min-width: 1440px) {
  .btn1, .btn2, .btn3, .btn-success {
    font-size: 16px;
    height: 32px;
  }
} */


form label {
  color: #6b6565;
  font-weight: 500;
  font-size: 13px;
}

.grid-button {
  background-color: transparent;
  border: none;
  outline: 0;
  padding: 0;
  margin-right: 14px;
}
.grid-button .block {
  cursor: not-allowed!important
}


.grid-button:last-child {
  margin-right: 0;
}

.grid-button i {
  color: #61098a;
}

/* ========= Customizações AG-Grid ============ */

div.ag-root .ag-cell-focus {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
}

.ag-cell {
  text-transform: uppercase;

  @media ${device.mobileS} {
    font-size: 10px;
  }

  @media ${device.tablet} {
    font-size: 10px;
  }

  @media ${device.laptop} {
    font-size: 12px;
  }

  @media ${device.laptopL} {
    font-size: 13px;
  }
}

.grid-red-row {
  background-color: #e42a3c !important;
}

.ag-theme-balham .grid-red-row.ag-row-selected {
  background-color: #e42a3c !important;
}

.ag-theme-balham {
  font-family: 'Roboto',sans-serif !important;
}
.row-with-error,  .row-red{
  background-color: #e42a3c!important;
}

.row-orange, .row-with-alert{
  background-color: #F9C998!important;
}
.row-green, .row-with-success{
  background-color: #8ACC8B!important;
}


.ag-theme-balham .ag-row-selected {
  /* background-color: rgba(100,12,141,0.6) !important; */
  background-color: rgb(141 68 175 / 60%) !important;
}

.ag-theme-balham  .ag-row-selected .ag-cell {
  color: #fff;
}

.ag-theme-balham  .ag-row-selected .ag-cell .ag-cell-editor {
  color: #000;
}

.ag-theme-balham .ag-select .ag-picker-field-wrapper {
  color: #000;
}

.ag-header {
  height: 28px !important;
  min-height: 28px !important;

  /* @media ${device.mobileS} {
    height: 27px;
    min-height: 27px;
  }

  @media ${device.tablet} {
    height: 27px;
    min-height: 27px;
  }

  @media ${device.laptop} {
    height: 28px;
    min-height: 28px;
  }

  @media ${device.laptopL} {
    height: 33px;
    min-height: 33px;
  } */
}

.ag-header-cell-text {
  font-size: 14px;
  font-weight: bold;

  @media ${device.mobileS} {
    font-size: 11px;
  }

  @media ${device.tablet} {
    font-size: 11px;
  }

  @media ${device.laptop} {
    font-size: 12px;
  }

  @media ${device.laptopL} {
    font-size: 14px;
  }
}

.ag-header-cell-editable {
  color: #610989 !important;
}

.ag-row-hover {
  box-shadow: 1px 1px 6px 1px #b1b1b1;
}


.MuiAppBar-root {
  z-index: 0 !important;
}

/* ========= Customizações CheckboxTree ============ */
.react-checkbox-tree label {
  padding: 2px 4px;
  border-radius: 4px;
}
/* .react-checkbox-tree .rct-checkbox {
  display: none;
} */
.react-checkbox-tree label:hover, .react-checkbox-tree label:focus {
  background: #dadafd;

}

.react-checkbox-tree label:hover .rct-title {
  color: #312f2f;
}

.react-checkbox-tree .rct-title {
  font-family: 'Roboto', sans-serif;
  color: #676262;
  font-weight: 500;

  @media ${device.mobileS} {
    font-size: 11px;
  }

  @media ${device.tablet} {
    font-size: 11px;
  }

  @media ${device.laptop} {
    font-size: 12px;
  }

  @media ${device.laptopL} {
    font-size: 14px;
  }
}


/* ========= Customizações React-Tooltip ============ */
.saib-tooltip {
  font-size: 12px;
  padding: 4px !important;
}

/* ======= Customizações Material-ui checkbox ======= */
.MuiCheckbox-root {
  padding: 4px !important;
}

.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1  {
  /* font-size: 13px !important; */
  @media ${device.mobileS} {
    font-size: 13px;
  }

  @media ${device.tablet} {
    font-size: 13px;
  }

  @media ${device.laptop} {
    font-size: 14px;
  }

  @media ${device.laptopL} {
    font-size: 15px;
  }
}

/*customizando date-picker material-ui*/



/*
 -  cabeçalho calendario: S, T, Q, Q...
 */
span.MuiTypography-root.MuiTypography-caption.css-1w13o7u-MuiTypography-root{
  font-weight: 700;
}

/*
 -  botão de selecionar o dia
*/
button.MuiButtonBase-root.MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin.css-bkrceb-MuiButtonBase-root-MuiPickersDay-root,
button.MuiButtonBase-root.MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin.MuiPickersDay-today.css-195y93z-MuiButtonBase-root-MuiPickersDay-root{
  background-color: #7d46bb !important;
}

.css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected){
  border: 1px solid #7d46bb!important;
}

/*
  container dias do calendario
 */
.css-dhopo2{
   min-height: 220px!important;
}

/*
 - linhas do relógio
*/
.css-7lip4c, .css-118whkv, .css-12ha4i7 {
  background-color: #7d46bb !important;
}
.css-2ujp1m{
  border: 16px solid #7d46bb!important;
}
.css-118whkv  {
  background-color: #7d46bb !important;
  border: 16px solid #7d46bb!important;
}


/*
 -  botão de confirmar data/data-hora selecionada
*/
button.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButtonBase-root.css-1e6y48t-MuiButtonBase-root-MuiButton-root{
  color: #7d46bb !important;
  /* font-weight: 700; */
}

/*
  rodape do calendario linha do botão confirmar e cancelar
*/
.MuiDialogActions-root.MuiDialogActions-spacing.css-1ay6ak0-MuiDialogActions-root{
  justify-content: space-between!important;
}

`;

/* ======== Estilização padrão das páginas ======= */
export const Scroll = styled(PerfectScrollbar)`
  width: 100%;
  padding-bottom: 15px;
  padding-right: 8px;
  overflow: -moz-scrollbars-vertical;

  ::-webkit-scrollbar-thumb {
    background: rgba(98, 9, 139, 0.5) !important;
  }

  ::-webkit-scrollbar {
    background: transparent;
  }

  .ps__thumb-y {
    background-color: rgba(98, 9, 139, 0.5) !important;
  }

  .ps__rail-y {
    display: block !important;
    opacity: 1 !important;
  }

  .ps__rail-x {
    display: block !important;
    opacity: 1 !important;
  }

  .ps__thumb-x {
    background-color: rgba(98, 9, 139, 0.5) !important;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 97%;
  margin: 0 auto;

  ::-webkit-scrollbar-thumb {
    background: rgba(98, 9, 139, 0.5);
    border-radius: 8px;
    right: 2px;
    position: absolute;
  }

  ::-webkit-scrollbar {
    background: transparent;
    width: 8px !important;
  }

  .MuiInputBase-root {
    font-size: 14px;
    color: #544a57;
    font-weight: bold;
  }

  .MuiTypography-root {
    padding: 1px;
  }

  .MuiPaper-elevation4 {
    box-shadow: none;
    background: #fff;
    border-bottom: solid 1px #61098a;
  }

  .MuiTabs-indicator {
    background-color: #61098a;
  }

  .MuiTab-textColorPrimary {
    color: #61098a;
  }

  .MuiTab-textColorPrimary.Mui-selected {
    color: #420264;
  }
  .MuiCheckbox-colorPrimary.Mui-checked {
    color: #420264;
  }

  select {
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    background: #f6f8ff;
    border: solid 1px #d8dbea;
    border-radius: 4px;
    height: 32px;
    padding-left: 5px;
    padding-right: 7px;
    color: #544a57;

    transition: background 0.3s;
    width: 100%;

    &:focus {
      border: solid 1px #ccc;
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
      background: #fcffd3;
    }
  }

  option {
    color: #544a57;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 150;
    background-color: #f6f8ff;
    border: solid 1px #d8dbea;
  }

  /* @media (max-width: 1024px) {
    overflow: scroll;
  } */
`;

interface propsCModal {
  wd: number;
  hg: number;
}

export const CModal = styled.div<propsCModal>`
  width: ${(props) => props.wd};
  height: ${(props) => props.hg};
  margin: 0 auto;
  padding: 10px;
  background: #fafafa;
`;

interface propsTutleBar {
  wd: number;
}

export const TitleBar = styled.div<propsTutleBar>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  width: ${(props) => props.wd};
  height: 30px;
  background: #fafafa;
  border-bottom: solid 1px #ccc;

  h1 {
    /* font-size: 15px; */
    font-weight: 700;
    color: #500569;

    @media ${device.mobileS} {
      font-size: 11px;
    }

    @media ${device.tablet} {
      font-size: 11px;
    }

    @media ${device.laptop} {
      font-size: 13px;
    }

    @media ${device.laptopL} {
      font-size: 15px;
    }
  }

  button {
    border: 0;
    background: none;

    svg {
      @media ${device.mobileS} {
        font-size: 18px;
      }

      @media ${device.tablet} {
        font-size: 18px;
      }

      @media ${device.laptop} {
        font-size: 21px;
      }

      @media ${device.laptopL} {
        font-size: 26px;
      }
    }
  }
`;

export const HoverIcon = styled.div`
  svg {
    &:hover {
      path {
        color: ${lighten(0.2, "#4D2A75")};
      }
    }
  }
`;

export const Linha = styled.div`
  background: #500569;
  margin-bottom: 20px;
  height: 1px;
  width: 100%;
`;

interface propsAreaComp {
  flex?: string;
  algSelf?: string;
  fDirection?: string;
  algItems?: string;
  pleft?: string;
  ptop?: string;
  pright?: string;
  noPd?: boolean;
  mg?: number;
  wd?: string;
  minWd?: number;
  hver?: boolean;
  bright?: string;
  btn?: string;
  wdr?: number;
}

export const AreaComp = styled.div<propsAreaComp>`
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) =>
    props.fDirection ? props.fDirection : "column"};
  justify-content: center;
  justify-items: left;
  align-self: ${(props) => (props.algSelf ? props.algSelf : "center")};
  align-items: ${(props) => (props.algItems ? props.algItems : "unset")};
  padding-left: ${(props) => props.pleft};
  padding-top: ${(props) => props.ptop};
  padding-right: ${(props) => props.pright};
  padding-right: ${(props) => (props.noPd ? "0" : "5px")};
  padding-bottom: ${(props) => (props.noPd ? "0" : "5px")};
  margin: ${(props) => (props.mg ? props.mg : 0)};
  width: ${(props) => props.wd}%;
  font-size: 14px;
  font-weight: 400;
  min-height: 35px;
  color: #500569;
  font-size: 12px;
  color: #232c4f;
  min-width: ${(props) => (props.minWd ? props.minWd : "auto")};

  ${(props) =>
    props.hver &&
    css`
      &:hover {
        label,
        span {
          font-size: 12px;
          transition: font-size 0.4s;
        }
      }
    `}

  ${(props) =>
    props.bright &&
    css`
      border-right: solid 1px #ccc;
    `}

    ${(props) =>
    props.btn &&
    css`
      button {
        border: 0;
        background: none;
      }
    `}
  h1 {
    color: #fa7d00;
    font-weight: 700;
    font-size: 14px;
  }

  h3 {
    width: 100%;
    text-align: right;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #61098a;
  }

  h2 {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #61098a;
  }

  label {
    color: #6b6565;
    font-weight: 500;
    font-size: 13px;
  }

  @media ${device.mobileS} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.tablet} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.laptop} {
    width: ${(props) => props.wd}%;
  }

  @media ${device.laptopL} {
    width: ${(props) => props.wd}%;
  }
`;

export const AreaCad = styled.div`
  width: 100%;
`;

interface propsAreaConsulta {
  pleft?: string;
  pright?: string;
  ptop?: string;
  pbottom?: string;
  pd?: string;
}

export const AreaConsult = styled.div<propsAreaConsulta>`
  width: 100%;
  padding-left: ${(props) => props.pleft};
  padding-right: ${(props) => props.pright};
  padding-top: ${(props) => props.ptop};
  padding-bottom: ${(props) => props.pbottom};
  padding: ${(props) => props.pd};
`;

interface propsBoxComponets {
  fend?: string;
  flwrap?: string;
  pdtop?: string;
  pdbottom?: string;
  pdleft?: string;
  pdright?: string;
  pd?: string;
  fDirection?: string;
  algSelf?: string;
  algItems?: string;
  maxWd?: string;
  flex?: string;
  wd?: string;
}

export const BoxComponentes = styled.div<propsBoxComponets>`
  display: flex;

  justify-content: ${(props) => (props.fend ? "flex-end" : "flex-start")};
  justify-items: center;
  flex-wrap: ${(props) => (props.flwrap ? "wrap" : "unset")};
  margin: 0px;
  padding-top: ${(props) => props.pdtop}px;
  padding-bottom: ${(props) => props.pdbottom}px;
  padding-left: ${(props) => (props.pdleft ? props.pdleft : 2)}px;
  padding-right: ${(props) => (props.pdright ? props.pdright : 2)}px;
  padding: ${(props) => props.pd};
  width: ${(props) => props.maxWd || "100%"};
  max-width: ${(props) => props.maxWd};
  align-items: ${(props) => props.algItems};

  flex: ${(props) => props.flex ?? "unset"};
  /* overflow-y: hidden !important; */
  @media ${device.mobileS} {
    /* flex-direction: column; */
    flex-direction: ${(props) =>
    props.fDirection ? props.fDirection : "column"};
  }

  @media ${device.tablet} {
    /* flex-direction: column; */
    flex-direction: ${(props) =>
    props.fDirection ? props.fDirection : "column"};
    .ag-theme-balham {
      height: 50vh !important;
    }
  }

  @media ${device.laptop} {
    /* flex-direction: row; */
    width: ${(props) => props.wd}%;
    flex-direction: ${(props) => (props.fDirection ? props.fDirection : "row")};

    .ag-theme-balham {
      height: 50vh !important;
    }
  }

  @media ${device.laptopL} {
    /* flex-direction: row; */
    width: ${(props) => props.wd}%;
    flex-direction: ${(props) => (props.fDirection ? props.fDirection : "row")};
    .ag-theme-balham {
      height: 60vh !important;
    }
  }
`;
const headShakeEffect = keyframes`${headShake}`;

export const CustomSelect = styled(Select) <{ invalid: boolean }>`
  ${(props) =>
    props.invalid &&
    css`
      animation: 0.6s ${headShakeEffect};
    `}

  /* & .Select__control {
    background-color: #fefcff;
  } */
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
  }

  @media ${device.mobileS} {
    & .Select__control {
      height: 26px;
      min-height: 26px;
      height: auto;
    }
    & .Select__indicator {
      margin-top: -6px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }

    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 32px;
      min-height: 32px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 15px;
      top: 50%;
    }
    & .Select__indicator-separator {
      margin-top: 8px;
    }
  }
  & .Select__control {
    ${(props) =>
    props.isMulti &&
    css`
        height: auto;
      `}
  }
`;

export const AsyncCustomSelect = styled(AsyncSelect) <{
  invalid: boolean;
}>`
  ${(props) =>
    props.invalid &&
    css`
      animation: 0.6s ${headShakeEffect};
    `}

  /* & .Select__control {
    background-color: #fefcff;
  } */
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
  }

  @media ${device.mobileS} {
    & .Select__control {
      height: 26px;
      min-height: 26px;
    }
    & .Select__indicator {
      margin-top: -6px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }

    & .Select__indicator {
      margin-top: -4px;
    }
    & .Select__single-value {
      font-size: 14px;
      top: 48%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 32px;
      min-height: 32px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 15px;
      top: 50%;
    }
    & .Select__indicator-separator {
      margin-top: 8px;
    }
  }
`;

interface propsTolbarContainer {
  bckColor?: string;
}

export const ToolbarContainer = styled.div<propsTolbarContainer>`
  width: 100%;
  height: 40vh;
  background-color: ${(props) => (props.bckColor ? props.bckColor : "#4d2679")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* position: fixed;
  top: 100px; */
  height: auto;
  z-index: 152;

  @media ${device.mobileS} {
    margin-bottom: 6px;
  }

  @media ${device.tablet} {
    margin-bottom: 6px;
  }

  @media ${device.laptop} {
    margin-bottom: 8px;
  }

  @media ${device.laptopL} {
    margin-bottom: 13px;
  }
`;

export const ToolbarButton = styled.button`
  text-align: center;
  padding: 3px 16px 0px 16px;
  /* background: #61098a; */
  background: transparent;
  font-weight: bold;
  color: #fff;
  border: 0;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #723ead;
  }
`;

export const ToolbarButtonWarning = styled(ToolbarButton)`
  &:hover {
    background: #e42a3c;
  }
`;

export const ToolbarButtonConfirm = styled(ToolbarButton)`
  &:hover {
    background: #149918;
  }
`;

interface propsTitleContainer {
  jcontent: string;
  mleft: string;
  mtop: string;
  wd: string;
  bg: string;
  hg: string;
}

export const TitleContainer = styled.div<propsTitleContainer>`
  display: flex;

  justify-content: ${(props) =>
    props.jcontent ? props.jcontent : "flex-start"};
  align-items: ${(props) => (props.jcontent ? props.jcontent : "flex-start")};
  margin-left: ${(props) => props.mleft}px;
  margin-top: ${(props) => props.mtop}px;
  width: ${(props) => props.wd}%;
  background: ${(props) => (props.bg ? props.bg : "#eee9f4")};
  height: ${(props) => props.hg}px;

  /* text-align: center; */
  border: 0;
  border-radius: 3px;

  @media ${device.mobileS} {
    padding: 4px;
    margin-bottom: 10px;
  }

  @media ${device.tablet} {
    padding: 4px;
    margin-bottom: 10px;
  }

  @media ${device.laptop} {
    padding: 6px;
    margin-bottom: 12px;
  }

  @media ${device.laptopL} {
    padding: 8px;
    margin-bottom: 14px;
  }

  h2 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 15px;
    }

    @media ${device.tablet} {
      font-size: 15px;
    }

    @media ${device.laptop} {
      font-size: 16px;
    }

    @media ${device.laptopL} {
      font-size: 18px;
    }

    small {
      font-size: 13px;
      margin-left: 10px;
    }
  }

  h3 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 14px;
    }

    @media ${device.tablet} {
      font-size: 14px;
    }

    @media ${device.laptop} {
      font-size: 15px;
    }

    @media ${device.laptopL} {
      font-size: 17px;
    }

    small {
      font-size: 12px;
      margin-left: 10px;

      svg {
        position: relative;
        bottom: -3px;
      }
    }
  }

  h4 {
    color: #4d2679;
    font-weight: bold;

    @media ${device.mobileS} {
      font-size: 11px;
    }

    @media ${device.tablet} {
      font-size: 11px;
    }

    @media ${device.laptop} {
      font-size: 12px;
    }

    @media ${device.laptopL} {
      font-size: 14px;
    }

    small {
      font-size: 11px;
      margin-left: 10px;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ToolbarBtn = styled(ToolbarButton)`
  padding: 5px 10px 3px 10px;
  transition: background 0.4s;

  &:hover {
    background-color: #a13a93;
  }

  svg {
    font-size: 25px;
  }
`;

interface propsRow {
  jContent: string;
  flwrap: string;
  mg: number;
  mgtop: number;
  mgbottom: number;
  pdtop: number;
  pdbottom: number;
  pdleft: number;
  pdright: number;
  pd: number;
  maxWd: number;
}

export const Row = styled.div<propsRow>`
  display: flex;
  justify-content: ${(props) => props.jContent};
  justify-items: center;
  flex-wrap: ${(props) => (props.flwrap ? "wrap" : "unset")};
  margin: ${(props) => props.mg};
  margin-top: ${(props) => props.mgtop}px;
  margin-bottom: ${(props) => props.mgbottom}px;
  padding-top: ${(props) => props.pdtop}px;
  padding-bottom: ${(props) => props.pdbottom}px;
  padding-left: ${(props) => (props.pdleft ? props.pdleft : 2)}px;
  padding-right: ${(props) => (props.pdright ? props.pdright : 2)}px;
  padding: ${(props) => props.pd && props.pd};
  width: ${(props) => props.maxWd || "100%"};
  max-width: ${(props) => props.maxWd};
`;
/* ======== Estilização padrão das páginas ======= */
