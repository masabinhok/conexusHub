import React, { useState, useEffect, useRef } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import axios from 'axios';
import MovingGradient from '../components/ui/moving-gradient';
import { BadgeAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loader from '../components/Loader';

const BACKEND_URL = import.meta.env.VITE_SERVER_URL

const MarketR = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/register`, {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly formatting the Bearer token
          },
        });
        console.log('Response data:', response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      // Ensure token is available before making the request
      fetchData();
    }
    if (!token) {
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1000);

      // Redirect to login page if token is not available
    }
  }, [token, navigate]);

  const [shopName, setShopName] = useState('');
  const [estd, setEstd] = useState('');
  const [location, setLocation] = useState('');
  const [shopImageURL, setShopImageURL] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [productImageURL, setProductImageURL] = useState<File | null>(null);
  const shopImageRef = useRef<HTMLInputElement | null>(null);
  const productImageRef = useRef<HTMLInputElement | null>(null);
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

    if (
      !shopName ||
      !productName ||
      !category ||
      !quantity ||
      !price ||
      !unit ||
      !shopImageURL ||
      !productImageURL
    ) {
      setMessage('Please fill all the fields');
      setError(true);
      scrollToTop();
      return;
    }

    const formData = new FormData();
    formData.append('shopName', shopName);
    formData.append('estd', estd);
    formData.append('location', location);
    formData.append('shopImageURL', shopImageURL);
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('productImageURL', productImageURL);
    formData.append('owner', user?._id || '');

    const resetForm = () => {
      setShopName('');
      setEstd('');
      setLocation('');
      setShopImageURL(null);
      setProductName('');
      setCategory('');
      setQuantity('');
      setPrice('');
      setUnit('');
      setProductImageURL(null);
      //file input value reset
      if (shopImageRef.current) shopImageRef.current.value = '';
      if (productImageRef.current) productImageRef.current.value = '';
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/shop/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        }
      );
      setLoading(false);
      setMessage(response.data.message);
      setSuccess(true);
      resetForm();
      scrollToTop();
    } catch (error) {
      console.error(error);
      setLoading(true);
      setMessage('Registration Failed! Please try again');
      setError(true);

      scrollToTop();
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate('/explore-marketplace');
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
    <div className='w-full min-h-screen p-10 pt-0 bg-background text-text flex items-center relative flex-col'>
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
          Register Your Marketplace
        </h2>
        <p className='text-text text-sm max-w-sm mb-6 dark:text-neutral-300'>
          List your items in our marketplace and connect with a world of
          customers eager to find their next favorite purchase!
        </p>
        <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Marketplace Details */}
          <section>
            <h3 className='font-semibold text-lg text-text'>
              Marketplace Information
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='shopName'>Marketplace Name</Label>
                <Input
                  id='shopName'
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  name='shopName'
                  placeholder='What do you call your marketplace?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='estd'>ESTD</Label>
                <Input
                  id='estd'
                  name='estd'
                  value={estd}
                  onChange={(e) => setEstd(e.target.value)}
                  placeholder='When was your marketplace established?'
                  type='date'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  name='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder='Where is your marketplace located?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='shopImageURL'>Representative Image</Label>
                <Input
                  id='shopImageURL'
                  ref={shopImageRef}
                  name='shopImageURL'
                  onChange={(e) => {
                    setShopImageURL(e.target.files ? e.target.files[0] : null);
                  }}
                  type='file'
                />
              </LabelInputContainer>
            </div>
          </section>

          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
          {/* Product Information */}
          <section>
            <h3 className='font-semibold text-lg text-text'>Example Product</h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='productName'>Product Name</Label>
                <Input
                  id='productName'
                  name='productName'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder='Name of your product'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='category'>Category</Label>
                <Input
                  id='category'
                  name='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder='Product category'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                  id='quantity'
                  name='quantity'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder='Available quantity'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id='price'
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Rs. 0.00'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='unit'>Unit of Measurement</Label>
                <Input
                  id='unit'
                  name='unit'
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder='Kg, Litre, etc.'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='productImageURL'>Product Image</Label>
                <Input
                  id='productImageURL'
                  ref={productImageRef}
                  onChange={(e) =>
                    setProductImageURL(e.target.files?.[0] || null)
                  } // Only one onChange handler
                  name='productImageURL'
                  type='file' // Removed value prop
                />
              </LabelInputContainer>
            </div>
          </section>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          {/* Register Button */}
          <div className='relative w-full'>
            <button
              type='submit'
              className='bg-black px-5 py-1 text-white rounded-sm hover:opacity-[0.5] tranimate duration-[0.3s]'
            >
              Register Marketplace
            </button>
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
