import React, { useState, useEffect } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';

import axios from 'axios';
import MovingGradient from '../components/ui/moving-gradient';
import { BadgeAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser, setToken } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const BACKEND_URL = import.meta.env.VITE_SERVER_URL

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //login information

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // For smooth scrolling
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill all the fields');
      setError(true);
      scrollToTop();
      return;
    }

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const resetForm = () => {
      setEmail('');
      setPassword('');
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setMessage(response.data.message);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      setSuccess(true);
      resetForm();
      scrollToTop();
    } catch (err) {
      console.error(err);
      setMessage('Login Failed! Please try again');
      setError(true);
      scrollToTop();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate('/hub');
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error, success, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen px-3 mb-10  bg-background w-full flex items-center flex-col '>
      {success || error ? (
        <MovingGradient className='rounded-xl shadow-md mb-4 shake fixed top-10'>
          <div className='w-64 p-4 flex items-center flex-col '>
            <h4 className='text-md mb-2 flex flex-row items-center  gap-2 font-bold text-text'>
              <span>Conexus Alert!</span>
              <BadgeAlert />
            </h4>
            <p className='break-words text-sm text-black/80 text-center'>
              {message}
            </p>
          </div>
        </MovingGradient>
      ) : null}

      <div className='max-w-lg w-full mx-auto md:rounded-2xl p-6 md:p-8 shadow-input bg-background rounded-xl'>
        <h2 className='font-bold text-2xl text-text dark:text-neutral-200 mb-4'>
          Login to Conexus
        </h2>
        <p className='text-sm text-text dark:text-neutral-200 mb-6'>
          One step away to access your dashboard.
        </p>

        <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

        <form onSubmit={handleSubmit} className='space-y-6'>
          <section>
            <h3 className='font-semibold text-lg text-text'>
              Login Credentials
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='email'>Your Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your email address'
                  type='email'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Your Password'
                  type='password'
                />
              </LabelInputContainer>
            </div>
          </section>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          {/* Register Button */}
          <div className='relative w-full'>
            <button
              type='submit'
              className='bg-black px-5 py-3 text-white rounded-sm hover:opacity-[0.7] tranimate duration-[0.3s] w-full'
            >
              Login
            </button>
          </div>

          <Link to='/signup'>
            <div className='text-center mt-4 text-sm text-text dark:text-neutral-200'>
              <p>
                New to Conexus? Well that's great,{' '}
                <span className='text-accent dark:text-neutral-200 cursor-pointer underline'>
                  Register
                </span>
              </p>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

// Reusable Container Component for Form Inputs
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default Login;
