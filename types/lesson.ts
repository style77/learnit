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

export type LessonExample = {
    code: string;
    description: string;
    output: string;
    title: string;
}

export type LessonObject = {
  title: string;
  description: string;
  number: number;
  tags: string[];
  examples: Record<string, any>[]; // This is the data that will be used to render the examples
  tasks: Record<string, any>[]; // This is the data that will be used to render the examples
};