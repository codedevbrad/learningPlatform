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
import { Textarea } from '@/components/ui/textarea';

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

  // Handle changes in the form data
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

  // Handle changes in the summary
  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, summary: e.target.value });
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

        {/* Added Summary Textbox */}
        <div className="space-y-1">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleSummaryChange}
            placeholder="Enter the summary for the challenge"
          />
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
                    {/* ... Existing Step Content Here ... */}
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
