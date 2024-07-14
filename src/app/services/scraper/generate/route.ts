import { NextResponse } from 'next/server'

interface Resource {
    title: string;
    description: string;
    url: string;
    imgUrl: string;
}

export async function GET(request: Request) {
    const data: Resource = await request.json();
    return NextResponse.json({ message: 'Resource saved successfully', resource: data });
}
