export type ILesson = {
    id: string;
    lesson: Lesson;
    progress: number;
    started: Date;
    completed: Date | null;
}

export type Lesson = {
    title: string;
    source: string;
    number: number;
}

export type LessonObject = {
    title: string;
    description: string;
    examples: string[];
}