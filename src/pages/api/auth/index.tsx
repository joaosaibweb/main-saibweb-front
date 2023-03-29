"use client";
import Input from "@/components/Input";
import UnloggedLayout from "@/layout/unlogged";
import Image from "next/image";
import React, { useRef } from "react";
import { BoxLogo } from "./styles";
import logo from "@/assets/logo.png";
import { Form } from "@unform/web";
import { useAuth } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { AuthenticateParams } from "@/services/auth/types";

const Auth: React.FC = () => {
  const frmLogin = useRef(null);
  const { signIn } = useAuth();
  const navigate = useRouter();

  const loading = false;
  // const dispatch = useDispatch();

  const schema = Yup.object().shape({
    username: Yup.string().required("O login é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
  });

  async function handleSubmit(params: AuthenticateParams) {
    // dispatch(increment());
    const success = await signIn({
      username: "ADRIANO.SAIBWEB",
      password: "123456",
    });
    if (success) {
      navigate.push("/products");
    }
    // try {
    //   const formData = frmLogin.current.getData();
    //   await schema.validate(formData, {
    //     abortEarly: false,
    //   });
    //   dispatch(signInRequest(username, password, emp_id, emp_razao_social));
    // } catch (err) {
    //   const validationErrors = {};
    //   if (err instanceof Yup.ValidationError) {
    //     err.inner.forEach((error) => {
    //       validationErrors[error.path] = error.message;
    //     });
    //     frmLogin.current.setErrors(validationErrors);
    //   }
    // }
  }

  return (
    <>
      <BoxLogo>
        <Image src={logo} alt="SaibWeb" priority placeholder="blur" />

        <h1>Login</h1>

        <Form ref={frmLogin} onSubmit={handleSubmit}>
          <Input type="text" name="username" label="Usuário" />
          <Input id="password" name="password" label="Senha" type="password" />

          <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
        </Form>
      </BoxLogo>
    </>
  );
};

export default Auth;
