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
        <div className="flex flex-col py-32 items-center w-full">
          <h1 className="text-5xl font-bold text-gray-800 pb-4">
            Witaj na stronie Learn<span className="text-blue-500">IT</span>!
          </h1>
          <p className="text-xl text-gray-600">
            Naucz się programowania w praktyce!
          </p>
          <div
            className="flex flex-col gap-4 items-center mt-14"
            id="questions"
          >
            <div className="flex flex-col items-center">
              <p className="text-2xl text-gray-800 font-bold">Kim jesteście?</p>
              <p className="text-lg text-gray-600">
                Grupą uczniów technikum, którzy chcą pomóc innym w nauce
                programowania.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-gray-800 font-bold">
                Ile kosztuje nauka na LearnIT?
              </p>
              <p className="text-lg text-gray-600">
                Nauka na LearnIT jest całkowicie darmowa!
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
