import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import { getLessonFile } from "../../api/courses/lessons";
import { NextPageWithLayout } from "./../../_app";
import showdown from "showdown";
import { Lesson, LessonExample, LessonObject } from "../../../types/lesson";
import CompileButton from "../../../components/compileButton";
import Editor from "../../../components/editor";

const Page: NextPageWithLayout = () => {
  const { language, lessonNumber } = useRouter().query;
  const [lesson, setLesson] = useState<Record<string, any>>({});
  const [lessonExamples, setLessonExamples] = useState<LessonExample[]>([]);
  const [exampleNumber, setExampleNumber] = useState<number>(0);
  const [output, setOutput] = useState("")
  const [outputError, setOutputError] = useState(false)

  const [code, setCode] = useState(lessonExamples[exampleNumber].code);

  const ConvertMarkdown = (text: string) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    return html;
  };

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await fetch(
        process.env.apiUrl +
          `/api/courses/lessons?language=${language}&lessonNumber=${lessonNumber}&type=lesson`
      );
      res.json().then((res) => {
        if (res) {
          const data = JSON.parse(res.data);
          setLesson(data);
          setLessonExamples(data.examples);
        }
      });
    };
    fetchLesson();
  }, [language, lessonNumber, lessonExamples]);

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
        <div className="flex flex-row w-full">
          <div className="flex flex-col justify-center basis-1/5 items-start h-full mx-20 w-full">
            <div className="bg-gray-100/60 shadow border-2 text-gray-900 h-4/5 w-full rounded-md flex flex-col">
              <h1 className="text-4xl font-bold text-center mt-4">
                {lesson.title}
              </h1>
              <h2 className="text-lg font-regular text-center">
                {lesson.description}
              </h2>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-center items-center w-full basis-5/5 h-full mx-20">
            <div
              className="bg-gray-900 shadow border-2 text-gray-900 h-4/5 w-full rounded-lg flex flex-col"
              id="terminal"
            >
              <span className="text-gray-300 bg-black/50 font-semibold flex border-b-2 p-2">
                Edytor
              </span>
              <div className="font-mono h-full w-full text-sm break-all p-2 text-gray-300">
                <Editor language={lesson.language} code={code} setCode={setCode} />
              </div>
              <div className="flex h-full w-full items-end justify-end pb-14 px-3">
                <CompileButton
                  script={code}
                  language="javascript"
                  setOutput={setOutput}
                />
              </div>
            </div>
            <div
              className="bg-gray-900 shadow border-2 text-gray-900 h-4/5 w-4/12 rounded-lg"
              id="terminal"
            >
              <span className="text-gray-300 bg-black/50 font-semibold flex border-b-2 p-2">
                Konsola
              </span>
              <div
                className={
                  `font-mono h-full w-full text-sm break-all p-2 ` +
                  (outputError ? "text-red-700" : "text-gray-300")
                }
              >
                {output}
              </div>
            </div>
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
