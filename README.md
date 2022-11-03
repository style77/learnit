# LearnIT
A simple, easy to use, and **free** learning platform for everyone.

## What is LearnIT?
LearnIT is a platform that allows everyone to learn coding. It is a free and open source project that is currently in development.
Feel free to contribute to the project by forking the repository and making a pull request (more about it in the [Contributing](#contributing) section).

## Disclaimer
Development version uses `https://cors-anywhere.herokuapp.com/corsdemo` to bypass CORS. This is not a good practice and should not be used in production. This is only for development purposes.
To get it working you need to open the site and click on button `Request temporary access to the demo server`.

## Setup
1. Clone the repository `git clone https://github.com/Style77/learnit.git`
2. Install dependencies `yarn install`
3. Setup `.env.local` file:
```
# Firebase config
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=

# local server url - website adds /api to the end
apiUrl="http://localhost:3000"


# jdoodle.com config - its used for compiling code in lessons
jdoodleClientId=
jdoodleClientSecret=
```
4. Run the project `yarn dev`

## Contributing
If you want to contribute to the project, you can do so by forking the repository and creating a pull request. If you have any questions, you can contact me on Discord: `yves#8382`.
Every contribution is appreciated and we will give you credit for it (especially every author of new lessons added, check format of lessons in [Models](#Models) section).

## Models

#### Lesson model
Lessons format is based on following formula:
- lessons are stored in `data/courses/[language]/lessons` folder, every lesson name is a number (e.g. `1.json`) and it is used for sorting lessons.
- lesson file is a JSON file with following structure:
```json
{
    "title": "",                // lesson title
    "description": "",          // this is not used anywhere yet, but can be used to display description in the future (or help with SEO)
    "number": 1,                // number of lesson
    "tags": [],                 // tags for lesson (e.g. "arrays", "loops", "functions") - not used anywhere yet
    "examples": [               // examples for lesson
        {
            "title": "",        // example title
            "description": "",  // example description - it's shown on the left side of editor
            "code": "",         // example code - it's shown in editor on the right side - not needed if u want user to write code from scratch
            "output": ""        // example output - it needs to be same as output from code written by user to let user pass the example (or lesson if there is only one example)
        },
        {                       // there can be multiple examples in one lesson - user needs to pass all of them to pass the lesson (or there can be only one example in lesson)
            "title": "",
            "description": "",
            "code": "",
            "output": ""
        }
    ]
}
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## TODO
- change description of courses in constants.js and add more courses
- change allowed domains in `next.config.js` to some image proxy like https://cloudinary.com/
- update `README.md` and `LICENSE`
- update reposCount every few days (there should be some cron job for that)
- add more lessons

## Used in LearnIT
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [jdoodle.com](https://www.jdoodle.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [showdown](https://github.com/showdownjs/showdown)

- icons for courses are mostly from wikimedia commons and official websites of the languages and frameworks

## Authors
- [Style](https://github.com/Style77) - Development
- [Kluczi](https://github.com/kluczi) - Development
