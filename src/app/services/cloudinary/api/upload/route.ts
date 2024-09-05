// app/api/services/cloudinary/upload/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Retrieve file from the form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer and log it to console
    const fileBuffer = await file.arrayBuffer();
    console.log('Received file:', file);

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'your_folder_name' }, // Optional: Specify a folder in Cloudinary
      (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }
        // Return the Cloudinary URL of the uploaded image
        return NextResponse.json({ imageUrl: result.secure_url });
      }
    );

    // Create a stream from the buffer and pipe it to Cloudinary
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(fileBuffer));
        controller.close();
      },
    });

    readableStream.pipe(result);
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
