import styled from "styled-components";
import { device } from "../../styles/mediaQuery";

export const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 0 10px;
`;

export const Dvspace = styled.div`
  padding: 2px;
`;
export const Content = styled.div`
  height: 63px;

  width: auto;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    .image-logo {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #eee;
      width: auto;

      @media ${device.mobileS} {
        height: 22px;
      }

      @media ${device.tablet} {
        height: 39px;
      }

      @media ${device.laptop} {
        height: 40px;
      }

      @media ${device.laptopL} {
        height: 50px;
      }
    }

    /* a {
      font-size: 16px;
      font-weight: bold;
      color: #61098a;
    } */
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  /* padding-left: 10px; */
  border-left: 1px solid #eee;

  @media ${device.mobileS} {
    margin-left: 20px;
    padding-left: 20px;
  }

  @media ${device.tablet} {
    margin-left: 0;
    padding-left: 0;
  }

  @media ${device.laptop} {
    margin-left: 0px;
    padding-left: 0px;
  }

  @media ${device.laptopL} {
    margin-left: 20px;
    padding-left: 20px;
  }

  div {
    text-align: right;
    margin-right: 10px;

    @media ${device.mobileS} {
      display: none;
    }

    @media ${device.tablet} {
      display: none;
    }

    @media ${device.laptop} {
      display: block;
      width: 170px;
    }

    @media ${device.laptopL} {
      display: block;
      width: 170px;
    }

    strong {
      display: block;
      /* color: #333; */
      color: #757575;
      margin-top: 4px;
      font-size: 12px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }

    span {
      padding-top: 2px;
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    border: 0;
    background: none;
  }

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
`;

export const InfoContainer = styled.div`
  flex-direction: column;
  margin: 0 auto;
  width: 418px;
  overflow: hidden;
  padding-left: 10px;

  svg {
    color: #757575;
    margin-top: 6px;
    margin-right: 5px;
  }

  p {
    text-align: left;
    margin-top: 3px;

    span {
      width: auto;
      text-align: left;
      font-weight: bold;
      /* color: #61098a; */
      color: #757575;
      font-size: 12px;
      /* color: #500569; */
      /* text-shadow: 0px 0px 1px; */
    }
  }

  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.tablet} {
    display: flex;
  }

  @media ${device.laptop} {
    display: flex;
  }

  @media ${device.laptopL} {
    display: flex;
  }
`;

interface PropsInfoText {
  pleft: string;
  ptop: string;
  pright: string;
  talign: string;
  wd: string;
}

export const InfoText = styled.div<PropsInfoText>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: left;
  align-self: center;
  padding-left: ${(props) => props.pleft};
  padding-top: ${(props) => props.ptop};
  padding-right: ${(props) => props.pright};
  /* padding-bottom: 5px; */
  font-size: 16px;
  font-weight: 400;
  min-height: 35px;
  margin: 0;

  h3 {
    width: 100%;
    text-align: ${(props) => props.talign};
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #61098a;
    /* color: #500569; */
    /* text-shadow: 0px 0px 1px; */
  }

  @media ${device.mobileS} {
    width: 100%;
  }

  @media ${device.tablet} {
    width: 100%;
  }

  @media ${device.laptop} {
    width: ${(props) => props.wd}%;
  }

  @media ${device.laptopL} {
    width: ${(props) => props.wd}%;
  }
`;
