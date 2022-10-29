import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import { Progress, ProgressIndicator } from "../components/progress";
import { courses } from "../constants";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(100);
    }, 1000);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
      <main className="items-center justify-center py-32 flex">
        <div className="grid grid-cols-3 gap-6 mx-20">
          {loading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Progress value={progress}>
                <ProgressIndicator
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress>
            </div>
          ) : (
            <>
              {courses.map((course) => (
                <Card data={course} />
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
