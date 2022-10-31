import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { ICourse, Course, UnCertainCourse } from "../types/course";
import { ILesson } from "../types/lesson";
import { Progress, ProgressIndicator } from "./progress";

type Props = {
  course: UnCertainCourse;
};

const CourseCard = ({ course }: Props) => {
  return (
    <>
      <div className="bg-gray-100/75 rounded-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row p-4 items-center justify-start">
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
                    <span>Lekcja {course.currentLesson} </span>
                  </div>
                  {course.currentLesson !== 0 && course.lessons ? (
                    <div className="flex">
                      <span className="text-gray-800">
                        {course.lessons[course.currentLesson].lesson.title}
                      </span>
                    </div>
                  ) : (
                    <div className="flex">
                      <span className="text-gray-800">Rozpocznij kurs</span>
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
                    Postęp {(course.currentLesson / course.allLessons) * 100}%
                  </h1>
                </div>
                <div className="flex">
                  <Progress
                    value={(course.currentLesson / course.allLessons) * 100}
                    className="w-full"
                  >
                    <ProgressIndicator
                      style={{
                        transform: `translateX(-${
                          100 - (course.currentLesson / course.allLessons) * 100
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
  );
};

export default CourseCard;
