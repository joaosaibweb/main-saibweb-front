import styled, { keyframes } from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import { fadeIn } from "react-animations";

import { device } from "../../styles/mediaQuery";
import logo from "../../assets/logo.png";
import { colors } from "@/styles/colors";

export const Container = styled.div`
  width: 100%;
  height: 95%;
  margin: 0 auto;
  padding-left: 10px;
  select {
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
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
    font-size: 13px;
    line-height: 150;
    background-color: #f6f8ff;
    border: solid 1px #d8dbea;
    font-weight: 500;
  }

  form {
    span {
      font-size: 10px;
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }
`;

export const MenuDiv = styled.div`
  .MuiList-padding {
    padding-top: 2px;
    padding-bottom: 2px;
  }
`;

export const TitleMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-content: left;
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0.3);
  padding-left: 5px;

  h1 {
    padding-left: 7px;
    text-transform: uppercase;

    font-size: 14px;
    font-weight: 700;
    color: #000;
  }
`;

export const Moldura = styled.div`
  display: flex;
  height: 25px;
  padding-left: 14px;
  &:hover {
    height: 25px;
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const BackMenu = styled.div`
  height: 100%;
  cursor: pointer;
  background: #61098a;
  h1 {
    font-size: 12px;
    font-weight: 500;
    color: #e8deec;
    padding-left: 5px;
  }
`;

export const ItemMenu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
`;

export const ItemLogo = styled.div`
  img {
    margin-right: 20px;
    padding-right: 20px;
    height: 50px;
  }
`;

// --------------------

/* ========== Animações ========== */

const fadeInEffect = keyframes`${fadeIn}`;
/* ========== Animações ========== */

interface PropsSideMenuContainer {
  visible: boolean;
}

export const SideMenuContainer = styled.aside<PropsSideMenuContainer>`
  position: absolute;
  height: 100%;
  width: ${(props) => (props.visible ? "100%" : "0")};
  background-color: ${(props) =>
    props.visible ? "rgba(0,0,0,0.5)" : "transparent"};
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.4s;
  /* z-index: 100; */
  display: flex;
`;

export const ClickableBody = styled.div`
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

export const SideMenu = styled.div`
  position: absolute;
  padding: 0;
  /* background-color: #4e2a77 !important; */
  background-color: ${colors.primaria} !important;
  height: 100%;

  @media ${device.mobileS} {
    width: 300px;
  }

  @media ${device.tablet} {
    width: 380px;
  }

  @media ${device.laptop} {
    width: 380px;
  }

  @media ${device.laptopL} {
    width: 380px;
  }
`;

export const SideMenuTopContainer = styled.div`
  height: 280px;
  background-color: #fff;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;

  img {
    height: 106px;
    width: 70%;
    background-color: #f3f3f3;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 70%;
  }
`;

export const SideMenuLogoContainer = styled.img`
  height: 156px;
  /* The image used */
  background-image: url(${logo});
  width: 100%;
  background-color: #f3f3f3;

  /* Center and scale the image */
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
`;
// export const SideMenuLogoContainer = styled.div`;
//   height: 156px;
//   /* The image used */
//   background-image:  url('${logo}');
//   width: 100%;
//   background-color: #f3f3f3;

//   /* Center and scale the image */
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 70%;
// `;

export const SideMenuOptionsContainer = styled.div`
  height: 124px;
  background-color: #f3f3f3;
  width: 100%;
  padding: 2px;
`;

export const MenuScroll = styled(PerfectScrollbar)`
  width: 100%;

  height: 65%;
`;

export const SideMenuItensContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface PropsItemTitle {
  expanded: boolean;
}

export const ItemTitle = styled.a<PropsItemTitle>`
  outline: 0;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  font-size: 15px;
  color: ${(props) => (props.expanded ? "#ededed" : "#fff")};
  display: flex;
  /* background-color: ${(props) =>
    props.expanded ? "#461e73" : "#4e2a77"}; */
  background-color: ${(props) =>
    props.expanded ? colors.primaria_opaca : colors.primaria};
  transition: 0.3s;

  &:hover {
    color: #ededed;
    background-color: ${colors.primaria_opaca};
    cursor: pointer;
  }

  span {
    padding: 0 5px;
    position: absolute;
    right: 4px;
  }
`;

export const SubitensContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.primaria_escura};
  animation: 0.4s ${fadeInEffect};
  /* padding: 6px 0; */
`;

interface PropsSubitemTitle {
  pdleft: number | undefined;
  expanded: boolean;
}

export const SubitemTitle = styled.a<PropsSubitemTitle>`
  outline: 0;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: ${(props) => props.pdleft}px;
  font-size: 15px;
  color: ${(props) => (props.expanded ? "#c7c7c7" : "#fff")};
  display: flex;
  background-color: transparent;
  transition: 0.3s;
  border-left: ${`3px solid ${colors.secundaria_opaca}`};

  &:hover {
    color: #ededed;
    background-color: ${colors.primaria_opaca};
    cursor: pointer;
  }

  span {
    padding: 0 5px;
    position: absolute;
    right: 4px;
  }
`;
