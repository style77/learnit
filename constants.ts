import { Course } from "./types/course";

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



export const courses: Course[] = [
    {
        title: programmingLanguages.javascript,
        language: 'javascript',
        description: 'JavaScript to interpretowany język programowania wysokiego poziomu.',
        url: 'https://www.javascript.com/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
        tags: ['JavaScript', 'ECMAScript', 'JS'],
        source: 'data/courses/javascript',
        TBA: false,
        reposCount: 17115527
    },
    {
        title: programmingLanguages.typescript,
        language: 'typescript',
        description: 'TypeScript to nadzbiór kodu JavaScript, który kompiluje się w celu wyczyszczenia danych wyjściowych JavaScript.',
        url: 'https://www.typescriptlang.org/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        tags: ['TypeScript', 'TS', 'JS'],
        source: 'data/courses/typescript',
        TBA: false,
        reposCount: 3514013,
    },
    {
        title: programmingLanguages.python,
        language: 'python',
        description: 'Python jest interpretowanym językiem programowania wysokiego poziomu i ogólnego przeznaczenia.',
        url: 'https://www.python.org/',
        image: 'https://www.python.org/static/opengraph-icon-200x200.png',
        tags: ['Python', 'Py'],
        source: 'data/courses/python',
        TBA: true,
        reposCount: 9564408,
    },
    {
        title: programmingLanguages.java,
        language: 'java',
        description: 'Java jest wysokiego poziomu, obiektowo-orientowanym językiem programowania.',
        url: 'https://www.java.com/',
        image: 'https://assets.stickpng.com/images/58480979cef1014c0b5e4901.png',
        tags: ['Java', 'JVM'],
        source: 'data/courses/java',
        TBA: true,
        reposCount: 11021787
    },
    {
        title: programmingLanguages.kotlin,
        language: 'kotlin',
        description: 'Kotlin jest językiem programowania wysokiego poziomu, stworzonym przez JetBrains.',
        url: 'https://kotlinlang.org/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/2048px-Kotlin_Icon.svg.png',
        tags: ['Kotlin', 'Kt'],
        source: 'data/courses/kotlin',
        TBA: true,
        reposCount: 954864
    },
    {
        title: programmingLanguages.csharp,
        language: 'csharp',
        description: 'C# jest językiem programowania ogólnego przeznaczenia, obiektowo-orientowanym i typowym.',
        url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png',
        tags: ['C#', 'CSharp', 'C-Sharp', 'C Sharp'],
        source: 'data/courses/csharp',
        TBA: true,
        reposCount: 3805246
    },
    {
        title: programmingLanguages.go,
        language: 'go',
        description: 'Go jest językiem programowania wysokiego poziomu stworzonym przez Google.',
        url: 'https://golang.org/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png',
        tags: ['Go', 'Golang'],
        source: 'data/courses/go',
        TBA: false,
        reposCount: 1124204
    },
    {
        title: programmingLanguages.php,
        language: 'php',
        description: 'PHP jest językiem skryptowym, głównie stosowanym do tworzenia stron internetowych.',
        url: 'https://www.php.net/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png',
        tags: ['PHP'],
        source: 'data/courses/php',
        TBA: true,
        reposCount: 3390986
    },
    {
        title: programmingLanguages.ruby,
        language: 'ruby',
        description: 'Ruby jest językiem programowania wysokiego poziomu, interpretowanym i obiektowo-orientowanym.',
        url: 'https://www.ruby-lang.org/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png',
        tags: ['Ruby', 'Rb'],
        source: 'data/courses/ruby',
        TBA: true,
        reposCount: 2679876
    }
]

export { programmingLanguages }