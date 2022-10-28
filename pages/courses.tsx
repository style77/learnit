import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import { courses } from "../constants";
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
      <main className="items-center justify-center min-h-screen flex">
        <div className="grid grid-cols-3 gap-3">
          {courses.map((course) => (
            <Card data={course} />
          ))}
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
