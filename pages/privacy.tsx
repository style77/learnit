import React from "react";
import { ReactElement } from "react";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <main className="flex justify-center items-center min-h-screen">
        <div className="max-w-[70vw] p-4 bg-gray-100 text-gray-600 font-regular text-center rounded-md">
          <h1 className="font-bold text-black">
            Polityka Prywatności{" "}
            <span className="font-bold">
              Learn<span className="text-blue-600">IT</span>
            </span>
          </h1>
          <div className="text-black">
            <span className="text-md">
              Poniższa Polityka Prywatności określa zasady zapisywania i
              uzyskiwania dostępu do danych na Urządzeniach Użytkowników
              korzystających z Serwisu do celów świadczenia usług drogą
              elektroniczną przez Administratora oraz zasady gromadzenia i
              przetwarzania danych osobowych Użytkowników, które zostały podane
              przez nich osobiście i dobrowolnie za pośrednictwem narzędzi
              dostępnych w Serwisie. Poniższa Polityka Prywatności jest
              integralną częścią Regulaminu Serwisu, który określa zasady, prawa
              i obowiązki Użytkowników korzystających z Serwisu.
            </span>
            <h1 className="font-bold text-3xl mt-4">§1 Definicje</h1>
            <ul className="justify-start flex flex-col items-start">
              <li>
                <p className="font-regular text-lg">
                  <b>Regulamin</b> – niniejszy regulamin
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Serwis</b> – serwis internetowych "LearnIT.es",
                  działających pod adresem https://learnit.es
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Usługodawca</b> – właściciel serwisu będący osobą fizyczną
                  - Nigger niggerowaty
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Usługobiorca</b> – każda osoba fizyczna, uzyskująca dostęp
                  do Serwisu i korzystająca z usług świadczonych za
                  pośrednictwem Serwisu przez Usługodawcę.
                </p>
              </li>
              <li>
                <p className="font-regular text-lg">
                  <b>Komunikacja Drogą Elektroniczną</b> – Komunikacja pomiędzy
                  stronami za pośrednictwem poczty elektronicznej (e-mail) oraz
                  formularzy kontaktowych dostępnych na stronie www.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
