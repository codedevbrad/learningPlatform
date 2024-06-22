'use client'
import React , { useState } from 'react'
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ExplanationComponent, { ExplanationProps } from './explanation'

import AdminBlockTemplate from '../../templates/admin/admin.block.form'
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'
import { useRef } from 'react'

interface ExplanationBlockProps {
    data: ExplanationProps;
    blockIndex: number;
    adminTools: AdminToolsProps;
}

// BlockTemplate ...


// Block ...

const ExplanationAdminBlock: React.FC<ExplanationBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<ExplanationProps>( data );
  const [savedData, setSavedData] = useState<ExplanationProps | null>(data);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true);  // Set the save status to true
    adminTools.updateDataBlock({ type: 'update', blockData: formData , blockIndex });
  };

  const handleDelete = ( ) => {
    console.log('clicked to delete explanation' , blockIndex );
    adminTools.updateDataBlock({ type: 'delete', blockData: null , blockIndex });
  }

  const form = (
    <form onSubmit={handleSubmit} ref={ formRef }>
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
          <Label htmlFor="content">Content</Label>
          <textarea
            rows={5}
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <ExplanationComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
      <AdminBlockTemplate
        title="Explanation"
        description="Fill out the form and click save."
        form={form}
        savedData={preview}
        formRef={ formRef }
        isSaved={ isSaved }
        removeItem={ handleDelete }
      />
  );
}

export default ExplanationAdminBlock;