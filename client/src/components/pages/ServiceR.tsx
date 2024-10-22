import React, { useState, useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import GetStartedButton from '../ui/get-started-button';
import axios from 'axios';
import MovingGradient from '../ui/moving-gradient';
import { BadgeAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Authorization from '../Authorization';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../Loader';
import { Textarea } from '../ui/textarea';

const BACKEND_URL = 'http://localhost:3000';

const MarketR = () => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [serviceImageURL, setServiceImageURL] = useState<File | null>(null);
  const [type, setType] = useState('');
  const [hourlyPrice, setHourlyPrice] = useState('');
  const serviceImageRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/service/register`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Response data:', response.data);
        setMessage(response.data.message);
        setError(true);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchData();
    }
    if (!token) {
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1000);
    }
  }, [token, navigate]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !serviceTitle ||
      !location ||
      !type ||
      !hourlyPrice ||
      !serviceImageURL
    ) {
      setMessage('Please fill all the fields, including an image.');
      setError(true);
      scrollToTop();
      return;
    }

    const formData = new FormData();
    formData.append('serviceTitle', serviceTitle);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('hourlyPrice', hourlyPrice);
    formData.append('serviceProvider', user?._id || '');

    // Append the image file (check if it's not null)
    if (serviceImageURL) {
      formData.append('serviceImageURL', serviceImageURL);
    }

    // Reset form fields after submission
    const resetForm = () => {
      setServiceTitle('');
      setLocation('');
      setDescription('');
      setType('');
      setHourlyPrice('');
      setServiceImageURL(null); // Reset file input
      if (serviceImageRef.current) serviceImageRef.current.value = ''; // Reset the file input in DOM
    };

    try {
      setLoading(true);

      // Send the form data to the backend
      const response = await axios.post(
        `${BACKEND_URL}/api/service/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Ensure 'Bearer' is included
          },
        }
      );

      // Handle success
      setLoading(false);
      setMessage(response.data.message || 'Service registered successfully!');
      setSuccess(true);
      resetForm();
      scrollToTop();
    } catch (error) {
      // Handle error case
      console.error('Error registering service:', error);
      setLoading(false);
      setMessage('Registration failed! Please try again.');
      setError(true);
      scrollToTop();
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate('/explore-service');
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
    <div className='min-h-screen p-10 pt-0 bg-background text-text flex items-center relative flex-col'>
      <Authorization />
      {success || error ? (
        <MovingGradient className='rounded-xl shadow-md mb-4 shake fixed top-10 '>
          <div className='w-64 p-4 flex items-center flex-col'>
            <h4 className='text-md mb-2 flex flex-row items-center gap-2 font-bold text-text'>
              <span>Conexus Alert!</span>
              <BadgeAlert />
            </h4>
            <p className='break-words text-sm text-text/80 text-center'>
              {message}
            </p>
          </div>
        </MovingGradient>
      ) : null}

      <div className='max-w-lg w-full mx-auto md:rounded-2xl p-6 md:p-8 shadow-input bg-background rounded-xl'>
        <h2 className='font-bold text-2xl text-text dark:text-neutral-200 mb-4'>
          Register Your Service
        </h2>
        <p className='text-text text-sm max-w-sm mb-6 dark:text-neutral-300'>
          List your service on Conexus and connect with a world of customers
          eager to benefit from your skills.
        </p>
        <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Marketplace Details */}
          <section>
            <h3 className='font-semibold text-lg text-text'>
              Service Information
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='serviceTitle'>Service Title </Label>
                <Input
                  id='serviceTitle'
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  name='serviceTitle'
                  placeholder='What do you call your service?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='description'>Description </Label>
                <Textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='border-2 rounded-xl'
                  placeholder='Tell us about the service you provide targeting your client.'
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  name='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder='Where is your service available for?'
                  type='text'
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor='type'>Type</Label>
                <Input
                  id='type'
                  name='type'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder='eg. tutor'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='hourlyPrice'>Hourly Price</Label>
                <Input
                  id='hourlyPrice'
                  name='hourlyPrice'
                  value={hourlyPrice}
                  onChange={(e) => setHourlyPrice(e.target.value)}
                  placeholder='Rs. 0.00 /hr'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='serviceImageURL'>Representative Image</Label>
                <Input
                  id='serviceImageURL'
                  ref={serviceImageRef}
                  name='serviceImageURL'
                  onChange={(e) => {
                    setServiceImageURL(
                      e.target.files ? e.target.files[0] : null
                    );
                  }}
                  type='file'
                />
              </LabelInputContainer>
            </div>
          </section>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          {/* Register Button */}
          <div className='relative w-full'>
            <GetStartedButton
              text={'Register'}
              className='w-full e bg-secondary hover:bg-primary absolute'
            />
          </div>
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

export default MarketR;
