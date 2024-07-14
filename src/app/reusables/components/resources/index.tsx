'use client'
import Image from "next/image"
import Link from "next/link"
import Title from "../../content/title"
import ImageDisplayAndChange from "../../usables/imageChoice"

export const resourceObject = {
    title: '',
    description: '',
    url: '',
    imgUrl: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4'
};

interface resourceObjectType {
    id: number;
    title: string;
    url: string;
    description: string;
    imgUrl: string;
  }

interface ResourceType {
    resource: resourceObjectType;
    isInAdminMode: boolean;
    handleImageChange?: any;
}


function ResourceComponent({ resource , isInAdminMode = false, handleImageChange }: ResourceType) {
    const { title, description, url, imgUrl } = resource;

    return (
        <div className="border p-4 rounded-lg flex flex-row">
            <ImageDisplayAndChange 
                imageUrl={ imgUrl } 
                isInAdminMode={ false } 
            />
            <div className="flex flex-col justify-center pl-4">
                <Link href={url}>
                    <div>
                        <Title title={ title } variant={'subheading2'} noMargin={ true } />
                        <p>{description}</p>
                    </div> 
                </Link>
            </div>
        </div>
    );
}

export type {
    ResourceType, 
    resourceObjectType
}


export default ResourceComponent;