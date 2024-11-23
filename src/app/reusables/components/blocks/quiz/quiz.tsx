'use client' 
import React, { useState } from 'react'

interface QuizType {
  title: string;
  content: {
    question: string;
    options: string[];
    answerIndex: number;
  };
}

interface QuizObjectProps {
  type: 'quiz';
  title: string;
  quizData: QuizType[];
  id?: string;
}

interface QuizDataProps {
  data: QuizObjectProps;
}

export const quizObject: QuizObjectProps = {
  type: 'quiz',
  title: '',
  quizData: [
      {
        title: 'Question 1',
        content: {
            question: '',
            options: [
            '',
            '',
            '',
            ''
            ],
            answerIndex: 2
        }
      }
  ]
};


const QuizComponent: React.FC<QuizDataProps> = ({ data }) => {
  const { title, quizData } = data;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSubmit = (selectedIndex: number) => {
    const newUserAnswers = [...userAnswers, selectedIndex];
    setUserAnswers(newUserAnswers);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const renderQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    return (
      <div className="mb-4">
        <div className="flex justify-center py-6">
          <h2 className="text-white mb-2">
            <span className='bg-white px-1 py-0.5 text-black mr-3 rounded-md'> Question { currentQuestionIndex + 1 } </span> 
            {currentQuestion.content.question}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.content.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerSubmit(index)} className="bg-white text-black p-2 rounded hover:bg-gray-200 transition duration-150 ease-in-out">
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-indigo-950 text-white p-6 rounded-lg max-w-2xl mx-auto my-8 drop-shadow-2xl">
      <div className="flex flex-row items-center">
        <div className='flex-1'>
        <h1 className="text-xl font-bold">
            {title}
          </h1>
        </div>
        <div className="flex rounded-lg py-0.5 px-2 text-sm bg-white text-black">
            { quizData.length } questions long.
        </div>
      </div>
      {!showResults ? (
        renderQuestion()
      ) : (
        <div>
          <h2 className="text-lg mb-4">Your Score: {userAnswers.filter((answer, index) => answer === quizData[index].content.answerIndex).length} / {quizData.length}</h2>
          <ul>
            {quizData.map((question, index) => (
              <li key={index} className={`mb-2 p-2 rounded ${userAnswers[index] === question.content.answerIndex ? 'bg-blue-100 text-blue-900' : 'bg-red-100 text-red-900'}`}>
                question { index + 1 } : {question.content.question}
                <p>Correct answer: {question.content.options[question.content.answerIndex]}</p>
                {userAnswers[index] !== question.content.answerIndex && (
                  <p>Your answer: {question.content.options[userAnswers[index]]}</p>
                )}
              </li>
            ))}
          </ul>
          <button onClick={restartQuiz} className="mt-4 bg-white text-indigo-950 p-2 rounded hover:bg-gray-200 transition duration-150 ease-in-out">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
export type { QuizObjectProps };
