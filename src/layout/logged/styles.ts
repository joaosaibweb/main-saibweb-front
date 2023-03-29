import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #4e2a77;
`;

interface ContentProps {
  altura: number;
}
export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f4f3f7;
  width: 100%;
  border-top: solid 1px #4e2a77;
  border-radius: 0 0 5px 5px;
  margin: 0 auto;
  height: ${(props) => props.altura}px;
`;

export const ContentArea = styled.div<ContentProps>`
  background: #fff;
  width: 98%;
  border-radius: 4px;
  margin: 0px auto;
  height: ${(props) => props.altura - 15}px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  overflow-y: hidden;
`;
