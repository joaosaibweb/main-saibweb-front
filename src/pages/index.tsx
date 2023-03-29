import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import * as S from "./styles";

export default function Home() {
  return (
    <>
      <Head>
        <title>Saibweb</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Container>
        <h1>home</h1>
      </S.Container>
    </>
  );
}
