import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(process.env.REST_API_URL + '/exec', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  return new Response(JSON.stringify(result));
}

export async function GET(request: NextRequest) {
  const response = await fetch(process.env.REST_API_URL + '/exec', {
    method: 'GET',
  });

  const result = await response.json();

  return new Response(JSON.stringify(result));
}
