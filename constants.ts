import path from "path";
import { getCountOfFilesInDir } from "./pages/api/courses/lessons";
import { Course } from "./types/course";
import LessonsResData from "./types/responseTypes/lessonsResponse";

const humanizeError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/wrong-password":
      return "Nieprawidłowe hasło";
    case "auth/user-not-found":
      return "Nieprawidłowy adres email";
    case "auth/email-already-in-use":
      return "Ten adres email jest już zajęty";
    case "auth/weak-password":
      return "Hasło musi mieć co najmniej 6 znaków";
    case "auth/invalid-email":
      return "Nieprawidłowy adres email";
    case "auth/too-many-requests":
      return "Zbyt wiele prób logowania. Spróbuj ponownie za kilka minut";
    case "auth/operation-not-allowed":
      return "Operacja niedozwolona";
    default:
      return "Wystąpił błąd. Spróbuj ponownie później";
  }
};

const programmingLanguages: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    kotlin: 'Kotlin',
    csharp: 'C#',
    go: 'Go',
    php: 'PHP',
    ruby: 'Ruby',
    scala: 'Scala',
    swift: 'Swift',
    objectivec: 'Objective-C',
    cpp: 'C++',
    c: 'C',
    rust: 'Rust'
};

const lessonsFetcher = (url: string): Promise<LessonsResData> => fetch(process.env.apiUrl + url).then((res) => res.json());
const reposCountFetcher = (url: string): Promise<any> => fetch(url).then((res) => res.json());

const courses: Course[] = [
  {
    title: programmingLanguages.javascript,
    language: "javascript",
    description:
      "JavaScript to interpretowany język programowania wysokiego poziomu.",
    url: "https://www.javascript.com/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    tags: ["JavaScript", "ECMAScript", "JS"],
    source: "data/courses/javascript",
    TBA: false,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:javascript"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher(
        "/api/courses/lessons?language=javascript&type=count"
      )
    ).data as number,
  },
  {
    title: programmingLanguages.typescript,
    language: "typescript",
    description:
      "TypeScript to nadzbiór kodu JavaScript, który kompiluje się w celu wyczyszczenia danych wyjściowych JavaScript.",
    url: "https://www.typescriptlang.org/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
    tags: ["TypeScript", "TS", "JS"],
    source: "data/courses/typescript/lessons",
    TBA: false,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:typescript"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher(
        "/api/courses/lessons?language=typescript&type=count"
      )
    ).data as number,
  },
  {
    title: programmingLanguages.python,
    language: "python",
    description:
      "Python jest interpretowanym językiem programowania wysokiego poziomu i ogólnego przeznaczenia.",
    url: "https://www.python.org/",
    image: "https://www.python.org/static/opengraph-icon-200x200.png",
    tags: ["Python", "Py"],
    source: "data/courses/python",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:python"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=python&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.java,
    language: "java",
    description:
      "Java jest wysokiego poziomu, obiektowo-orientowanym językiem programowania.",
    url: "https://www.java.com/",
    image: "https://assets.stickpng.com/images/58480979cef1014c0b5e4901.png",
    tags: ["Java", "JVM"],
    source: "data/courses/java",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:java"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=java&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.kotlin,
    language: "kotlin",
    description:
      "Kotlin jest językiem programowania wysokiego poziomu, stworzonym przez JetBrains.",
    url: "https://kotlinlang.org/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/2048px-Kotlin_Icon.svg.png",
    tags: ["Kotlin", "Kt"],
    source: "data/courses/kotlin",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:kotlin"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=kotlin&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.csharp,
    language: "csharp",
    description:
      "C# jest językiem programowania ogólnego przeznaczenia, obiektowo-orientowanym i typowym.",
    url: "https://docs.microsoft.com/en-us/dotnet/csharp/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png",
    tags: ["C#", "CSharp", "C-Sharp", "C Sharp"],
    source: "data/courses/csharp",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:csharp"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=csharp&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.go,
    language: "go",
    description:
      "Go jest językiem programowania wysokiego poziomu stworzonym przez Google.",
    url: "https://golang.org/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png",
    tags: ["Go", "Golang"],
    source: "data/courses/go",
    TBA: false,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:go"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=go&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.php,
    language: "php",
    description:
      "PHP jest językiem skryptowym, głównie stosowanym do tworzenia stron internetowych.",
    url: "https://www.php.net/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png",
    tags: ["PHP"],
    source: "data/courses/php",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:php"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=php&type=count")
    ).data as number,
  },
  {
    title: programmingLanguages.ruby,
    language: "ruby",
    description:
      "Ruby jest językiem programowania wysokiego poziomu, interpretowanym i obiektowo-orientowanym.",
    url: "https://www.ruby-lang.org/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png",
    tags: ["Ruby", "Rb"],
    source: "data/courses/ruby",
    TBA: true,
    reposCount: (
      await reposCountFetcher(
        "https://api.github.com/search/repositories?q=language:ruby"
      )
    ).total_count as number,
    allLessons: (
      await lessonsFetcher("/api/courses/lessons?language=ruby&type=count")
    ).data as number,
  },
];

export { humanizeError, programmingLanguages, courses }