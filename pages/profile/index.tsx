import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { FaEdit } from "react-icons/fa";
import Layout from "../../components/layout";
import useAuth from "../../hooks/useAuth";
import { NextPageWithLayout } from ".././_app";

const Page: NextPageWithLayout = () => {

  const { user, isLoggedIn } = useAuth();

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
      {isLoggedIn ? (
        <main className="flex justify-center items-start min-h-screen pt-28">
          <div className="bg-gray-100/75 rounded-md p-4">
            <h1 className="text-2xl font-bold text-gray-700">Profil</h1>
            <p className="text-gray-700">Zarządzaj swoim kontem</p>

            <div className="flex flex-col items-center justify-center mt-3">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={user?.photoURL as string}
                  alt="Profile picture"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <button className="bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded mt-4">
                  <div className="flex flex-row items-center gap-1">
                    <FaEdit />
                    Zmień zdjęcie
                  </div>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center border-t-2 border-gray-600 mt-3">
                <h2 className="text-xl font-bold text-gray-500 mt-1">
                  Dane osobowe
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <label className="text-gray-700">Nick</label>
                    <input
                      type="text"
                      className="border-2 border-gray-300 p-2 rounded-md"
                      value={user?.displayName as string}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
