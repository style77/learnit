import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import Loading from "../components/loading";
import { Progress, ProgressIndicator } from "../components/progress";
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
      <Loading />
      <main className="items-center justify-center py-32 flex">
        <div className="flex flex-col lg:grid grid-cols-3 gap-6 mx-20">
          {courses.map((course) => (
            <Card data={course} key={course.title} />
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
