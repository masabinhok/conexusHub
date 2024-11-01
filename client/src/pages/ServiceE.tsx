import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { IService } from '../vite-env';
import { def_user } from '../assets';

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
