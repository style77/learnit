import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Loading from "../../../components/loading";
import { NextPageWithLayout } from "./../../_app";
import showdown from "showdown";
import { Lesson, LessonExample, LessonObject } from "../../../types/lesson";
import CompileButton from "../../../components/compileButton";

import dynamic from "next/dynamic";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../saas/firebase";
import useAuth from "../../../hooks/useAuth";

const Editor = dynamic(() => import("../../../components/editor"), {
  ssr: false,
});

const Page: NextPageWithLayout = () => {
  const {user, isLoggedIn} = useAuth()

  const { language, lessonNumber } = useRouter().query;
  const [lesson, setLesson] = useState<Record<string, any>>({});
  const [lessonExamples, setLessonExamples] = useState<LessonExample[]>([]);
  const [exampleNumber, setExampleNumber] = useState<number>(0);
  const [output, setOutput] = useState("{}");
  const [outputError, setOutputError] = useState(false);
  const [exampleOutput, setExampleOutput] = useState("");
  const [code, setCode] = useState<string>("");

  const [userCurrentLesson, setUserCurrentLesson] = useState<number>(1);

  const ConvertMarkdown = (text: string) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    return html;
  };

  useEffect(() => {
    const fetchCurrentLesson = () => {
      if (isLoggedIn && user) {
        let courses = user.courses;
        let courseToUpdateIndex = courses.findIndex(
          (course: any) => course.courseLanguage === language
        );
        let courseToUpdate =
          courses[courseToUpdateIndex].currentLesson;
        setUserCurrentLesson(courseToUpdate);
      }
    }

    const fetchLesson = async () => {
      const res = await fetch(
        process.env.apiUrl +
          `/api/courses/lessons?language=${language}&lessonNumber=${lessonNumber}&type=lesson`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      res.json().then((res) => {
        if (res) {
          const data = JSON.parse(res.data);
          setLesson(data);
          setLessonExamples(data.examples);

          setCode(data.examples[exampleNumber].code);
          setExampleOutput(data.examples[exampleNumber].output);
        }
      });
    };

    if (language && lessonNumber && user) {
      fetchLesson();
      fetchCurrentLesson();
    }
  }, [language, lessonNumber, user, exampleNumber]);

  const fetchLessonsCount = async () => {
    const res = await fetch(
      process.env.apiUrl +
        `/api/courses/lessons?language=${language}&type=count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    const data = await res.json();
    return data.data as number
  };

  const lessonFinished = async () => {
    if (user) {
      const xp = Math.floor(Math.random() * (26 - 10) + 10);  // get random number between 10 and 25 (26-1)
      const currentLesson = parseInt(lessonNumber as string)+1;
      
      let courses = user.courses;
      let courseToUpdateIndex = courses.findIndex(
        (course: any) => course.courseLanguage === language
      );
      let courseToUpdate = courses[courseToUpdateIndex]
      
      if (lesson) {
        const completedLesson = {
          lessonNumber: lessonNumber,
          completed: new Date,
          xp: xp
        }
        courseToUpdate.completedLessons = [...courseToUpdate.completedLessons, completedLesson]
        courseToUpdate.currentLesson = currentLesson

        const allLessonsCount = await fetchLessonsCount();
        if (currentLesson > allLessonsCount) {
          courseToUpdate.completed = true;
        }
      }

      courses = [...courses.slice(0, courseToUpdateIndex), courseToUpdate, ...courses.slice(courseToUpdateIndex+1)]
      console.log(courses)

      updateDoc(doc(db, "users", user.ref.id), {
        levelExperience: user.levelExperience + xp,
        courses: courses,
      }).then(() => {
        console.log("Document successfully updated!");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });

      window.location.href = `/profile/courses/`;
    }
  };

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
      {lesson && lessonNumber && user && isLoggedIn && (parseInt(lessonNumber as string) === userCurrentLesson) ? (
        <main className="flex min-h-screen">
          <div className="flex flex-col xl:flex-row w-full">
            <div className="flex flex-col justify-center w-[80vw] items-start h-full mx-20">
              <div className="bg-gray-100/60 shadow border-2 text-gray-900 h-4/5 w-full rounded-md flex flex-col">
                <h1 className="text-4xl font-bold text-center mt-4">
                  {lesson.title}
                </h1>
                <div
                  className="text-lg font-regular text-start mt-4 px-4"
                  dangerouslySetInnerHTML={{
                    __html: ConvertMarkdown(lesson.description),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 justify-center items-center w-[80vw] h-full mx-20">
              <div
                className="bg-gray-900 shadow border-2 text-gray-900 h-4/5 w-full rounded-lg flex flex-col"
                id="terminal"
              >
                <span className="text-gray-300 bg-black/50 font-semibold flex border-b-2 p-2">
                  Edytor
                </span>
                <div className="font-mono h-full text-sm break-all p-2 text-gray-300">
                  <Editor
                    language={language as string}
                    code={code}
                    setCode={setCode}
                  />
                </div>
                <div className="flex h-full w-full items-end justify-end mb-4 px-3 gap-2">
                  <CompileButton
                    script={code}
                    language="javascript"
                    setOutput={setOutput}
                    setOutputError={setOutputError}
                  />
                  <>
                    {lessonExamples.length > exampleNumber + 1 ? (
                      <>
                        {JSON.parse(output)?.output?.replace("\n", "") ==
                          exampleOutput && (
                          <button
                            className="bg-gray-900 hover:bg-gray-800 transition border-gray-800 text-gray-200 border-2 h-12 py-2 px-4 rounded"
                            onClick={() => {
                              setCode(lessonExamples[exampleNumber + 1].code);
                              setExampleNumber(exampleNumber + 1);
                            }}
                          >
                            Następny przykład
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="bg-gray-900 hover:bg-gray-800 disabled:hover:bg-gray-900 disabled:hover:cursor-not-allowed transition border-gray-800 text-gray-200 border-2 h-12 py-2 px-4 rounded"
                        disabled={JSON.parse(output)?.output?.replace("\n", "") != exampleOutput}
                        onClick={() => {
                          lessonFinished();
                        }}
                      >
                        Zakończ lekcję
                      </button>
                    )}
                  </>
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
                  {JSON.parse(output).output}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          <div className="flex justify-center items-center h-screen font-bold text-3xl text-gray-800">
            Brak dostępu do tej lekcji
          </div>
        </>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
