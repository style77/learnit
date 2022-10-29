import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Layout from "../components/layout";
import { LoginCard, RegisterCard } from "../components/signCards";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {

  const [showRegisterCard, setShowRegisterCard] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [authProvider, setAuthProvider] = useState("");

  return (
    <>
      <Head>
        <title>LearnIT</title>
        <meta
          name="description"
          content="LearnIT - naucz się programowania w praktyce!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen">
        {showRegisterCard ? (
          <RegisterCard
            setShowRegisterCard={setShowRegisterCard}
            setShowForgotPassword={setShowForgotPassword}
            setAuthProvider={setAuthProvider}
            authProvider={authProvider}
          />
        ) : (
          <LoginCard
            setShowRegisterCard={setShowRegisterCard}
            setShowForgotPassword={setShowForgotPassword}
            setAuthProvider={setAuthProvider}
          />
        )}
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
