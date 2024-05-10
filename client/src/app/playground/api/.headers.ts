const prepareHeaders = () => {
  const headers = new Headers();
  headers.append('x-api-key', process.env.X_API_KEY!);
  headers.set('Content-Type', 'application/json');

  if (process.env.NODE_ENV === 'development') {
    headers.set('Cache-Control', 'no-store, force-no-store');
  }

  return headers;
};

export const headersWithApiKey = prepareHeaders();
