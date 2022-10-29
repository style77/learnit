import { programmingLanguages } from "../constants";
import { ILesson } from "./lesson";
import LessonsResData from "./responseTypes/lessonsResponse";

export type Course = {
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
    course: Course;
    progress: number;
    currentLesson: number;
    Ilessons: ILesson[];
    started: Date;
}