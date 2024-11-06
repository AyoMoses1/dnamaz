"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import { adminLogin } from '@/app/_lib/Api/endpoints/admin';
import { AdminLoginRequest, AdminLoginResponse } from '@/app/_types/apiTypes';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const loginData: AdminLoginRequest = { username, password };

    try {
      const response: AdminLoginResponse = await adminLogin(loginData);
      console.log('Login successful:', response);
      if (response.success) {
        router.push('/dashboard');
      } else {
        setError("Login failed");
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
    console.error('Login error:', err);
  } else {
    // Handle unexpected error types
    setError('An unexpected error occurred');
    console.error('Unexpected error type:', err);
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4 w-full">
      <div className="relative">
        <FaUser className="absolute left-3 top-5 text-black" />
        <input
          type="email"
          id="email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          placeholder="Username"
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-5 text-gray-400" />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default LoginForm;