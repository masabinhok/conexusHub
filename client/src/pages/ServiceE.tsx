import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { IService } from '../vite-env';
import { def_user } from '../assets';

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

      <div className='max-w-[1080px] w-full gap-10 p-10 flex flex-col items-center justify-center'>
        {services?.map((service) => (
          <div
            className='w-full flex flex-col  shadow-lg p-3 shadow-shadow hover:scale-[1.01] transition-all ease-in-out'
            key={service._id}
          >
            <div className='flex p-2  items-center  gap-2'>
              {' '}
              <img
                className='w-10 rounded-full cover h-10 '
                src={service.serviceProvider?.userImageURL || def_user}
                alt=''
              />
              <h2 className='font-bold '>
                {service.serviceProvider
                  ? service.serviceProvider.userName
                  : 'Dummy User'}
                <p className='font-normal text-accent text-[12px] leading-1 mt-[-5px]'>
                  {service.type}
                </p>
              </h2>
            </div>
            <div className='p-2 flex items-center gap-1'>
              <h2 className='font-bold inline-flex items-center  gap-2 text-2xl'>
                {service.serviceTitle}{' '}
              </h2>
            </div>
            <p className='px-2'>{service.description}</p>
            <button className='bg-secondary hover:bg-primary p-3 m-2 mt-4 transition-all ease-in hover:text-white'>
              Are you interested ? <span className=''> </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceE;
