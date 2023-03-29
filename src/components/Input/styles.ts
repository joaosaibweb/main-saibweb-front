import styled, { css, keyframes } from 'styled-components';
import { headShake } from 'react-animations';

import { device } from '../../styles/mediaQuery';

const headShakeEffect = keyframes`${headShake}`;

interface prosInput{
  isRequired: boolean;
 
}

interface propsFormInput{
  uppercase: boolean;
  invalid?: string;
}

export const InputContainer = styled.div<prosInput>`
  /* padding: 6px; */
  display: flex;
  flex-direction: column;

  div {
    justify-content: space-between;

    flex-wrap: nowrap;
    padding-left: 2px;
    padding-right: 2px;
    width: 100%;

    height: auto;

    label {
      color: #6b6565;
      font-weight: ${(props) => (props.isRequired ? 600 : 500)};
      white-space: nowrap;
    }
  }
`;

export const FormLabel = styled.label`
  color: #9e9e9e;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const FormInput = styled.input<propsFormInput>`
  border-radius: 6px;
  border: 1px solid ${(props) => (props.invalid ? 'red' : '#cac8c8')};
  font-weight: bold;
  line-height: 1.3;
  color: #495057;
  background-color: #fefcff;
  width: 100%;
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};

  ${(props) =>
    props.invalid &&
    css`
      animation: 0.6s ${headShakeEffect};
    `}

  &:focus {
    background-color: #fefcff;
    border: 1px solid ${(props) => (props.invalid ? 'red' : '#b196d0')};
    outline: 0;
    box-shadow: 0 0 0 1px ${(props) => (props.invalid ? '#ff8484' : '#b196d0')};
  }

  &:read-only {
    background-color: #f9f9f9;
    border: 1px solid ${(props) => (props.invalid ? 'red' : '#cac8c8')};
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
`;
