'use client'
import React, { useState, useRef } from 'react';
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminBlockTemplate from '../../templates/admin/admin.block.form';
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools';
import CodeSnippetComponent from './snippet';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';

interface CodeSnippetProps {
  title: string;
  code: string;
  type: 'codeSnippet';  // Ensure 'type' is included in the interface
}

interface CodeSnippetBlockProps {
  data: CodeSnippetProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const CodeSnippetAdminBlock: React.FC<CodeSnippetBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<CodeSnippetProps>(data);
  const [savedData, setSavedData] = useState<CodeSnippetProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setIsSaved(false);  // Reset the save status when the form changes
  };

  const handleCodeChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      code: value,
    }));
    setIsSaved(false);  // Reset the save status when the form changes
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true);  // Set the save status to true
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = () => {
    console.log('clicked to delete explanation', blockIndex);
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  }

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-2 px-0">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="code">Code</Label>
          <CodeMirror
            value={formData.code}
            theme={oneDark}
            extensions={[javascript()]}
            onChange={(value) => handleCodeChange(value)}
          />
        </div>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <>
      <CodeSnippetComponent data={savedData} />
    </>
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Code Snippet"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
}

export default CodeSnippetAdminBlock;