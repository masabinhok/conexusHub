import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { IService } from '../../vite-env';

const BACKEND_URL = 'http://localhost:3000';

const ServiceE = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<IService[] | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/service`);
        setLoading(false);
        console.log(res.data);
        setServices(res.data.services);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen bg-background text-text flex items-center relative flex-col mb-10'>
      <Authorization />
      <div className='flex flex-col mb-10 '>
        <h1 className='text-5xl font-bold text-primary text-center pb-2'>
          Explore Services
        </h1>
        <p className='text-center text-2xl text-accent'>
          Discover. Connect. Thrive – Your Marketplace, Now Digitally Yours.
        </p>
        <p className='text-accent font'></p>
      </div>

      {!services ? (
        <div className='flex w-full items-center flex-col text-center text-2xl text-accent h-96 justify-center'>
          <h1>There are no services currently.</h1>
          <p>
            Be the first one to
            <Link to='/register-service'>
              <span className='text-primary hover:underline'> register </span>{' '}
            </Link>
            your service on Conexus.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ServiceE;
