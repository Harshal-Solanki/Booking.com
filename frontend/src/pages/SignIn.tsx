import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../Contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as apiClient from '../api-clients';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Successfully Logged In', type: 'SUCCESS' });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
      console.log('User Successfully Signed In');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
      console.log('Something Went Wrong');
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col items-center justify-center  py-12 bg-gray-50">
      <div className="bg-white shadow-md px-8 pt-6 pb-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-black">Email</label>
            <input
              id="email"
              type="email"
              className={`input-field border-2 border-black-600 ${errors.email ? 'input-error' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-black">Password</label>
            <input
              id="password"
              type="password"
              className=
              {`input-field border-2 border-gray-200 ${errors.password ? 'input-error' : ''}`}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <button type="submit" className="btn-primary border-2 bg-blue-600 text-white font-bold py-1">Sign In</button>
        </form>
        <p className="mt-4 text-sm">Not Registered? <Link to="/register" className="text-blue-500 hover:underline">Create an account here</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
