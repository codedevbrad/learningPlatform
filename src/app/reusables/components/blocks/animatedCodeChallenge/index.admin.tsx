'use client'
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import SimpleCodeEditor from 'react-simple-code-editor';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import AdminBlockTemplate from '../../templates/admin/admin.block.form';
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools';
import AnimatedCodeChallenge, { AnimatedCodeChallengeProps } from './index';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Title from '@/app/reusables/content/title';

interface AnimatedCodeChallengeAdminBlockProps {
  data: AnimatedCodeChallengeProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const AnimatedCodeChallengeAdminBlock: React.FC<AnimatedCodeChallengeAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<AnimatedCodeChallengeProps>(data);
  const [savedData, setSavedData] = useState<AnimatedCodeChallengeProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stepIndex: number,
    codeIndex?: number,
    optionIndex?: number
  ) => {
    const { name, value } = e.target;
    const updatedContent = [...formData.content];

    if (name.startsWith('step-question')) {
      updatedContent[stepIndex].interactive.question = value;
    } else if (name.startsWith('step-option-')) {
      if (optionIndex !== undefined) {
        updatedContent[stepIndex].interactive.options[optionIndex] = value;
      }
    } else if (name.startsWith('step-code-')) {
      if (codeIndex !== undefined) {
        updatedContent[stepIndex].code[codeIndex].content = value;
      }
    } else if (name.startsWith('step-indent-')) {
      if (codeIndex !== undefined) {
        updatedContent[stepIndex].code[codeIndex].indent = parseFloat(value);
      }
    } else if (name.startsWith('step-newline-')) {
      if (codeIndex !== undefined) {
        if (name.includes('amount')) {
          if (typeof updatedContent[stepIndex].code[codeIndex].newLine === 'object') {
            updatedContent[stepIndex].code[codeIndex].newLine.by = parseInt(value, 10) || 1;
          }
        } else {
          updatedContent[stepIndex].code[codeIndex].newLine =
            value === 'true' ? { state: true, by: updatedContent[stepIndex].code[codeIndex].newLine.by || 1 } : false;
        }
      }
    } else if (name.startsWith('step-appendType-')) {
      updatedContent[stepIndex].appendType.type = value as 'edit' | 'new';
    }

    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleCorrectOptionChange = (stepIndex: number, optionIndex: number) => {
    const updatedContent = [...formData.content];
    updatedContent[stepIndex].interactive.correct = optionIndex;
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleAppendStepChange = (e: React.ChangeEvent<HTMLInputElement>, stepIndex: number) => {
    const updatedContent = [...formData.content];
    updatedContent[stepIndex].appendType.step = parseInt(e.target.value, 10);
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleCodeChange = (code: string, stepIndex: number, codeIndex: number) => {
    const updatedContent = [...formData.content];
    updatedContent[stepIndex].code[codeIndex].content = code;
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleCopyStepCode = (stepIndex: number, targetStep: number) => {
    if (targetStep >= 1 && targetStep <= formData.content.length) {
      const sourceStep = formData.content[targetStep - 1];
      const updatedContent = [...formData.content];
      updatedContent[stepIndex].code = sourceStep.code.map(code => ({ ...code })); // Copy the code snippets
      setFormData((prevData) => ({
        ...prevData,
        content: updatedContent,
      }));
      setIsSaved(false);
    }
  };

  const highlightCode = (code: string) => (
    <Highlight {...defaultProps} code={code} language="jsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: 0,
            margin: 0,
            fontSize: 14,
            lineHeight: '1.5',
            fontFamily: 'monospace',
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true);
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = () => {
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  const handleAddStep = () => {
    const newStep: AnimatedCodeChallengeProps['content'][number] = {
      step: formData.content.length + 1,
      code: [{ content: '', newLine: false, indent: 0 }],
      type: 'interactive',
      audio: '',
      appendType: { type: 'new' },
      interactive: {
        correct: 0,
        options: ['', ''],
        question: '',
      },
    };
    setFormData((prevData) => ({
      ...prevData,
      content: [...prevData.content, newStep],
    }));
    setIsSaved(false);
  };

  const handleRemoveStep = (stepIndex: number) => {
    const updatedContent = formData.content.filter((_, index) => index !== stepIndex);
    updatedContent.forEach((step, index) => {
      step.step = index + 1;
    });
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleAddCodeSnippet = (stepIndex: number) => {
    const updatedContent = [...formData.content];
    updatedContent[stepIndex].code.push({ content: '', newLine: false, indent: 0 });
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleRemoveCodeSnippet = (stepIndex: number, codeIndex: number) => {
    const updatedContent = [...formData.content];
    updatedContent[stepIndex].code.splice(codeIndex, 1);
    setFormData((prevData) => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false);
  };

  const handleAddOption = (stepIndex: number) => {
    const updatedContent = [...formData.content];
    if (updatedContent[stepIndex].interactive.options.length < 4) {
      updatedContent[stepIndex].interactive.options.push('');
      setFormData((prevData) => ({
        ...prevData,
        content: updatedContent,
      }));
      setIsSaved(false);
    }
  };

  const handleRemoveOption = (stepIndex: number, optionIndex: number) => {
    const updatedContent = [...formData.content];
    if (updatedContent[stepIndex].interactive.options.length > 2) {
      updatedContent[stepIndex].interactive.options.splice(optionIndex, 1);
      setFormData((prevData) => ({
        ...prevData,
        content: updatedContent,
      }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, title: e.target.value });
    setIsSaved(false);
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-4 px-0">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleTitleChange} />
        </div>
        <Card className="bg-gray-50 p-5 pb-5">
          <div className="pb-4 flex flex-row justify-between items-center">
            <Title variant="subheading3" title="Code steps." noMargin={false} />
            <Button type="button" onClick={handleAddStep}>
              Add Step
            </Button>
          </div>
          <Accordion type="multiple" collapsible className="w-full">
            {formData.content.map((step, stepIndex) => (
              <AccordionItem key={stepIndex} value={`item-${stepIndex}`} className="border-b my-3 py-3">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-left">Step {step.step} :</div>
                  <div className="grow flex">
                    <Input
                      id={`step-question-${stepIndex}`}
                      name="step-question"
                      value={step.interactive.question}
                      onChange={(e) => handleChange(e, stepIndex)}
                      placeholder="question name"
                    />
                  </div>
                  <div className="flex flex-row justify-end">
                    <Button type="button" variant="destructive" onClick={() => handleRemoveStep(stepIndex)}>
                      Delete Step
                    </Button>
                  </div>
                  <AccordionTrigger
                    className="ml-3 border-gray-300 border w-[55px] flex justify-center items-center rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <AccordionContent>
                  <Card className="space-y-5 px-5 py-5 bg-gray-100">

                    <div className="flex-row space-x-5 ">
                        <Card className="w-1/4 p-5 flex flex-col space-y-2">
                          <div className="flex flex-row space-x-4  grow">
                              <div className='flex flex-col grow'>
                                  <Label htmlFor={`step-appendType-${stepIndex}`} className="my-2">
                                    Append Type
                                  </Label>
                                  <Select
                                    onValueChange={(value) =>
                                      handleChange(
                                        { target: { name: `step-appendType-${stepIndex}`, value } } as React.ChangeEvent<HTMLInputElement>,
                                        stepIndex
                                      )
                                    }
                                    value={step.appendType.type}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Append Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="edit">Edit</SelectItem>
                                    </SelectContent>
                                  </Select>  
                              </div>

                              {step.appendType.type === 'edit' && (
                                <div className="flex flex-col space-y-2 mt-2">
                                  <Label htmlFor={`step-append-step-${stepIndex}`}>Edit Step Number</Label>
                                  <Input
                                    id={`step-append-step-${stepIndex}`}
                                    name={`step-append-step-${stepIndex}`}
                                    type="number"
                                    min="1"
                                    max={step.step - 1}
                                    value={step.appendType.step || ''}
                                    onChange={(e) => handleAppendStepChange(e, stepIndex)}
                                  />
                                </div>
                              )}
                          </div>

                          <div className='flex justify-end'>
                              <Button type="button" onClick={() => handleCopyStepCode(stepIndex, step.appendType.step || 1)}  className="mt-2">
                                Copy Step Code
                              </Button>
                          </div>
                        </Card>

                        <Card className="grow p-5 flex flex-col">
                          <div className="flex flex-row items-center justify-between">
                            <Title title="Question Code Snippets" variant="subheading2" noMargin={false} />
                            <Button type="button" onClick={() => handleAddCodeSnippet(stepIndex)}>
                              Add Code Snippet
                            </Button>
                          </div>
                          <div className="ml-4 space-y-4">
                            {step.code.map((codeSnippet, codeIndex) => (
                              <div key={codeIndex} className="flex flex-row items-center space-x-4">
                                <div className="flex flex-col flex-1 space-y-3">
                                  <Label htmlFor={`step-code-${stepIndex}-${codeIndex}`}>Code Snippet {codeIndex + 1}</Label>
                                  <SimpleCodeEditor
                                    value={codeSnippet.content}
                                    onValueChange={(code) => handleCodeChange(code, stepIndex, codeIndex)}
                                    highlight={highlightCode}
                                    padding={15}
                                    className="p-2 font-mono min-h-[100px] text-lg rounded-xl"
                                    style={{
                                      backgroundColor: theme.plain.backgroundColor,
                                      color: theme.plain.color,
                                      fontFamily: 'monospace',
                                      overflow: 'auto',
                                    }}
                                  />
                                </div>
                                <div className="flex flex-col space-y-3">
                                  <div className="flex flex-row space-x-4">
                                    <div className="flex flex-col w-20 space-y-3">
                                      <Label htmlFor={`step-indent-${stepIndex}-${codeIndex}`}>Indent</Label>
                                      <Input
                                        id={`step-indent-${stepIndex}-${codeIndex}`}
                                        name={`step-indent-${stepIndex}-${codeIndex}`}
                                        type="number"
                                        step="0.5"
                                        value={codeSnippet.indent}
                                        onChange={(e) => handleChange(e, stepIndex, codeIndex)}
                                      />
                                    </div>
                                    <div className="flex flex-col w-32 space-y-3">
                                      <Label htmlFor={`step-newline-${stepIndex}-${codeIndex}`}>New Line</Label>
                                      <Select
                                        onValueChange={(value) =>
                                          handleChange(
                                            { target: { name: `step-newline-${stepIndex}-${codeIndex}`, value } } as React.ChangeEvent<HTMLInputElement>,
                                            stepIndex,
                                            codeIndex
                                          )
                                        }
                                        value={codeSnippet.newLine === false ? 'false' : 'true'}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="New Line" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="true">True</SelectItem>
                                          <SelectItem value="false">False</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      {typeof codeSnippet.newLine === 'object' && (
                                        <Input
                                          type="number"
                                          id={`step-newline-amount-${stepIndex}-${codeIndex}`}
                                          name={`step-newline-amount-${stepIndex}-${codeIndex}`}
                                          value={codeSnippet.newLine.by}
                                          onChange={(e) => handleChange(e, stepIndex, codeIndex)}
                                          placeholder="Line Amount"
                                          min="1"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleRemoveCodeSnippet(stepIndex, codeIndex)}
                                  >
                                    Delete Snippet
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                    </div>

                    <Card className="p-5 flex flex-col">
                      <div className="flex flex-row items-center justify-between">
                        <Title title="Question Options" variant="subheading2" noMargin={false} />
                        {step.interactive.options.length < 4 && (
                          <Button type="button" onClick={() => handleAddOption(stepIndex)}>
                            Add Option
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          {step.interactive.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <Input
                                name={`step-option-${stepIndex}-${optionIndex}`}
                                value={option}
                                onChange={(e) => handleChange(e, stepIndex, undefined, optionIndex)}
                              />
                              <RadioGroup
                                className="flex items-center space-x-2"
                                value={step.interactive.correct === optionIndex ? 'true' : 'false'}
                                onValueChange={() => handleCorrectOptionChange(stepIndex, optionIndex)}
                              >
                                <RadioGroupItem value="true" />
                                <Label>Correct</Label>
                              </RadioGroup>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => handleRemoveOption(stepIndex, optionIndex)}
                              >
                                Delete
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                    
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <AnimatedCodeChallenge data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Animated Code Challenge"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default AnimatedCodeChallengeAdminBlock;
