import { programmingLanguages } from "../constants";

export interface Course {
    title: string;
    description: string;
    url: string;
    language: keyof typeof programmingLanguages;
    image: string;
    source: string;
    tags: string[];
    TBA: boolean;
    reposCount: number;
}