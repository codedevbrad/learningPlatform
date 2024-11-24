'use client'
import React, { useState, useRef } from 'react'
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ExplanationComponent, { ExplanationProps } from './explanation'
import AdminBlockTemplate from '../../templates/admin/admin.block.form'
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'
import { Textarea } from '@/components/ui/textarea'
import { TextAreaWithTooltip2 } from '@/components/custom/inputWithTooltip'


interface ExplanationBlockProps {
  data: ExplanationProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const ExplanationAdminBlock: React.FC<ExplanationBlockProps> = ({
  data,
  adminTools,
  blockIndex,
}) => {
  const [formData, setFormData] = useState<ExplanationProps>(data);
  const [savedData, setSavedData] = useState<ExplanationProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setIsSaved(false); // Reset the save status when the form changes
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedData(formData);
    setIsSaved(true); // Set the save status to true
    adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  };

  const handleDelete = () => {
    console.log('clicked to delete explanation', blockIndex);
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  // Function to update content from AddLoremIpsum
  const updateLoremContent = (newContent: string) => {
    setFormData((prevData) => ({
      ...prevData,
      content: newContent,
    }));
    setIsSaved(false); // Reset save status
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-2 px-0">
        {/* Title Section Inline */}
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="size">Title Size</Label>
            <select
              id="size"
              name="size"
              value={formData.size || 'subheading1'}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
            >
              <option value="subheading1">Subheading 1</option>
              <option value="subheading2">Subheading 2</option>
              <option value="subheading3">Subheading 3</option>
            </select>
          </div>

          <div className="flex items-center flex-col">
            <Label htmlFor="renderTitle" className="mr-2">Show Title</Label>
            <input
              type="checkbox"
              id="renderTitle"
              name="renderTitle"
              checked={formData.renderTitle}
              onChange={handleChange}
              className="mt-1 w-12 h-12"
            />
          </div>
        </div>

        <TextAreaWithTooltip2 />

        {/* Content Section */}
        <div className="space-y-1">
          <Label htmlFor="content">Content</Label>
          <Textarea
            wordLimit={300}
            rows={3}
            updateContentbyLorem={updateLoremContent}
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
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default ExplanationAdminBlock;
