import { programmingLanguages } from "../constants";
import { ILesson } from "./lesson";

export type Course = {
    id: number;
    title: string;
    description: string;
    url: string;
    language: keyof typeof programmingLanguages;
    image: string;
    source: string;
    allLessons: number;
    tags: string[];
    TBA: boolean;
    reposCount: number;
}

export type ICourse = {
  id: string;
  courseId: number;
  course: Course;
  currentLesson: number;
  lessons: ILesson[];
  started: Date;
  completed: boolean;
};

// we are not sure if user started course, so course is of course constant data + ICourse type OR just constant data + currentLesson set to 0 (to count progress)
export type UnCertainCourse = Course & {
  id?: string;
  courseId: number;
  course?: Course;
  currentLesson: number;
  lessons?: ILesson[];
  started?: Date;
  completed: boolean;
};