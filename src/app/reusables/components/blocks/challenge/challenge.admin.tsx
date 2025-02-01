// components/admin/ChallengeAdminBlock.tsx
'use client'
import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ChallengeComponent, { ChallengeUsageProps, ChallengeProps } from './challenge'

import AdminBlockTemplate, { handleSubmitUtility } from '../../templates/admin/admin.block.form'
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools'

interface ChallengeAdminBlockProps {
  data: ChallengeUsageProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const ChallengeAdminBlock: React.FC<ChallengeAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<ChallengeUsageProps>(data);
  const [savedData, setSavedData] = useState<ChallengeUsageProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedContent = formData.content.map((item, idx) => 
      idx === index ? { ...item, [name]: value } : item
    );
    setFormData(prevData => ({
      ...prevData,
      content: updatedContent,
    }));
    setIsSaved(false); // Reset the save status when the form changes
  };

  const handleAddChallenge = () => {
    const newChallenge: ChallengeProps = { title: '', showcase: '' };
    setFormData(prevData => ({
      ...prevData,
      content: [...prevData.content, newChallenge],
    }));
    setIsSaved(false); // Reset the save status when a new challenge is added
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSavedData(formData);
  //   setIsSaved(true); // Set the save status to true
  //   adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('challenge block form submtted.')
    handleSubmitUtility({
      event: e,
      formData,
      setSavedData,
      adminTools,
      blockIndex,
    });
  };

  const handleDelete = ( ) => {
    console.log('clicked to delete explanation' , blockIndex );
    adminTools.updateDataBlock({ type: 'delete', blockData: null , blockIndex });
  }

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-2 px-0">
        {formData.content.map((challenge, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                { `Challenge ${index + 1}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 mx-2">
                  <div className="space-y-3 ">
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      name="title"
                      value={challenge.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor={`showcase-${index}`}>Showcase</Label>
                    <textarea
                      rows={4}
                      id={`showcase-${index}`}
                      name="showcase"
                      value={challenge.showcase}
                      onChange={(e) => handleChange(e, index)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        <Button type="button" onClick={handleAddChallenge}>Add Challenge</Button>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <ChallengeComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Challenge"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={ handleDelete }
    />
  );
};

export default ChallengeAdminBlock;