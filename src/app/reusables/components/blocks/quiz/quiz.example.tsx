import QuizComponent, { QuizObjectProps } from "./quiz"

export const quizObjectDemonstrationReactJs: QuizObjectProps = {
    type: 'quiz',
    title: 'ReactJS Basics Quiz',
    quizData: [
      {
        title: 'Question 1',
        content: {
          question: 'What is ReactJS primarily used for?',
          options: [
            'Building databases',
            'Designing animations',
            'Building user interfaces',
            'Managing servers',
          ],
          answerIndex: 2,
        },
      },
      {
        title: 'Question 2',
        content: {
          question: 'What is JSX?',
          options: [
            'A CSS framework',
            'A JavaScript library',
            'A syntax extension for JavaScript',
            'A database query language',
          ],
          answerIndex: 2,
        },
      },
      {
        title: 'Question 3',
        content: {
          question: 'Which of the following is used to manage component state in React?',
          options: [
            'useState',
            'useRef',
            'useEffect',
            'useContext',
          ],
          answerIndex: 0,
        },
      },
      {
        title: 'Question 4',
        content: {
          question: 'What is the purpose of the `key` prop in React?',
          options: [
            'To define the type of a component',
            'To improve the performance of the app',
            'To uniquely identify elements in a list',
            'To add inline styles to an element',
          ],
          answerIndex: 2,
        },
      },
      {
        title: 'Question 5',
        content: {
          question: 'What is the virtual DOM?',
          options: [
            'A direct copy of the browser DOM',
            'An abstraction of the real DOM for performance optimization',
            'A database management tool',
            'A template engine for HTML',
          ],
          answerIndex: 1,
        },
      },
    ],
};

  
export default function QuizDemonstration ( { languageChosen } ) {
    return <QuizComponent data={ quizObjectDemonstrationReactJs } />
}