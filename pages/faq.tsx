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
        <div className="flex flex-col justify-start py-32 items-center w-full">
          <h1 className="text-4xl font-bold text-gray-800 pb-4">
            Witaj na stronie LearnIT!
          </h1>
          <div className="flex flex-col" id="questions">
            <div className="flex flex-col">
              <p className="text-2xl text-gray-800 font-bold">
                Kim jesteście?
              </p>
              <p className="text-lg text-gray-600">
                Grupą uczniów Technikum, którzy chcą pomóc innym w nauce programowania.
              </p>
            </div>
          </div>
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
