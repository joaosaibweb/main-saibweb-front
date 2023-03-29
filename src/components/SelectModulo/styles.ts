import styled from "styled-components";
import Select from "react-select";
import { device } from "../../styles/mediaQuery";

// Customização do componente react-select
export const CustomSelect = styled(Select)`
  & .Select__control {
    height: 32px;
    min-height: 32px;
  }
  & .Select__indicator {
    margin-top: -3px;
  }
  & .Select__single-value {
    font-weight: bold;
    color: #495057;
    font-size: 15px;
  }

  /* @media ${device.mobileS} {
    & .Select__control {
      height: 25px;
      min-height: 25px;
    }
    & .Select__indicator {
      margin-top: -8px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 0;
    }
  }

  @media ${device.tablet} {
    & .Select__control {
      height: 25px;
      min-height: 25px;
    }
    & .Select__indicator {
      margin-top: -8px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 0;
    }
  }

  @media ${device.laptop} {
    & .Select__control {
      height: 25px;
      min-height: 25px;
    }
    & .Select__indicator {
      margin-top: -8px;
    }
    & .Select__single-value {
      font-size: 12px;
      top: 42%;
    }
    & .Select__indicator-separator {
      margin-top: 0;
    }
  }

  @media ${device.laptopL} {
    & .Select__control {
      height: 28px;
      min-height: 28px;
    }
    & .Select__indicator {
      margin-top: -3px;
    }
    & .Select__single-value {
      font-size: 13px;
      top: 46%;
    }
    & .Select__indicator-separator {
      margin-top: 3px;
    }
  } */
`;

export const BoxMenu = styled.div`
  z-index: 99;
`;

interface PropsAreaComp {
  wd: string;
}

export const AreaComp = styled.div<PropsAreaComp>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.wd}%;
  padding: 5px;
  text-align: left;

  label {
    font-weight: 600;
    color: #500569;
    font-size: 12px;
  }

  select {
    cursor: pointer;
    border: none;
    border-bottom: solid 2px #61098a;
    user-select: none;

    height: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font: inherit;
    background: #fff;
    color: #3c0a59;
    font-size: 12px;
    width: 100%;
    font-weight: bold;
    margin: 0;
    display: block;
    padding-top: 6px;
    padding-bottom: 5px;

    box-sizing: content-box;
  }

  option {
    color: #5c5760;
    font-size: 14px;
    padding: 110px;
    background-color: #f4f0f7;
    box-shadow: -2px 3px 10px -2px rgba(0, 0, 0, 0.65);
  }
  .options {
    display: flex;
  }
`;
