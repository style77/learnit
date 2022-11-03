// TODO
// The idea is to have a compiler that can compile the code
// and return the output
// This is a very basic implementation
// It will be improved in the future

// things to consider:
// * a user might send a command like rm -fr /* (or whatever's equivalent in some given language)
// * a user may provide a long running, possibly non-terminating process
// * users may send [many] network requests from your server, possibly creating a DDoS attack on another service

// among many other things.. youll have to make a tradeoff between flexibility of letting users running any arbitrary code, and not letting users abuse the service

import type { NextApiRequest, NextApiResponse } from "next";
import CompilerResData from "../../../types/responseTypes/compilerResponse";

const languagesMap: Record<string, string[]> = {
  cpp: ["cpp17", "1"],
  php: ["php", "4"],
  c: ["c", "5"],
  java: ["java", "4"],
  python: ["python3", "4"],
  go: ["go", "4"],
  csharp: ["csharp", "4"],
  javascript: ["nodejs", "4"],
  typescript: ["nodejs", "4"], // lol this is a hack but it works for now :D (typescript is compiled to javascript) (and nodejs is the only language that supports typescript)
  kotlin: ["kotlin", "3"],
  ruby: ["ruby", "4"],
};

export const compile = async (body: any, language: string) => {
  const [lang, versionIndex] = languagesMap[language];

  const inputParams = {
    ...JSON.parse(body),
    language: lang,
    versionIndex,
    clientId: process.env.jdoodleClientId,
    clientSecret: process.env.jdoodleClientSecret,
  };

  const url =
    process.env.NODE_ENV === "development"
      ? "https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute"
      : "https://api.jdoodle.com/v1/execute";

  // there are problems with CORS while using development version

  const resp = await fetch(url, {
    method: "post",
    body: JSON.stringify(inputParams),
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const data = await resp.json();
  console.log(data)
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompilerResData>
) {
  try {
    const { language } = req.body;
    const data = await compile(req.body, language);

    if (data.error) {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch (err: any) {
    res.status(400).json({ statusCode: 400, error: err.message });
  }
}
