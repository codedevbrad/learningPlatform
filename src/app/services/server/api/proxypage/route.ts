import { NextResponse } from 'next/server';

// export async function GET() {
//   // Return some test data instead of fetching an actual URL
//   const sampleData = {
//     message: 'API is working!',
//     data: [
//       { id: 1, name: 'Resource 1', description: 'This is resource 1' },
//       { id: 2, name: 'Resource 2', description: 'This is resource 2' },
//     ],
//   };

//   return NextResponse.json(sampleData, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

import axios from 'axios';

export async function GET(request: Request) {
  console.log('hey')
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  // Validate URL to ensure it is a proper URL
  if (!url || !url.startsWith('http')) {
    return NextResponse.json(
      { error: 'Invalid URL' },
      { status: 400 }
    );
  }

  try {
    // Fetch the content from the target URL
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });

    // Return the HTML content fetched from the target site
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'text/html',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch the content' },
      { status: 500 }
    );
  }
}
