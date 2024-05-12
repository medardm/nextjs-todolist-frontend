import {config} from "@/config";

export const getEP = (path: string) => `${config.API_URL}/${path}`

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
  credentials?: 'include' | 'same-origin' | 'omit';
  request?: 'request';
  error?: 'error';
}

export const fetchData = async<T> (
  endpoint: string,
  options: FetchOptions
): Promise<T> => {

  options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options
  }

  const response = await fetch(getEP(endpoint), options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
