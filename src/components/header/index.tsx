"use client";
import React, { useState, useEffect } from "react";
import { MdWork, MdApps, MdSettingsPower } from "react-icons/md";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import logo from "../../assets/logo.png";

import { Container, Content, InfoContainer, Profile } from "./styles";

import { Menu } from "../menu";
import Image from "next/image";
import { useAuth } from "@/store/authSlice";
import { Tooltip } from "@mui/material";

export default function Header() {
  const { authData, signOut } = useAuth();
  const profile = authData;

  const [moduloAtual, setModuloAtual] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");

  useEffect(() => {
    setModuloAtual(profile.selectedModule.module || "");
  }, [profile.selectedModule]);

  useEffect(() => {
    setNomeEmpresa(profile.emp_razao_social);
  }, [profile.emp_razao_social]);

  const date = new Date();

  const dateFormatted = format(date, "d 'de' MMMM 'de' YYY", { locale: pt });

  function handleLogoff() {
    signOut();
  }

  return (
    <Container>
      <Content>
        <nav>
          <Menu />
          <Image
            priority
            className="image-logo"
            src={logo}
            alt="www.saibweb.com.br"
          />
        </nav>

        <InfoContainer>
          <div style={{ display: "flex" }}>
            <MdWork size={14} />
            <p>
              <span>{nomeEmpresa.toLocaleUpperCase()}</span>
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <MdApps size={14} />
            <p>
              <span>{moduloAtual.toUpperCase()}</span>
            </p>
          </div>
        </InfoContainer>

        <aside>
          <Profile>
            <div>
              <strong>Bem Vindo(a): {profile.usr_login}</strong>
              <span>{dateFormatted}</span>
            </div>
            {/* Alterei o componente BootstrapToolTip para o Tooltip  */}
            <Tooltip
              title="Sair do Sistema com segurança"
              placement="top-start"
            >
              <button type="button" onClick={handleLogoff}>
                <MdSettingsPower size={40} color="#61098a" />
              </button>
            </Tooltip>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
