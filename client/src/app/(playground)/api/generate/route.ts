import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const lodashFn = new URL(request.url).searchParams.get('lodash_fn_name');

  const apiUrl = new URL(process.env.REST_API_URL + '/exec/generate');
  apiUrl.searchParams.set('lodash_fn_name', lodashFn!);

  const response = await fetch(apiUrl.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  console.log('RESULT: ', result);

  return new Response(JSON.stringify({ generatedCode: result.generatedCode }));
}
