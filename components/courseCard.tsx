import { updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { ICourse, Course, UnCertainCourse } from "../types/course";
import IUser from "../types/iuser";
import { ILesson, Lesson } from "../types/lesson";
import StartCourseDialog from "./modals/startCourse";
import { Progress, ProgressIndicator } from "./progress";

type Props = {
  course: UnCertainCourse;
};

type StartCourseProps = {
  course: UnCertainCourse;
  user: IUser;
};

const getTimeEpoch = () => {
  return new Date().getTime().toString();
};

const StartCourse = ({ course, user }: StartCourseProps) => {
  const lessons: Lesson[] = [];

  // iterate over lessons count and create Lesson objects then push them to lessons array
  Array(course.allLessons)
    .fill(0)
    .map((_, i) => {
      lessons.push({
        title: `Lekcja ${i + 1}`,
        source: `${course.source}/lessons/${i + 1}`,
        number: i + 1,
      });
    });

  const ilesson: ILesson = {
    id: getTimeEpoch(),
    lesson: lessons[0],
    progress: 0,
    started: new Date(),
    completed: null,
  };

  const icourseData: ICourse = {
    currentLesson: 1,
    completed: false,
    courseId: course.id,
    id: getTimeEpoch(),
    lessons: [ilesson],
    course: course,
    started: new Date(),
  };

  updateDoc(user.ref, {
    courses: [...user.courses, icourseData],
  });
};

const CourseCard = ({ course }: Props) => {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="bg-gray-100/80 rounded-md">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row p-4 items-center justify-start ml-4">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={30}
                  height={30}
                  className="rounded-md w-auto h-auto"
                />
                <h1 className="font-medium ml-2">{course.title}</h1>
                <div className="flex flex-col justify-end items-end w-full">
                  {course.completed ? (
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col justify-center">
                        <FaCheck />
                      </div>
                      <h1 className="font-medium text-gray-800">Zakończony</h1>
                    </div>
                  ) : (
                    <>
                      <div className="flex">
                        <span className="text-gray-800 font-mono">
                          Lekcja {course.currentLesson}{" "}
                        </span>
                      </div>
                      {course.currentLesson !== 0 && course.lessons ? (
                        <div className="flex">
                          <span className="text-gray-600 hover:text-gray-800 transition font-semibold cursor-pointer">
                            <Link href={`/lesson/${course.language}/${course.currentLesson}`}>
                              <button className="text-gray-200 font-regular bg-blue-600 px-2 py-2 shadow-md rounded-md transition hover:bg-blue-800">
                                Rozpocznij lekcję
                              </button>
                            </Link>
                            {course.lessons[course.currentLesson + 1]?.lesson
                              .title && "Brak więcej lekcji 😢"}
                          </span>
                        </div>
                      ) : (
                        <div className="flex">
                          {user && (
                            <StartCourseDialog
                              title={course.title}
                              description={course.description}
                              lessonsCount={course.allLessons}
                              onConfirm={() => StartCourse({ course, user })}
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-row px-8 pb-4">
                  <div className="flex flex-col justify-start">
                    <div className="flex">
                      <h1 className="font-medium text-gray-800">
                        Postęp{" "}
                        {((course.started ? course.currentLesson-1 : 0) /
                          course.allLessons) *
                          100}
                        %
                      </h1>
                    </div>
                    <div className="flex">
                      <Progress
                        value={
                          ((course.started ? course.currentLesson-1 : 0) /
                            course.allLessons) *
                          100
                        }
                        className="w-full"
                      >
                        <ProgressIndicator
                          style={{
                            transform: `translateX(-${
                              100 -
                              ((course.started ? course.currentLesson-1 : 0) /
                                course.allLessons) *
                                100
                            }%)`,
                          }}
                        />
                      </Progress>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseCard;
