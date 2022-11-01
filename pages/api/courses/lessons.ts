// /api/courses/lessons - returns all lessons from course/courses in JSON format
// basically it returns all files from data/courses/{course}/lessons directory
// returns JSON in schema:
// {
//  "type": "type of request", can be 'all', 'count', 'single', 'lesson' and 'error'
//  "data": "data returned from request (if any)"
// }
//
// type of request:
// 'all' - returns all courses
// 'count' - returns number of lessons in course
// 'single' - returns single course
// 'lesson' - returns single lesson
// 'error' - returns error

import type { NextApiRequest, NextApiResponse } from "next";

import path from "path";
import { promises as fs } from "fs";
import LessonsResData from "../../../types/responseTypes/lessonsResponse";

const getFilesInDir = async (dir: string) => {
  // params:
  // dir - directory in format 'data/courses/{course}', just like in constants.ts

  const files = await fs.readdir(dir + "/lessons");
  return files;
};

export const getCountOfFilesInDir = async (dir: string) => {
  // params:
  // dir - directory in format 'data/courses/{course}', just like in constants.ts

  const files = await getFilesInDir(dir);
  return files.length;
};

export const getLessonFile = async (dir: string, lessonNumber: number) => {
  // params:
  // dir - directory in format 'data/courses/{course}', just like in constants.ts
  // lessonNumber - number of lesson

  const file = await fs.readFile(`${dir}/lessons/${lessonNumber}.json`, "utf-8");
  return file;
};

export const getCountOfLessonsLocally = async (language: string) => {
  // params:
  // language - language of course

  const localPath = path.join(
    process.cwd(),
    "data",
    "courses",
    language as string
  );
  return await getCountOfFilesInDir(localPath);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LessonsResData>
) {
  const { language, type, lessonNumber } = req.query;

  if (!type) {
    res.status(400).json({ type: "error", data: "No type specified" });
    return;
  }

  let data;

  if (type === "all") {
    if (language) {
      res.status(400).json({
        type: "error",
        data: "Bad request. You cannot specify language in this type of request.",
      });
      return;
    }
    data = await getFilesInDir(path.join(process.cwd(), "data", "courses"));
  } else if (type === "count") {
    if (!language) {
      res.status(400).json({
        type: "error",
        data: "Bad request. You must specify language in this type of request.",
      });
      return;
    }
    data = await getCountOfFilesInDir(
      path.join(process.cwd(), "data", "courses", language as string)
    );
  } else if (type === "single") {
    if (!language) {
      res.status(400).json({
        type: "error",
        data: "Bad request. You must specify language in this type of request.",
      });
      return;
    }
    data = await getFilesInDir(
      path.join(process.cwd(), "data", "courses", language as string)
    );
  } else if (type === "lesson") {
    if (!language) {
      res.status(400).json({
        type: "error",
        data: "Bad request. You must specify language in this type of request.",
      });
      return;
    }
    if (!lessonNumber) {
      res.status(400).json({
        type: "error",
        data: "Bad request. You must specify lesson number in this type of request.",
      });
      return;
    }
    data = await getLessonFile(
      path.join(process.cwd(), "data", "courses", language as string),
      Number(lessonNumber)
    );
  } else {
    return res.status(400).json({
      type: "error",
      data: "Bad request. Type must be one of: all, count, single",
    });
  }

  res.status(200).json({ type: type, data: data });
}
