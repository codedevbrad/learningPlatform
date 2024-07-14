'use client';
import React, { useState, useRef } from 'react'
import { action__editNewResource } from './actions'
import AdminBlockTemplate from '@/app/reusables/components/templates/admin/admin.block.form'
import { Button } from '@/components/ui/button'
import ResourceComponent, { resourceObject, resourceObjectType } from '@/app/reusables/components/resources'
import ImageDisplayAndChange from '@/app/reusables/usables/imageChoice'


interface AdminEachResourceComponentProps {
  removeResource: (index: number) => void;
  updateResource: (resource: resourceObjectType, index: number) => void;
  resourceData: resourceObjectType;
  blockIndex: number;
}

function AdminEachResourceComponent({
  removeResource,
  updateResource,
  resourceData,
  blockIndex,
}: AdminEachResourceComponentProps) {
  const [formData, setFormData] = useState<resourceObjectType>({ ...resourceData });
  const [savedData, setSavedData] = useState<resourceObjectType>({ ...resourceData });
  const [isSaved, setIsSaved] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      imgUrl: imageUrl,
    }));
    setIsSaved(false);
    console.log('image changed', imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      updateResource(formData, blockIndex);
      setSavedData({ ...formData });
      setIsSaved(true);
    } catch (error) {
      console.log('error saving resource', error);
    }
  };

  const form = (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="flex-row">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row space-x-4">
            <div className="mb-4 flex-grow">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="enter the bookmark title ..."
              />
            </div>
            <div className="mb-4 flex-grow">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="enter the url ..."
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="enter the description title ..."
            />
          </div>
        </div>
        <div className="flex justify-center items-center px-10">
          <ImageDisplayAndChange imageUrl={formData.imgUrl} isInAdminMode={true} returnImageChosen={handleImageChange} />
        </div>
      </div>
    </form>
  );

  const preview = savedData ? (
    <ResourceComponent resource={savedData} isInAdminMode={true} handleImageChange={handleImageChange} />
  ) : (
    <p>No data available. Please fill out the form.</p>
  );

  return (
    <AdminBlockTemplate
      title="Resource"
      description="Fill out the form and click save."
      form={form}
      savedData={preview}
      formRef={formRef}
      isSaved={isSaved}
      removeItem={() => removeResource(blockIndex)} // Ensure the function is correctly passed down
    />
  );
}

interface EditResourcesComponentProps {
  topicId: string;
  resources: resourceObjectType[];
}

function EditResourcesComponent({ topicId, resources }: EditResourcesComponentProps) {
  const [resourcesState, setResourcesState] = useState<resourceObjectType[]>(resources);

  const addNewResourceFunction = async () => {
    const newResource: resourceObjectType = { id: Date.now(), ...resourceObject };
    const newArrayState = [...resourcesState, newResource];
    setResourcesState(newArrayState);
    await action__editNewResource(topicId, newArrayState);
  };

  const updateAResource = async (resource: resourceObjectType, index: number) => {
    const updatedResources = [...resourcesState];
    updatedResources[index] = resource;
    await action__editNewResource(topicId, updatedResources);
    setResourcesState(updatedResources);
  };

  const removeResourceFunction = async (index: number) => {
    const updatedResources = resourcesState.filter((_, i) => i !== index);
    setResourcesState(updatedResources);
    await action__editNewResource(topicId, updatedResources);
  };

  return (
    <div className="mt-3 flex flex-col">
      <div className="space-y-4">
        {resourcesState.map((resource, index) => (
          <div key={resource.id}>
            <AdminEachResourceComponent
              removeResource={removeResourceFunction}
              updateResource={updateAResource}
              resourceData={resource}
              blockIndex={index}
            />
          </div>
        ))}
      </div>
      <div className="flex fixed bottom-0 left-0 justify-center items-center w-full h-28 bg-white">
        <Button variant="outline" color="primary" onClick={addNewResourceFunction}>
          Add New Resource
        </Button>
      </div>
    </div>
  );
}

export default EditResourcesComponent;