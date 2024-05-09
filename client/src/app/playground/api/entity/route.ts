import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const lodashFn = new URL(request.url).searchParams.get('lodash_fn_name');

    const apiUrl = new URL(process.env.REST_API_URL + '/exec/entity');
    apiUrl.searchParams.set('lodash_fn_name', lodashFn!);

    const headers = new Headers();

    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'no-store');

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers,
    });

    const result = await response.json();

    return new Response(JSON.stringify(result));
  } catch (e) {
    return new Response(null, { status: 400 });
  }
}
