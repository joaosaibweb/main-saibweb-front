import { useAuth } from "@/store/authSlice";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import LoggedLayout from "./logged";
import UnloggedLayout from "./unlogged";
import "@fortawesome/fontawesome-free/css/all.css";
import Global from "@/styles/global";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { authData } = useAuth();
  const Layout = Boolean(authData?.signed) ? LoggedLayout : UnloggedLayout;
  console.log("authData?.signed", authData?.signed);

  const path = usePathname();
  const router = useRouter();

  if (!authData?.signed && path !== "/auth") {
    router.push("/auth");
  }

  // if ((path === "/" || path === "") && !authData?.signed) {
  //   router.push("/auth");
  // }

  return (
    <main>
      <Global />
      <Layout>{children}</Layout>;
    </main>
  );
};
export default dynamic(() => Promise.resolve(RootLayout), {
  ssr: false,
});
