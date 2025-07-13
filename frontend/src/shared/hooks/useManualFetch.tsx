import { useState } from "react";

const useManualFetch = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  const execute = async (url: string, method: string, body?: unknown) => {
    setStatus('loading');
    try {
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  };

  return { execute, data, status, error };
};

export default useManualFetch;