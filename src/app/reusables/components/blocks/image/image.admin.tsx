'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageBlock, { ImageBlockProps } from './image';
import AdminBlockTemplate, { handleSubmitUtility } from '../../templates/admin/admin.block.form';
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import UploadMediaButton from '@/app/services/cloudinary/components/upload';


interface ImageAdminBlockProps {
  data: ImageBlockProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const ImageAdminBlock: React.FC<ImageAdminBlockProps> = ({
  data,
  adminTools,
  blockIndex,
}) => {
  const [formData, setFormData] = useState<ImageBlockProps>({
    ...data,
    position: data.position || 'center',
    responsive: data.responsive ?? true,
  });
  const [savedData, setSavedData] = useState<ImageBlockProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setIsSaved(false);
  };

  const handlePositionChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      position: value,
    }));
    setIsSaved(false);
  };

  const handleResponsiveChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      responsive: checked,
    }));
    setIsSaved(false);
  };

  /** 2. handleUploadSuccess used in the reusable component's onUploadSuccess */
  const handleUploadSuccess = ( url , resource_type) => {
    const uploadedUrl = url;
    const uploadedMediaType = resource_type;

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: uploadedUrl,
      mediaType: uploadedMediaType,
    }));

    setIsSaved(true);
    adminTools.updateDataBlock({
      type: 'update',
      blockData: {
        ...formData,
        imageUrl: uploadedUrl,
        mediaType: uploadedMediaType,
      },
      blockIndex,
    });
    setSavedData({
      ...formData,
      imageUrl: uploadedUrl,
      mediaType: uploadedMediaType,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Image block form submitted.');
    handleSubmitUtility({
      event: e,
      formData,
      setSavedData,
      adminTools,
      blockIndex,
    });
  };

  const handleDelete = () => {
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <CardContent className="space-y-4 px-0">
        <div className="flex-row space-x-4 justify-between my-5">
          <div className="flex grow flex-col space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select value={formData.position} onValueChange={handlePositionChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="responsive" className="">
              Responsive
            </Label>
            <div className="h-full flex items-end justify-end">
              <Checkbox
                className="w-14 h-full"
                checked={formData.responsive}
                onCheckedChange={handleResponsiveChange}
              />
            </div>
          </div>
        </div>

        {/**
         * 3. Use the new UploadMediaButton
         * Pass in any existing media URL, media type, and the success callback
         */}
        <Card className="bg-gray-50 flex justify-center items-center p-5">
          <UploadMediaButton
            mediaUrl={formData.imageUrl}
            mediaType={formData.mediaType}
            title={formData.title}
            onUploadSuccess={handleUploadSuccess}
            folderPath="codeBootcamp/imageBlock" 
          />
        </Card>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <ImageBlock data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Media"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default ImageAdminBlock;
