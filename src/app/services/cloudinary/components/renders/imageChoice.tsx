'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import UploadMediaButton from '../upload'

/**
 * Media array:
 *  - If `type` is "image", `url` is a string.
 *  - If `type` is "video", `url` is an object with { src, thumbnail }.
*/

const imageUrls = [
  {
    url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    type: 'image',
    bucketId: ''
  },
  {
    url: 'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    type: 'image',
    bucketId: ''
  },
  {
    url: {
      src: 'https://res.cloudinary.com/dgunvvl28/video/upload/v1736010417/3253113-hd_1920_1080_25fps_hrg5yq.mp4',
      thumbnail:
        'https://res.cloudinary.com/dgunvvl28/video/upload/v1736195796/codeBootcamp/imageBlock/hxdralv1zhwh3mvuva7y.jpg'
    },
    type: 'video',
    bucketId: ''
  }
];


/*
  w-28 h-28
  w-36 h-36 
*/

/**
 * If a media item is type: 'image', then `url` is a string.
 * If a media item is type: 'video', then `url` is an object of { src, thumbnail }.
 */

type ImageMedia = {
  type: 'image'
  url: string
  bucketId: string
}
type VideoMedia = {
  type: 'video'
  url: {
    src: string
    thumbnail: string
  }
  bucketId: string
}

type MediaItem = ImageMedia | VideoMedia;

interface ImageDisplayAndChangeProps {
  /** The URL to initially display in the main thumbnail (could be an image or a video thumbnail) */
  media: MediaItem
  /** Called when a user confirms their choice (on Save changes). Returns the **entire** chosen media object. */
  returnMediaChosen?: (chosenMedia: MediaItem) => void
  /** Whether we are in admin mode (can open the modal, hover effects, etc.) */
  isInAdminMode: boolean
  /** If true, never show the hover overlay. */
  noHoverNeeded?: boolean
}

export default function ImageDisplayAndChange({
  media,
  returnMediaChosen,
  isInAdminMode,
  noHoverNeeded = false
}: ImageDisplayAndChangeProps) {
  const [isHovered, setIsHovered] = useState(noHoverNeeded)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Store the entire MediaItem in state:
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(media)

  // Keep track of which item in `imageUrls` is currently selected in the modal.
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1)

  // ------------------------------------------------
  // Helper to pick the correct display URL
  // ------------------------------------------------
  function getDisplayUrl(item: MediaItem) {
    return item.type === 'image' ? item.url : item.url.thumbnail
  }

  // ----------------------------------------
  // 1. Hover + Click for Main Display
  // ----------------------------------------
  const handleMouseEnter = () => {
    if (isInAdminMode) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (isInAdminMode) {
      setIsHovered(false)
    }
  }

  const handleClick = () => {
    if (isInAdminMode) {
      setIsModalOpen(true)
    }
  }

  // ----------------------------------------
  // 2. Selecting from the List (but NOT returning yet)
  // ----------------------------------------
  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index)
    // Store the entire MediaItem in state
    const selectedItem = imageUrls[index]
    setSelectedMedia(selectedItem)
  }

  // ----------------------------------------
  // 3. Uploading New Media
  // ----------------------------------------
  const handleUploadSuccess = (url: string, type: 'image' | 'video', thumbnail?: string) => {
    console.log(url, type, thumbnail)

    if (type === 'video') {
      // If it’s a video
      const newVideoItem: VideoMedia = {
        type: 'video',
        url: {
          src: url,
          thumbnail: thumbnail || '/placeholder.png'
        },
        bucketId: ''
      }
      setSelectedMedia(newVideoItem)
      setSelectedImageIndex(-1)
      if (returnMediaChosen) returnMediaChosen(newVideoItem)
    } else {
      // If it’s an image
      const newImageItem: ImageMedia = {
        type: 'image',
        url,
        bucketId: ''
      }
      setSelectedMedia(newImageItem)
      setSelectedImageIndex(-1)
      if (returnMediaChosen) returnMediaChosen(newImageItem)
    }
  }

  // ----------------------------------------
  // 4. Saving/Canceling from Modal
  // ----------------------------------------
  const handleSaveChanges = () => {
    if (selectedImageIndex !== -1 && returnMediaChosen) {
      const selectedItem = imageUrls[selectedImageIndex]
      // Return the entire chosen object
      returnMediaChosen(selectedItem)
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Figure out the main display URL:
  const mainDisplayUrl = getDisplayUrl(selectedMedia);

  return (
    <>
      {/* Main Image/Video Thumbnail Display */}
      <div
        className="mr-4 rounded-lg bg-gray-100 flex justify-center items-center relative w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <Image
          src={mainDisplayUrl}
          alt="Current selection"
          fill
          className="object-cover rounded-lg"
        />
          <div className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-sm px-2 py-1 text-md text-gray-700">
              {selectedMedia.type}
          </div>
          <div className="absolute inset-0 bg-gray-100 bg-opacity-10 flex justify-center items-center">
            <div
              className={`cursor-pointer ${buttonVariants({
                variant: 'outline'
              })}`}
            >
              upload media
            </div>
          </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-3xl mx-4 sm:mx-auto bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Change Image / Video</h2>
              <p className="text-sm text-gray-500">
                Choose from existing images or upload a new one.
              </p>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <UploadMediaButton onUploadSuccess={handleUploadSuccess} />
            </div>

            <div className="p-4 pb-0 flex-grow overflow-x-auto flex-row">
              <div className="flex space-x-4 my-5 w-full">
                {/* List of Existing Images/Videos */}
                {imageUrls.map((mediaItem, index) => {
                  const displayUrl =
                    mediaItem.type === 'video'
                      ? mediaItem.url.thumbnail
                      : mediaItem.url

                  return (
                    <div
                      key={index}
                      className="relative w-36 h-36 flex-shrink-0 cursor-pointer"
                      onClick={() => handleSelectImage(index)}
                    >
                      <Image
                        className="rounded-lg object-cover"
                        src={displayUrl || '/placeholder.png'}
                        alt={`Option ${index + 1}`}
                        fill
                      />
                      {/* Tag the type in the top-left corner */}
                      <div className="absolute top-1 left-1 bg-white bg-opacity-80 rounded-sm px-2 py-0.5 text-xs text-gray-700">
                        {mediaItem.type}
                      </div>
                      {/* Overlay if selected */}
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center rounded-lg">
                          <Button variant="default">Selected</Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-2">
              <Button onClick={handleSaveChanges}>Save changes</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
