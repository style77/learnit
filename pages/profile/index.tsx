import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import { FaEdit } from "react-icons/fa";
import Layout from "../../components/layout";
import useAuth from "../../hooks/useAuth";
import { NextPageWithLayout } from ".././_app";
import { MdDone,MdCalendarToday } from "react-icons/md";
import { UserStats } from "../../components/userStats";



const icons: Record<string, ReactNode> = {
  coursesDone: <MdDone />,
  daysInRow: <MdCalendarToday />,
};

const Page: NextPageWithLayout = () => {
  const { user, isLoggedIn } = useAuth();
  const currentLevelDisplay = () => {

  }

  const levelUp=()=>{

  }

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
        <main className="flex justify-start items-start min-h-screen pt-28 ">
          <div>
            <div className="flex flex-col w-screen ">
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center md:justify-center lg:justify-start xl:justify-start w-full bg-gray-main px-6 py-12">
                <div>
                  <Image
                    src={user?.photoURL as string}
                    alt="Profile picture"
                    width={100}
                    height={100}
                    className="rounded-full border-gray-second border-4"
                  />
                </div>
                <div className="text-3xl text-white">
                  Cześć, {user?.displayName.split(" ")[0]}!
                </div>
                <div className="grid grid-rows-2 grid-flow-col">
                  <UserStats value={3} description="Skończone kursy" icon={icons["coursesDone"]} iconColor="green-done"></UserStats>
                  <UserStats value={37} description="Dni nauki pod rząd" icon={icons["daysInRow"]} iconColor="green-done"></UserStats>
                  <UserStats value={37} description="Dni nauki pod rząd" icon={icons["daysInRow"]} iconColor="green-done"></UserStats>
                  <UserStats value={37} description="Dni nauki pod rząd" icon={icons["daysInRow"]} iconColor="green-done"></UserStats>
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
