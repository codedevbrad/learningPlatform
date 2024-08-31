import React, { useState } from "react"
import { motion } from "framer-motion"
import { CodeDisplay, EditorHeader, CompletedButton, OptionsDisplay } from "./components"

interface AnimatedCodeChallengeProps {
  title: string; 
  codeSteps: Array<any>; // You can replace 'any' with a more specific type if you have it
  onComplete?: () => void;
  codeType: 'js' | 'jsx'
}


export default function AnimatedCodeChallengev0 ({ title = 'title not set' , codeSteps , onComplete , codeType } : AnimatedCodeChallengeProps ) {
  const [displayedCodeState, updateDisplayedCodeState] = useState("");
  const [previousCodeState, setPreviousCodeState] = useState(""); // Track previous code
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [incorrectSelections, setIncorrectSelections] = useState([]);

  const handleOptionSelect = (index) => {
    // Prevent any further action if the option has already been selected (correct or incorrect)
    if (selectedOption !== null || incorrectSelections.includes(index)) {
        return;
    }

    const currentCodeStep = codeSteps[currentStep]; // Get the current step

    if (index === currentCodeStep.interactive.correct) {
        setSelectedOption(index);
        setPreviousCodeState(displayedCodeState); // Save the current code as previous

        // Map over the code array to process each code object
        let codeToAdd = currentCodeStep.code.map(codeObj => {
            let content = codeObj.content;

            // Apply new line if newLine is an object with `state: true`
            if (codeObj.newLine && codeObj.newLine.state) {
                content = '\n'.repeat(codeObj.newLine.by) + content;
            }
            // Apply indentation
            if (codeObj.indent > 0) {
                const indentation = ' '.repeat(codeObj.indent * 2); // Assuming 2 spaces per indent
                content = content.split('\n').map(line => indentation + line).join('\n');
            }
            return content;
        }).join(''); // Join all processed content in the code array

        if (currentCodeStep.appendType.type === "edit") {
            // Edit the existing code by matching the exact step content and replacing it
            updateDisplayedCodeState((prev) => {
                const stepToReplace = codeSteps.find(
                    (step) => step.step === currentCodeStep.appendType.step
                );

                if (stepToReplace) {
                    // Extract the code content that needs to be replaced
                    const stepCode = stepToReplace.code.map(codeObj => {
                        let content = codeObj.content;

                        if (codeObj.newLine && codeObj.newLine.state) {
                            content = '\n'.repeat(codeObj.newLine.by) + content;
                        }

                        if (codeObj.indent > 0) {
                            const indentation = ' '.repeat(codeObj.indent * 2);
                            content = content.split('\n').map(line => indentation + line).join('\n');
                        }

                        return content;
                    }).join('');

                    // Replace the step code with the new code
                    const regex = new RegExp(stepCode.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
                    return prev.replace(regex, codeToAdd);
                }
                return prev;
            });
        } else {
            // Append the new code
            updateDisplayedCodeState((prev) => prev + codeToAdd);
        }

        setTimeout(() => {
          if ( onComplete && ( currentStep + 1 ) >= codeSteps.length ) {
              onComplete(); // Call the onComplete function when the last step is completed
          }
          if (currentStep < codeSteps.length ) {
              setCurrentStep((prev) => prev + 1);
              setSelectedOption(null);
              setIncorrectSelections([]);
          } 
         
      }, 1000); // Delay to allow the user to see the code before moving on
    } 
    else {
        setIncorrectSelections((prev) => [...prev, index]);
    }
  };

  const handleRetry = () => {
    setCurrentStep(0);
    updateDisplayedCodeState("");
    setPreviousCodeState("");
    setSelectedOption(null);
    setIncorrectSelections([]);
  };

  return (
    <div className="flex flex-col items-center space-y-4bg-gray-200 py-8 p-5 rounded-xl">
          {currentStep < codeSteps.length && (
            <div className="text-lg text-black font-bold">
              <h1 className="text-3xl text-center text-black mb-3"> { title } </h1>
              <h2> {codeSteps[currentStep].interactive.question} </h2>
            </div>
          )}
          <div className="bg-black p-4 rounded-2xl w-full shadow-2xl">
            <EditorHeader />
            <CodeDisplay displayedCode={displayedCodeState} previousCode={previousCodeState} codeType={ codeType } />
          </div>
          {currentStep < codeSteps.length && (
            <div className="flex flex-col items-center mt-4 space-y-4">
              <OptionsDisplay
                options={codeSteps[currentStep].interactive.options}
                onSelectOption={handleOptionSelect}
                selectedOption={selectedOption}
                correctOption={codeSteps[currentStep].interactive.correct}
                incorrectSelections={incorrectSelections}
              />
            </div>
          )}
          {currentStep >= codeSteps.length && (
            <div className="flex justify-center mt-4">
              <CompletedButton onClick={handleRetry} />
            </div>
          )}
    </div>
  );
}