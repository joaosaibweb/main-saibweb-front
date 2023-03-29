import styled from "styled-components";
import { lighten } from "polished";
import { device } from "@/styles/mediaQuery";
import backgroundImage from "@/assets/background-login.jpg";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  background-image: url(${backgroundImage.src});
  width: 100%;

  /* Center and scale the image */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BoxLogo = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 40px 40px 80px 40px;

  img {
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;

  @media ${device.mobileS} {
    width: 100%;
    padding: 0 10px;
  }

  @media ${device.tablet} {
    width: 100%;
    padding: 0 70px;
  }

  @media ${device.laptop} {
    width: 45%;
    padding: 0 70px;
  }

  @media ${device.laptopL} {
    width: 45%;
    padding: 0 70px;
  }

  img {
    max-width: 230px;
    margin-bottom: 65px;
  }

  h1 {
    font-size: 32px;
    color: #525050;
    margin-bottom: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-size: 14px;
      color: #9d9d9d;
      margin-bottom: 14px;
      margin-top: 14px;
    }

    input {
      font-weight: bold;
      background-color: #fefcff;
      border: 1px solid #cac8c8;
      border-radius: 6px;
      height: 38px;
      padding: 6px 10px;
      color: #495057;
      transition: background 0.3s;

      width: 100%;
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

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 25px 0 0;
      height: 44px;
      background: #61098a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.2, "#61098A")};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
