import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Layout from "../components/layout";
import Loading from "../components/loading";
import { LoginCard, RegisterCard } from "../components/signCards";
import useAuth from "../hooks/useAuth";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  const { user, isLoggedIn } = useAuth();

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
      <Loading />
      <main className="flex justify-center items-center min-h-screen">
        {isLoggedIn ? (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">
              Jesteś już zalogowany
            </h1>
            <p className="text-xl mb-4">Możesz przejść do strony głównej</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => (window.location.href = "/")}
            >
              Strona główna
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
