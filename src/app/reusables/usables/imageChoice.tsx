'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { buttonVariants } from '@/components/ui/button';

const imageUrls = [
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  'https://images.unsplash.com/photo-1506765515384-028b60a970df',
  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  // Add more URLs as needed
];

interface ImageDisplayAndChangeProps {
  imageUrl: string;
  returnImageChosen?: (imageUrlState: string) => void;
  isInAdminMode: boolean;
}

export default function ImageDisplayAndChange({ imageUrl, returnImageChosen, isInAdminMode }: ImageDisplayAndChangeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageUrlState, setImage] = useState(imageUrl);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const updateImageFunc = (index: number, url: string) => {
    setSelectedImageIndex(index);
    setImage(url);
    if (returnImageChosen) {
      returnImageChosen(url);
    }
  };

  const handleCompletingImageSave = () => {
    if (returnImageChosen && selectedImageIndex !== -1) {
      returnImageChosen(imageUrls[selectedImageIndex]);
      setImage(imageUrls[selectedImageIndex]);
    }
    setIsDrawerOpen(false);
  };

  const handleMouseEnter = () => {
    if (isInAdminMode) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isInAdminMode) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (isInAdminMode) {
      setIsDrawerOpen(true);
    }
  };

  const handleUploadSuccess = (result) => {
    const uploadedUrl = result.info.secure_url;
    setImage(uploadedUrl);
    if (returnImageChosen) {
      returnImageChosen(uploadedUrl);
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Main Image Display */}
      <div
        className="mr-4 rounded-lg bg-gray-100 flex justify-center items-center relative w-28 h-28"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <Image
          src={imageUrlState}
          alt={''}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
            <div className={`cursor-pointer ${buttonVariants({ variant: 'outline' })}`}>Change</div>
          </div>
        )}
      </div>

      {/* Drawer for Image Selection */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <div />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full h-full">
            <DrawerHeader>
              <DrawerTitle>Upload a new Image</DrawerTitle>
              <DrawerDescription>Choose an image from below or upload your own.</DrawerDescription>
            </DrawerHeader>

            {/* Row of Images and Upload Option */}
            <div className="p-4 pb-0 flex-grow overflow-x-auto flex-row">
              <div className="flex space-x-4 my-5 w-full">
                {/* Cloudinary Upload Button */}
                <CldUploadButton
                  options={{ multiple: false }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onUpload={handleUploadSuccess}
                >
                  <div className="mr-4 rounded-lg bg-gray-200 flex justify-center items-center w-36 h-36 cursor-pointer">
                    <span className="text-sm text-center">Upload New Image</span>
                  </div>
                </CldUploadButton>

                {/* List of Images */}
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative w-36 h-36 flex-shrink-0 cursor-pointer">
                    <Image
                      className="rounded-lg"
                      src={url}
                      layout="fill"
                      objectFit="cover"
                      alt={`Unsplash Image ${index + 1}`}
                      onClick={() => updateImageFunc(index, url)}
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center rounded-lg">
                        <Button variant="default">Selected</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DrawerFooter className="flex flex-row justify-center items-center p-6 h-32">
              <Button onClick={handleCompletingImageSave}>
                Save changes
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
