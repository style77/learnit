import Head from "next/head";
import React from "react";
import { ReactElement } from "react";
import Layout from "../components/layout";
import Loading from "../components/loading";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>LearnIT</title>
        <meta
          name="description"
          content="LearnIT - Warunki użytkowania"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loading />
      <main className="flex justify-center items-center min-h-screen">
        <div className="p-4 bg-gray-100 text-gray-600 font-regular text-center rounded-md">
          <h1 className="font-bold text-black">
            Warunki użytkowania z{" "}
            <span className="font-bold">
              Learn<span className="text-blue-600">IT</span>
            </span>
          </h1>
          <div className="text-black">
            <h1 className="font-bold text-3xl">I. Pojęcia ogólne</h1>
            <ul className="justify-start flex flex-col items-start">
              <li>
                <p className="font-regular text-lg">
                  <b>Regulamin</b> – niniejszy regulamin
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Serwis</b> – serwis internetowych "LearnIT.es",
                  działających pod adresem https://learnit.es
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Usługodawca</b> – właściciel serwisu będący osobą fizyczną
                  - Nigger niggerowaty
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Usługobiorca</b> – każda osoba fizyczna, uzyskująca dostęp
                  do Serwisu i korzystająca z usług świadczonych za
                  pośrednictwem Serwisu przez Usługodawcę.
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Komunikacja Drogą Elektroniczną</b> – Komunikacja pomiędzy
                  stronami za pośrednictwem poczty elektronicznej (e-mail) oraz
                  formularzy kontaktowych dostępnych na stronie www.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
