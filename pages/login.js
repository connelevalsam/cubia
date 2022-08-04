import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const eventSubmit = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleRegister = () => {};

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="m-5">
        <div className="container w-full p-6 m-auto bg-white border-t border-amber-600 rounded shadow-lg shadow-amber-700/50 lg:max-w-md">
          <h1 className="text-3xl font-semibold text-center text-amber-600">
            CUBIA
          </h1>

          <form className="mt-6" onSubmit={handleSubmit(eventSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-800">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Please enter E-mail',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid E-mail',
                  },
                })}
                type="email"
                id="email"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Please enter password',
                    minLength: {
                      value: 6,
                      message: 'Password must be more than 6 characters',
                    },
                  })}
                  id="password"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <a href="#" className="text-xs text-gray-600 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-amber-600 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-600">
                  Login
                </button>
              </div>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            {"Don't have an account?"}{' '}
            <a href="#" className="font-medium text-amber-600 hover:underline">
              Sign up
            </a>
          </p>
          <p className="mt-8 text-center">
            <Link href="/">
              <a className="font-medium text-amber-600 hover:underline">
                Back to Shopping
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
