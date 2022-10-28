import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
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
        <div className="text-black w-40 h-40">
          <form className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="mail"
                placeholder="Email"
                className="p-2 rounded-lg bg-blue-100 focus:bg-blue-200 transition"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                placeholder="Hasło"
                className="p-2 rounded-lg bg-blue-100 focus:bg-blue-200 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 hover:bg-blue-500 transition rounded-lg"
            >
              Zaloguj
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
