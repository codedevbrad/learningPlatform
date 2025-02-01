'use client'

import React from 'react'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'

interface UploadMediaButtonProps {
  /** Existing url for either an image or a video */
  mediaUrl?: string;
  /** 'image' or 'video' or other resource type as returned by Cloudinary's result.info.resource_type */
  mediaType?: string;
  /** Optional text title for the uploaded content */
  title?: string;
  /** Called after a successful upload */
  onUploadSuccess: any;
  /** The folder to which uploads will be sent in Cloudinary */
  folderPath?: string;
}

function removeThumbnailTransformations(url: string): string {
  return url.replace('/upload/c_limit,h_60,w_90/', '/upload/');
}

const UploadMediaButton: React.FC<UploadMediaButtonProps> = ({
  mediaUrl,
  mediaType,
  title,
  onUploadSuccess,
  folderPath = 'codeBootcamp/imageBlock',
}) => {
  return (
    <CldUploadButton
      options={{
        multiple: false,
        folder: folderPath
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={ ( success ) => {
        console.log( success.info )
        const cleanedThumbnail = removeThumbnailTransformations(success.info.thumbnail_url);
        onUploadSuccess( success.info.url, success.info.resource_type  , cleanedThumbnail )
      }}   
      className="relative z-50 cursor-pointer"
    >
      <div className="rounded-lg bg-gray-200 flex justify-center items-center relative overflow-hidden w-full h-full">
        {mediaUrl ? (
          <div className="w-full h-full flex justify-center items-center relative">
            {mediaType === 'video' ? (
              <video
                src={mediaUrl}
                controls
                className="rounded-lg w-full h-full object-cover"
              />
            ) : (
              <Image
                src={mediaUrl}
                alt={title || 'Uploaded Media'}
                width={600}
                height={400}
                className="rounded-lg object-cover opacity-65 w-full h-auto"
              />
            )}
            <div className="flex absolute z-50 py-3 px-4 inset-0 text-sm text-center justify-center items-center text-black rounded-lg">
              <span className="bg-white py-2 px-4 rounded-lg text-lg shadow-sm">
                Upload New Image/Video
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-center p-4">
            Upload New Image/Video
          </div>
        )}
      </div>
    </CldUploadButton>
  );
};

export default UploadMediaButton;