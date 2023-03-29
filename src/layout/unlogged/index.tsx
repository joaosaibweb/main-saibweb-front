"use client";
import Global from "@/styles/global";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { Content, Wrapper } from "./styles";

// import { Container } from './styles';

const UnloggedLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <Wrapper>
      <Global />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default dynamic(() => Promise.resolve(UnloggedLayout), {
  ssr: false,
});
