import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react';
import Layout from '../components/layout';
import Loading from '../components/loading';
import { NextPageWithLayout } from './_app';

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
      <main className="flex min-h-screen">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-bold text-gray-800">
            Witaj na stronie LearnIT!
          </h1>
          <p className="text-xl text-gray-800">
            Naucz się programowania w praktyce!
          </p>
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Page;
