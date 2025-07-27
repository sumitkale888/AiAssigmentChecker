import { useState } from "react";

const useUploadFetch = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const execute = async (url: string, method: string, body: FormData) => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        body,
        credentials: 'include', // ✅ Don't set Content-Type manually
        // headers: { 'Content-Type': 'multipart/form-data' } ❌ DO NOT DO THIS
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setData(result);
      setStatus('success');
    } catch (err: any) {
      setError(err);
      setStatus('error');
    }
  };

  return { execute, data, status, error };
};

export default useUploadFetch;
