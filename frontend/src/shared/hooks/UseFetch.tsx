import { useState, useEffect, useCallback } from 'react';

interface FetchProps {
  method: string;
  url: string;
  body?: unknown;
}

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  refetch: () => void; // ✅ add refetch to the return type
}

const useFetch = <T = unknown>({ method, url, body }: FetchProps): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const fetchData = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: method.toUpperCase() === 'GET' ? null : JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  }, [method, url, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, status, refetch: fetchData };
};

export default useFetch;
