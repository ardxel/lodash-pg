import type { NextRequest } from 'next/server';
import { headersWithApiKey } from './.headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(process.env.REST_API_URL + '/exec', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headersWithApiKey,
    });

    const result = await response.json();

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(process.env.REST_API_URL + '/exec', {
      method: 'GET',
      headers: headersWithApiKey,
    });

    const result = await response.json();

    return new Response(JSON.stringify(result));
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 400 });
  }
}
