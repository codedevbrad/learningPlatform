import React , { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExplanationComponent, { ExplanationProps } from './explanation';

import AdminBlockTemplate from '../../admin/admin.block.form'


export default function ExplanationAdminBlock() {
  const [formData, setFormData] = useState<ExplanationProps>({
    content: '',
    title: '',
    type: 'explanation',
  });

  const [savedData, setSavedData] = useState<ExplanationProps | null>(null);
  const [isSaved, setIsSaved] = useState(false);

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
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-2">
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
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </CardFooter>
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
      />
  );
}