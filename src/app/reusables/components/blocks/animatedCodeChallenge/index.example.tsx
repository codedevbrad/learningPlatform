import AnimatedCodeChallenge, { AnimatedCodeChallengeProps} from "."

const animatedCodeChallengeObject: AnimatedCodeChallengeProps = {
    content: [
      {
        step: 1,
        code: [
          {
            content: "function DisplayName",
            newLine: false,
            indent: 0,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "new",
        },
        interactive: {
          correct: 0,
          options: [
            "function keyword function name",
            "function name function keyword",
          ],
          question: "How do we tell js we want to create a named function?",
        },
      },
      {
        step: 2,
        code: [
          {
            content: "( )",
            newLine: false,
            indent: 0.5,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "new",
        },
        interactive: {
          correct: 0,
          options: ["( )", "{  }", "[ ] "],
          question: "How do we allow a function to take in arguments?",
        },
      },
      {
        step: 3,
        code: [
          {
            content: "{\n\n}",
            newLine: false,
            indent: 0.5,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "new",
        },
        interactive: {
          correct: 0,
          options: ["{  }", "[ ]", "(   )"],
          question: "How do we open and close a function?",
        },
      },
      {
        step: 4,
        code: [
          {
            content: "{\n  return (\n    <div> this is a component </div>\n  )\n}",
            newLine: false,
            indent: 0.5,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "edit",
          step: 3,
        },
        interactive: {
          correct: 0,
          options: ["return ( )", "render ( )", "invoke ( )"],
          question: "How do we convert a function into a component?",
        },
      },
      {
        step: 5,
        code: [
          {
            content: "( { name } )",
            newLine: false,
            indent: 0.5,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "edit",
          step: 2,
        },
        interactive: {
          correct: 1,
          options: ["< name > ", "{ name }", "props"],
          question: "How do we pass a props of name using destructuring?",
        },
      },
      {
        step: 6,
        code: [
          {
            content: "export default DisplayName;",
            newLine: {
              state: true,
              by: 2,
            },
            indent: 0,
          },
        ],
        type: "interactive",
        audio: "",
        appendType: {
          type: "new",
        },
        interactive: {
          correct: 2,
          options: [
            "export component DisplayName;",
            "export DisplayName;",
            "export default DisplayName;",
          ],
          question: "How do we export this component for use elsewhere?",
        },
      },
    ],
    title: "Creating ReactJs components",
    codeType: "jsx",
    type: "animatedCodeChallenge",
    summary:
      "We can see how a component is created and the syntax needed. I'd say the hardest parts are getting the keywords right.",
    id: "77a3bedc-1c67-4799-8744-7865b44b9291",
  };
  


export default function AnimatedCodeChallengeDemonstration ( ) {
    return (
        <AnimatedCodeChallenge data={ animatedCodeChallengeObject } />
    )
}