import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import { FaEdit } from "react-icons/fa";
import Layout from "../../components/layout";
import useAuth from "../../hooks/useAuth";
import { NextPageWithLayout } from "../_app";
import {
  MdDone,
  MdCalendarToday,
  MdBolt,
  MdOutlineShowChart,
} from "react-icons/md";
import { UserStats } from "../../components/userStats";
import ProfileCourses from "../../components/profileCourses";
import { RiEditBoxLine } from "react-icons/ri";
import Loading from "../../components/loading";

const icons: Record<string, ReactNode> = {
  coursesDone: <MdDone className="text-icons-done" />,
  daysInRow: <MdCalendarToday className="text-icons-days" />,
  correctAnswers: <MdBolt className="text-icons-answers" />,
  classification: <MdOutlineShowChart className="text-icons-rank" />,
};

const Page: NextPageWithLayout = () => {
  const { user, isLoggedIn } = useAuth();
  const currentLevelDisplay = () => {};

  const levelUp = () => {};

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
      {isLoggedIn ? (
        <main className="flex min-h-screen pt-24 ">
          <div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center md:justify-center lg:justify-start xl:justify-start bg-gray-main px-6 py-2 xl:py-12">
                <div>
                  <Image
                    src={user?.photoURL as string}
                    alt="Profile picture"
                    width={100}
                    height={100}
                    className="rounded-full border-gray-second border-4"
                  />
                </div>
                <div className="flex flex-col xl:mx-6">
                  <span className="text-3xl text-white ">
                    Cześć, {user?.displayName.split(" ")[0]}!
                  </span>
                  
                    {user?.city && user?.country ? (
                      <span className="text-gray-third text-xl">
                      {user?.city}, {user?.country}
                      </span>
                    ): (
                      <span className="text-gray-third text-xl">Brak informacji o pochodzeniu</span>
                    )}
                  
                </div>

                <div className="flex flex-col xl:grid xl:grid-rows-2 xl:grid-flow-col my-6 xl:my-0 xl:mx-24">
                  <UserStats
                    value={3}
                    description="Skończone kursy"
                    icon={icons["coursesDone"]}
                  ></UserStats>
                  <UserStats
                    value={37}
                    description="Dni nauki pod rząd"
                    icon={icons["daysInRow"]}
                  ></UserStats>
                  <UserStats
                    value={97}
                    description="Poprawnych odpowiedzi"
                    icon={icons["correctAnswers"]}
                  ></UserStats>
                  <UserStats
                    value={27}
                    description="Miejsce w rankingu"
                    icon={icons["classification"]}
                  ></UserStats>
                </div>
              </div>

              <div className="w-screen">
                <ProfileCourses></ProfileCourses>
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
