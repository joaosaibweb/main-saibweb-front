import styled from 'styled-components';

export const InputCellRenderer = styled.input`
  /* border-radius: 3px; */
  border: 1px solid #cac8c8;
  font-weight: bold;
  line-height: 1.3;
  color: #495057;
  background-color: #fefcff;
  width: 100%;
  height: 100%;
  padding: 3px 6px;
  text-transform: 'uppercase';

  &:focus {
    background-color: #fefcff;
    outline: 0;
    /* box-shadow: 0 0 0 0.2rem #b196d0; */
  }
`;
