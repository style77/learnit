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