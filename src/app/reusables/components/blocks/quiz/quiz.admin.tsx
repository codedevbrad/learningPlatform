'use client'
import React, { useState , useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AdminBlockTemplate from '../../templates/admin/admin.block.form'


import { AdminToolsProps } from '@/app/admin/_types/type.adminTools'
import QuizComponent, { QuizObjectProps } from './quiz'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


interface QuizAdminBlockProps {
  data: QuizObjectProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}


const QuizAdminBlock: React.FC<QuizAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<QuizObjectProps>(data);
  const [savedData, setSavedData] = useState<QuizObjectProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef( null );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, questionIndex, optionIndex] = name.split('-');

    if (section === 'option') {
      const questions = [...formData.quizData];
      questions[parseInt(questionIndex)].content.options[parseInt(optionIndex)] = value;
      setFormData(prevData => ({
        ...prevData,
        quizData: questions
      }));
    } else if (section === 'answer') {
      const questions = [...formData.quizData];
      questions[parseInt(questionIndex)].content.answerIndex = parseInt(value);
      setFormData(prevData => ({
        ...prevData,
        quizData: questions
      }));
    } else if (section === 'question') {
      const questions = [...formData.quizData];
      questions[parseInt(questionIndex)].content.question = value;
      setFormData(prevData => ({
        ...prevData,
        quizData: questions
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true);
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = ( ) => {
    console.log('clicked to delete explanation' , blockIndex );
    adminTools.updateDataBlock({ type: 'delete', blockData: null , blockIndex });
  }

  const handleAddQuestion = () => {
    const newQuestion = {
      title: `Question ${formData.quizData.length + 1}`,
      content: {
        question: '',
        options: ['', '', '', ''],
        answerIndex: 0
      }
    };
    setFormData(prevData => ({
      ...prevData,
      quizData: [...prevData.quizData, newQuestion]
    }));
    setIsSaved(false);
  };


  const handleTitleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setFormData({ ...formData, title: e.target.value });
    setIsSaved( false );
  }

  const form = (
    <form onSubmit={handleSubmit} ref={ formRef }>
      <CardContent className="space-y-2 px-0">
        <div className="space-y-1">
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleTitleChange( e ) }
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {formData.quizData.map((quiz, questionIndex) => (
            <AccordionItem key={questionIndex} value={`item-${questionIndex}`}>
              <AccordionTrigger>Question {questionIndex + 1}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}</Label>
                    <Input
                      id={`question-${questionIndex}`}
                      name={`question-${questionIndex}`}
                      value={quiz.content.question}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-wrap">
                    {quiz.content.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="w-1/2 p-2">
                        <div>
                            <Label htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex + 1}</Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`correct-answer-${questionIndex}-${optionIndex}`}
                                name={`answer-${questionIndex}`}
                                value={optionIndex}
                                checked={quiz.content.answerIndex === optionIndex}
                                onChange={handleChange}
                              />
                            <Input
                              className="my-2"
                              id={`option-${questionIndex}-${optionIndex}`}
                              name={`option-${questionIndex}-${optionIndex}`}
                              value={option}
                              onChange={handleChange}
                            />
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </CardFooter>
    </form>
  );

  const preview = savedData ? (
    <QuizComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Quiz"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={ formRef }
      isSaved={ isSaved }
      removeItem={ handleDelete }
    />
  );
};

export default QuizAdminBlock;