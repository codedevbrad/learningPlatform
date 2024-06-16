'use client'
import { useState, useRef } from "react"
import { action__getAllResources, action__addNewResource, action__editResource, action__deleteResource } from "./actions"
import AdminBlockTemplate from "@/app/reusables/components/templates/admin/admin.block.form"
import { Button } from "@/components/ui/button"
import ResourceComponent , { resourceObject } from "@/app/reusables/resources"
import ImageDisplayAndChange from "@/app/reusables/usables/imageChoice"


function AdminEachResourceComponent ({ resourceData, blockIndex }) {
    const [formData, setFormData] = useState(resourceData);
    const [savedData, setSavedData] = useState(resourceData);
    const [isSaved, setIsSaved] = useState(true);

    const formRef = useRef<HTMLFormElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setIsSaved(false);  // Reset the save status when the form changes
    };

    const handleImageChange = (imageUrl: string ) => {
        setFormData({
            ...formData,
            imgUrl: imageUrl
        });
        setIsSaved( false );
        console.log( 'image changed' , imageUrl );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSavedData(formData);
        setIsSaved(true);
    };


    const form = (
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-4">
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
                />
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
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                    URL
                </label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-"
                />
            </div>
            <ImageDisplayAndChange imageUrl={ formData.imgUrl } isInAdminMode={ true } returnImageChosen={ handleImageChange }/>
        </form>
    );

    const preview = savedData ? (
        <ResourceComponent resource={savedData} isInAdminMode={ true } handleImageChange={ handleImageChange } />
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
        />
    );
}


export default function EditResourcesComponent({ topicId, resources }) {
    const [resourcesState, updateResources] = useState([]);


    const addNewResourceFunction = () => {
        let resourcesCopy = [...resourcesState];
        resourcesCopy.push(resourceObject);
        updateResources(resourcesCopy);
    };

    const updateAResource = ( ) => {

    }

    const removeResource = () => {
        // Implement remove resource logic here
    };
    
    return (
        <div className="mt-3">
            <div className="space-y-4">
                { resourcesState.map((resource, index) => (
                    <div key={index}>
                        <AdminEachResourceComponent resourceData={resource} blockIndex={index} />
                    </div>
                ))}
            </div>
            <div className="flex fixed bottom-0 left-0 justify-center items-center w-full h-28">
                <Button variant={'outline'} onClick={() => addNewResourceFunction()}> Add New Resource </Button>
            </div>
        </div>
    );
}