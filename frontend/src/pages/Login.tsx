import { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import toast from 'react-hot-toast';

import API from '../services/api';

const Login = () => {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res =
        await API.post(
          '/auth/login',
          {
            email,
            password,
          }
        );

      // SAVE TOKEN
      localStorage.setItem(
        'token',
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        'user',
        JSON.stringify(
          res.data.user
        )
      );

      toast.success(
        'Login Successful'
      );

      navigate('/');
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          'Login Failed'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={
          handleLogin
        }
        className="bg-white p-8 rounded-lg shadow-md w-[350px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-center mt-4 text-sm">
          Don't have an
          account?{' '}

          <Link
            to="/register"
            className="text-blue-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;