
/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect, useCallback } from 'react'
import Title from "@/app/reusables/content/title"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { action__createUser } from '../../actions'
import JSConfetti from 'js-confetti'
import Link from 'next/link'

interface Question {
  question: string;
  answer: string;
}

interface BioStepProps {
  aboutState: string;
  setAboutState: (value: string) => void;
  nickname: string;
  setNickname: (value: string) => void;
}

const BioStep: React.FC<BioStepProps> = ({ aboutState, setAboutState, nickname, setNickname }) => (
  <div className="space-y-4">
    <Label htmlFor="nickname" className="text-left">
      Nickname
    </Label>
    <input
      id="nickname"
      type="text"
      className="w-full border border-grey-300 rounded-lg p-3"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      placeholder="Your nickname"
    />
    <Label htmlFor="bio" className="text-left">
      Tell us why you want to join our platform?
    </Label>
    <textarea
      id="bio"
      className="w-full border border-grey-300 rounded-lg p-3"
      rows={4}
      value={aboutState}
      onChange={(e) => setAboutState(e.target.value)}
      placeholder="I would like to learn / get better at ..."
    />
  </div>
);

interface QuestionsStepProps {
  questions: Question[];
  handleQuestionChange: (index: number, value: string) => void;
}

const QuestionsStep: React.FC<QuestionsStepProps> = ({ questions, handleQuestionChange }) => (
  <Accordion type="single" collapsible>
    {questions.map((question, index) => (
      <AccordionItem key={index} value={`question${index + 1}`}>
        <AccordionTrigger>
          <div className="flex justify-between items-center w-full">
            <span>{question.question}</span>
            <span className={question.answer ? "text-green-500" : "text-red-500"}>
              {question.answer ? "Complete" : "Not Complete"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <textarea
            placeholder={`Answer to question ${index + 1}`}
            value={question.answer}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="w-full border border-grey-300 rounded-lg p-3"
            rows={4}
          />
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const CongratsStep: React.FC = () => (
  <div className="text-center">
    <div className="space-y-4 mb-4">
      <h2 className="text-2xl font-bold">Congratulations!</h2>
      <p>You have successfully completed your profile setup.</p>
      <p className="mb-5">
        As a new user it might be helpful to read the help
        section on our platform
      </p>
    </div>
    <Link href="/authed/content/help/chat">
      <Button variant="outline">Helpful info</Button>
    </Link>
  </div>
);

const AuthedButRegister: React.FC = () => {
  const [modalState, changeModalState] = useState(true);
  const [aboutState, setAboutState] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([
    { question: 'Why do you want to join our platform?', answer: '' },
    { question: 'What are your learning goals?', answer: '' }
  ]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      changeModalState(true);
    }
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    try {
      const newUser = { nickname, bio: aboutState, questions };
      console.log(newUser);
      await action__createUser(newUser);
      setCurrentStep(3);
    } catch (err) {
      console.error("couldn't save user");
    }
  }, [nickname, aboutState, questions]);

  const handleClose = useCallback(() => {
    changeModalState(false);
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }, []);

  const handleQuestionChange = useCallback((index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  }, [questions]);

  useEffect(() => {
    setIsButtonEnabled(
      !!nickname &&
      !!aboutState &&
      questions.every(question => question.answer)
    );
  }, [nickname, aboutState, questions]);

  return (
    <Dialog open={modalState} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        {currentStep < 3 && (
          <DialogHeader>
            <Title title="We need a few things first" variant="heading" noMargin={true} />
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
        )}
        <div className="space-y-6">
          {currentStep === 1 && (
            <BioStep aboutState={aboutState} setAboutState={setAboutState} nickname={nickname} setNickname={setNickname} />
          )}
          {currentStep === 2 && (
            <QuestionsStep questions={questions} handleQuestionChange={handleQuestionChange} />
          )}
          {currentStep === 3 && (
            <CongratsStep />
          )}
        </div>
        <DialogFooter>
          {currentStep > 1 && currentStep < 3 && (
            <Button onClick={handlePreviousStep}>Previous step</Button>
          )}
          {currentStep < 2 && (
            <Button onClick={handleNextStep} disabled={!aboutState}>
              Next
            </Button>
          )}
          {currentStep === 2 && (
            <Button onClick={handleSubmit} disabled={!isButtonEnabled}>Start Learning</Button>
          )}
          {currentStep === 3 && (
            <Button onClick={handleClose}>Start your learning journey</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthedButRegister;