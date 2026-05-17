import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import API from '../services/api';

const Register = () => {
  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('sales');

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post(
        '/auth/register',
        {
          name,
          email,
          password,
          role,
        }
      );

      toast.success(
        'Registration Successful'
      );

      setName('');
      setEmail('');
      setPassword('');
      setRole('sales');
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          'Registration Failed'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={
          handleRegister
        }
        className="bg-white p-8 rounded-lg shadow-md w-[350px]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

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

        {/* ROLE SELECT */}
        <select
          className="w-full border p-3 rounded mb-4"
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
        >
          <option value="sales">
            Sales User
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm">
          Already have an
          account?{' '}

          <Link
            to="/login"
            className="text-blue-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;