// ImageAdminBlock.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CldUploadButton } from 'next-cloudinary';
import ImageBlock, { ImageBlockProps } from './image';
import AdminBlockTemplate, { handleSubmitUtility } from '../../templates/admin/admin.block.form';
import { AdminToolsProps } from '@/app/admin/_types/type.adminTools';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface ImageAdminBlockProps {
  data: ImageBlockProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const ImageAdminBlock: React.FC<ImageAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<ImageBlockProps>({
    ...data,
    position: data.position || 'center',
    responsive: data.responsive ?? true,
  });
  const [savedData, setSavedData] = useState<ImageBlockProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);
  const formRef = useRef(null);

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

  const handleUploadSuccess = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    console.log( result.info.resource_type );
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: uploadedUrl,
      mediaType: result.info.resource_type, // Correctly setting the media type based on the resource type
    }));

    setIsSaved(true);
    adminTools.updateDataBlock({
      type: 'update',
      blockData: { ...formData, imageUrl: uploadedUrl, mediaType: result.info.resource_type },
      blockIndex,
    });
    setSavedData({ ...formData, imageUrl: uploadedUrl, mediaType: result.info.resource_type });
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSavedData(formData);
  //   setIsSaved(true);
  //   adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Image block form submtted.')
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
            <Label htmlFor="responsive" className="">Responsive</Label>
            <div className='h-full flex items-end justify-end'>
              <Checkbox
                className="w-14 h-full"
                checked={formData.responsive}
                onCheckedChange={handleResponsiveChange}
              />
            </div>
          </div>
        </div>

        <Card className="bg-gray-50 flex justify-center items-center p-5">
          <CldUploadButton
            options={{
              multiple: false,
              folder: 'codeBootcamp/imageBlock'
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            onSuccess={handleUploadSuccess}
            className="relative z-50 cursor-pointer"
          >
            <div className="rounded-lg bg-gray-200 flex justify-center items-center relative overflow-hidden">
              {formData.imageUrl ? (
                <div className="w-full h-full flex justify-center items-center relative">
                  {formData.mediaType === 'video' ? (
                    <video
                      src={formData.imageUrl}
                      controls
                      className="rounded-lg w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={formData.imageUrl}
                      alt={formData.title || 'Uploaded Image'}
                      width={600}
                      height={400}
                      objectFit="cover"
                      className="rounded-lg opacity-65"
                    />
                  )}
                  <div className="flex absolute z-50 py-3 px-4 inset-0 text-sm text-center justify-center items-center text-black rounded-lg">
                    <span className="bg-white py-2 px-4 rounded-lg text-lg shadow-sm">
                      Upload New Image/Video
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-center">Upload New Image/Video</span>
              )}
            </div>
          </CldUploadButton>
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
      title="Image/Video"
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
