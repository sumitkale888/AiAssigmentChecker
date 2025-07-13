import { useState} from "react";
import type { FormEvent } from 'react'
import useManualFetch from "../../hooks/useManualFetch";
import { useDispatch } from "react-redux";
import { updateAuth } from '../../../features/auth/authSlice';

interface LoginFormProps {
  role: string;
  url: string;
}

const LoginForm = ({ role, url }: LoginFormProps) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { execute, data, status, error } = useManualFetch<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await execute(url, 'POST', { email, password });

    // ✅ safer: check if `data` is not null and `status` is 'success'
    if (status === 'success' && data) {
      console.log('authenticating');
      dispatch(
        updateAuth({
          authenticated: true,
          user: `${data.first_name} ${data.last_name}`,
        })
      );
    }
  };

 return (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
    <div className="text-lg font-semibold text-gray-700">{role}</div>

    <label htmlFor="email" className="text-sm font-medium text-gray-600">
      Email
    </label>
    <input
      type="text"
      name="email"
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label htmlFor="password" className="text-sm font-medium text-gray-600">
      Password
    </label>
    <input
      type="password"
      name="password"
      onChange={(e) => setPassword(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      type="submit"
      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Submit
    </button>

    {status === 'loading' && <p className="text-blue-600">Logging in...</p>}
    {status === 'error' && <p className="text-red-600">Error: {error?.message}</p>}
  </form>
);

};

export default LoginForm;
