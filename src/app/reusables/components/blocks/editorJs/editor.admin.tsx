'use client'
import React, { useState, useRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Editor from '@/app/reusables/usables/editorJs/index'
import Title from '@/app/reusables/content/title'
import AdminBlockTemplate from '../../templates/admin/admin.block.form'
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'

import EditorViewComponent , { EditorJsProps, EditorJsUsageProps } from './editor'


interface EditorAdminBlockProps {
  data: EditorJsProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const EditorAdminBlock: React.FC<EditorAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<EditorJsProps>(data);
  const [savedData, setSavedData] = useState<EditorJsProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      title: value,
    }));
    setIsSaved(false);
  };

  const handleEditorChange = (editorData: any) => {
    setFormData(prevData => ({
      ...prevData,
      content: editorData,
    }));
    setIsSaved(false);
    console.log('saving editor through auto update')
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true);
    console.log('saving editor through submit')
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = () => {
    console.log('Clicked to delete editor block', blockIndex);
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-2 px-0">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="content">Content</Label>
          <Editor
            inReadMode={false}
            data={formData.content}
            onSaveToState={handleEditorChange}
            showSaveButn={ false }
          />
        </div>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <EditorViewComponent data={ savedData } />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Editor"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default EditorAdminBlock;
export type { EditorJsProps, EditorJsUsageProps };