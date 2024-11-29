'use client'
import React, { useState, useRef } from 'react'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AdminBlockTemplate, { handleSubmitUtility } from '../../templates/admin/admin.block.form'
import { AdminToolsProps } from '@/app/(pages)/(authed)/admin/_types/type.adminTools'
import VideoViewComponent, { VideoBlockProps } from './video'

interface VideoAdminBlockProps {
  data: VideoBlockProps;
  blockIndex: number;
  adminTools: AdminToolsProps;
}

const VideoAdminBlock: React.FC<VideoAdminBlockProps> = ({ data, adminTools, blockIndex }) => {
  const [formData, setFormData] = useState<VideoBlockProps>(data);
  const [savedData, setSavedData] = useState<VideoBlockProps | null>(data);
  const [isSaved, setIsSaved] = useState(true);
  const [activeTab, setActiveTab] = useState<'youtube' | 'upload'>(data.sourceType || 'youtube');

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      sourceType: 'youtube'
    }));
    setIsSaved(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        url: URL.createObjectURL(file),
        sourceType: 'upload'
      }));
      setIsSaved(false);
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSavedData(formData);
  //   setIsSaved(true);
  //   adminTools.updateDataBlock({ type: 'update', blockData: formData, blockIndex });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Video block form submtted.')
    handleSubmitUtility({
      event: e,
      formData,
      setSavedData,
      adminTools,
      blockIndex,
    });
  };

  const handleDelete = () => {
    console.log('Clicked to delete video block', blockIndex);
    adminTools.updateDataBlock({ type: 'delete', blockData: null, blockIndex });
  };

  const handleTabChange = (tab: 'youtube' | 'upload') => {
    setActiveTab(tab);
    setFormData(prevData => ({
      ...prevData,
      sourceType: tab,
      url: '',
    }));
    setIsSaved(false);
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>

      <CardContent className="px-0 space-y-4">

        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>   

        <div className='space-y-2'>
            <Label htmlFor="tabs"> Video Upload </Label>
            <div className="border border-gray-200 bg-gray-50 px-5 py-5"name={ "tabs"}> 
              <Tabs value={activeTab} onValueChange={handleTabChange} >
                <TabsList>
                  <TabsTrigger value="youtube">YouTube</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                  <Label htmlFor="url">Video URL</Label>
                  <div className='flex flex-row h-full '>
                      <div className='pr-2 flex items-center'> https://www.youtube.com/watch?v= </div>
                      <Input
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className='my-2 flex-1 border rounded-lg bg-white'
                      />
                  </div>
                </TabsContent>
                <TabsContent value="upload">
                  <Label htmlFor="file"> Custom Video </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className='my-2 cursor-pointer'
                  />
                  {formData.url && (
                    <p className="mt-2 text-sm text-gray-500">{`Selected file: ${formData.url}`}</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
        </div>
      </CardContent>
    </form>
  );

  const preview = savedData ? (
    <VideoViewComponent data={savedData} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Video"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={handleDelete}
    />
  );
};

export default VideoAdminBlock;
export type { VideoBlockProps };