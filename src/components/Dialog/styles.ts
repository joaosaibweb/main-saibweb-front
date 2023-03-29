import styled, { keyframes, css } from 'styled-components';
import { slideInDown, slideOutUp } from 'react-animations';
import { device } from '../../styles/mediaQuery';

const slideInEffect = keyframes`${slideInDown}`;
const slideOutEffect = keyframes`${slideOutUp}`;

type PropsBaseModal = {
  isOpen: boolean,
  isParent?: boolean,
}

export const BaseModal = styled.div<PropsBaseModal>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  /* overflow: scroll; */
  animation: 0.6s ${(props) => (props.isOpen ? slideInEffect : slideOutEffect)};
  z-index: ${(props) => (props.isParent ? 700 : 500)};
`;


type PropsModalContainer = {
  print?: boolean;
  isParent?: boolean;
  contentSize?: any;
}

export const ModalContent = styled.div<PropsModalContainer>`
  background-color: #fafafa;
  border-radius: 6px;
  position: absolute;
  top: 2vh;
  height: ${(props) => (props.print ? '88vh' : 'auto')};

  ${(props) =>
    props.isParent &&
    css`
      z-index: 600;
    `}

  @media ${device.mobileS} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 80%;
  }

  @media ${device.laptop} {
    width: ${(props) => props.contentSize};
  }

  @media ${device.laptopL} {
    width: ${(props) => props.contentSize};
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 16px;
  font-size: 16px;
  background-color: transparent;
  color: #4e2a77;
  border: none;

  &:hover {
    background-color: #4e2a77;
    color: #fff;
    cursor: pointer;
  }
`;

type propsTitleBar = {
  wd?: string;
}

export const TitleBar = styled.div<propsTitleBar>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  width: ${(props) => props.wd};
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px #ccc;
  cursor: move;

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
        font-size: 26px;
      }

      @media ${device.laptopL} {
        font-size: 30px;
      }
    }
  }
`;
type PropsCModal = {
  wd?: string,
  hg?: string
  print?: boolean
}
export const CModal = styled.div<PropsCModal>`
  width: ${(props) => props.wd};
  min-height: ${(props) => props.hg};
  height: ${(props) => (props.print ? '88vh' : 'auto')};
  margin: 0 auto;
  /* padding: 10px 20px; */
  background: #fafafa;
  border-radius: 6px;
`;
