import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { IService } from '../vite-env';

const BACKEND_URL = 'http://localhost:3000';

const ServiceE = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<IService[] | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToService = () => {
    sectionRef?.current?.scrollIntoView();
  };

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
    <div className='w-screen h-fit   relative px-5  flex flex-col items-center text-center md:px-10'>
      <h1 className=' mt-10 text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[60px] lg:leading-[72px] antialiased tracking-tight'>
        Explore Services
      </h1>
      <p className='px-4 md:px-0 line-clamp-2 max-md:line-clamp-3 text-accent max-w-[90%] md:max-w-[500px]'>
        Your one-stop hub for exploring the best services: Where ideas and
        opportunities collide!
      </p>

      <button
        onClick={scrollToService}
        className='bg-black z-10  text-white px-6 py-2 rounded-xl mt-5'
      >
        Scroll to Explore
      </button>

      {/* check for shops */}
      {services?.length === 0 ? (
        <div
          ref={sectionRef}
          className='flex w-full items-center flex-col text-center  text-accent mt-20 h-96 justify-center'
        >
          <h1>There are no services currently.</h1>
          <Link to='/register-marketplace'>
            <p>
              Be the first one to
              <span className='text-primary hover:underline'>
                {' '}
                register{' '}
              </span>{' '}
              your service on Conexus.
            </p>
          </Link>
        </div>
      ) : null}

      <div
        ref={sectionRef}
        className='max-w-[1080px]  grid w-full grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5 my-32'
      >
        {services?.map((service) => (
          <div className='flex rounded-xl shadow-shadow shadow-sm flex-col p-4'>
            <div className='flex justify-between items-center'>
              {' '}
              <h2 className='text-left text-lg '>
                {service.serviceTitle}{' '}
                <span className='text-accent text-xs'> by </span>{' '}
                <span className='text-base'>
                  <Link to={`/profile/${service.serviceProvider._id}`}>
                    {' '}
                    {service?.serviceProvider?.userName}
                  </Link>{' '}
                </span>
              </h2>
              <p className='text-accent text-sm'>
                Rs. <span className='text-text'>{service?.hourlyPrice}</span>/hr
              </p>
            </div>

            <p className='text-accent text-left text-sm mt-4 line-clamp-3'>
              {service.description}
            </p>
            <Link to={`/service/${service?._id}`}>
              {' '}
              <div className='relative mt-3 '>
                <img
                  className='  rounded-br-md rounded-bl-md'
                  src={service.serviceImages[0]}
                  alt=''
                />
                <p className='absolute rounded-br-md rounded-bl-md text-white bg-black w-full hover:opacity-50 opacity-0 h-full tranimate   top-0 flex-between'>
                  Interested?
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceE;
