'use client'
import AnimatedCodeChallengev0 from "./v1"

interface CodeSnippet {
    content: string;
    newLine: false | { state: true; by: number };
    indent: number;
}
  
interface AppendType {
    type: "edit" | "new";
    step?: number; // required when type is "edit"
}
  
interface StepContent {
    step: number;
    code: CodeSnippet[];
    type: "interactive";
    audio: string;
    appendType: AppendType;
    interactive: {
      correct: number;
      options: string[];
      question: string;
    };
}
  

interface AnimatedCodeChallengeProps {
    codeType: "js" | "jsx";
    content: StepContent[];
    title: string;
    type: "animatedCodeChallenge";
    id?: string;
    summary: string;
}

export const animatedCodeChallengeObject : AnimatedCodeChallengeProps = {
    content: [
        {
            step: 1,
            code: [{ content: `function DisplayName` , newLine: false , indent: 0 }],
            type: "interactive",
            audio: "",
            appendType: { type: "new" },
            interactive: {
              correct: 0,
              options: [
                `function keyword function name`,
                `function name function keyword`,
              ],
              question: "How do we tell js we want to create a named function?",
            }
        },
    ],
    title: 'Creating ReactJs components',
    codeType: 'jsx',
    type: 'animatedCodeChallenge',
    summary: `We can see how a component is created and the syntax needed. I'd say the hardest parts are getting the keywords right.`
}


interface AnimatedCodeChallengeUsageProps {
    data: AnimatedCodeChallengeProps;
}


export default function AnimatedCodeChallenge ( { data } : AnimatedCodeChallengeUsageProps ) {
    function onEnd ( ) {
        console.log('complete');
    }
    return (
        <>
            <AnimatedCodeChallengev0 title={ data.title } summary={ data.summary } codeSteps={ data.content } onComplete={ onEnd } codeType={ data.codeType } />
        </>
    )
}

export type {
    AnimatedCodeChallengeProps , AnimatedCodeChallengeUsageProps
}