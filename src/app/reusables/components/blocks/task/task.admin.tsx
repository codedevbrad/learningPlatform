// components/admin/TaskAdminBlock.tsx

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskComponent, { TaskProps } from './task'
import AdminBlockTemplate from '../../templates/admin/admin.block.form'

import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'


interface TaskAdminBlockProps {
  data: TaskProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const TaskAdminBlock: React.FC<TaskAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<TaskProps>(data);
  const [savedData, setSavedData] = useState<TaskProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: 'tasks' | 'tips', index: number) => {
    const { name, value } = e.target;
    const updatedContent = formData.content[section].map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setFormData(prevData => ({
      ...prevData,
      content: {
        ...prevData.content,
        [section]: updatedContent,
      },
    }));
    setIsSaved(false); // Reset the save status when the form changes
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      content: {
        ...prevData.content,
        [name]: value,
      },
    }));
    setIsSaved(false); // Reset the save status when the form changes
  };

  const handleAddItem = (section: 'tasks' | 'tips') => {
    const newItem = { title: '', explanation: '' };
    setFormData(prevData => ({
      ...prevData,
      content: {
        ...prevData.content,
        [section]: [...prevData.content[section], newItem],
      },
    }));
    setIsSaved(false); // Reset the save status when a new item is added
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true); // Set the save status to true
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = ( ) => {
    console.log('clicked to delete' , blockIndex );
    adminTools.updateDataBlock({ type: 'delete', blockData: null , blockIndex });
  }

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>

      <CardContent className="space-y-2 px-0">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleDescriptionChange(e as unknown as React.ChangeEvent<HTMLTextAreaElement>)}
          />
        </div>

        <Tabs defaultValue="description">
          <TabsList className="my-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <textarea
                rows={3}
                id="description"
                name="description"
                value={formData.content.description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <ul>
              {formData.content.tasks.map((task, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={`task-${index}`}>
                    <AccordionTrigger>
                      { `Task ${index + 1}` }
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <Label htmlFor={`task-title-${index}`}>Task Title</Label>
                        <Input
                          id={`task-title-${index}`}
                          name="title"
                          value={task.title}
                          onChange={(e) => handleChange(e, 'tasks', index)}
                        />
                      </div>
                      <div className="space-y-3 mt-4">
                        <Label htmlFor={`task-explanation-${index}`}>Task Explanation</Label>
                        <textarea
                          rows={3}
                          id={`task-explanation-${index}`}
                          name="explanation"
                          value={task.explanation}
                          onChange={(e) => handleChange(e, 'tasks', index)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <div className="my-3">
                <Button type="button" onClick={() => handleAddItem('tasks')}>Add Task</Button>
              </div>
            </ul>
          </TabsContent>
          <TabsContent value="tips">
            <ul>
              {formData.content.tips.map((tip, index) => (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem value={`tip-${index}`}>
                    <AccordionTrigger>
                      { `Tip ${index + 1}` }
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <Label htmlFor={`tip-title-${index}`}>Tip Title</Label>
                        <Input
                          id={`tip-title-${index}`}
                          name="title"
                          value={tip.title}
                          onChange={(e) => handleChange(e, 'tips', index)}
                        />
                      </div>
                      <div className="space-y-3 mt-4">
                        <Label htmlFor={`tip-explanation-${index}`}>Tip Explanation</Label>
                        <textarea
                          rows={3}
                          id={`tip-explanation-${index}`}
                          name="explanation"
                          value={tip.explanation}
                          onChange={(e) => handleChange(e, 'tips', index)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <div className="my-3">
                <Button type="button" onClick={() => handleAddItem('tips')}>Add Tip</Button>
              </div>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <TaskComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Project Task"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={ handleDelete }
    />
  );
};

export default TaskAdminBlock;