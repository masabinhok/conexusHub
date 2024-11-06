import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IService } from '../vite-env';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Service = () => {
  const { id } = useParams();
  const [service, setService] = useState<IService | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/service/${id}`);
      setService(response.data.service);
    } catch (error) {
      console.log(error);
      setError('Failed to load service data.');
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  if (error) {
    return <p className='error-message'>{error}</p>;
  }

  return (
    <main className='max-w-[1320px] w-full flex-col px-10 mb-32'>
      <div className=' px-20 py-10 flex-between flex-col w-full'>
        <div className='text-center max-w-[600px] flex gap-5'>
          <div className='flex-1 flex flex-col'>
            <h2 className='text-7xl font-bold mb-10 uppercase'>
              {service?.serviceTitle || 'Service Title'}
            </h2>
            <div className=' flex-between gap-4'>
              {service?.serviceProvider?.userImageURL && (
                <img
                  className='rounded-full w-20 h-20'
                  src={service.serviceProvider.userImageURL}
                  alt={service.serviceProvider.userName || 'Provider'}
                />
              )}
              <div>
                <h2 className='text-lg flex'>
                  {service?.serviceProvider?.userName || 'Provider Name'}
                </h2>
                <h2 className='text-sm'>
                  {service?.serviceProvider?.address || 'Provider Address'}
                </h2>
              </div>
            </div>
            <div className='flex flex-col w-full text-left'>
              <button className='px-6 py-2 rounded-xl font-semibold bg-white text-black shadow-shadow shadow-sm my-5'>
                Hire me
              </button>
            </div>
            <div className='flex-1 text-left'>
              <h2 className='font-bold flex justify-between w-full items-center py-2'>
                {service?.type}
                <span> Rs.{service?.hourlyPrice}/hour</span>
              </h2>
              <p className='text-accent  text-sm'>
                {service?.description || 'Service Description'}
              </p>
            </div>
          </div>
        </div>
        <div className='flex max-md:flex-col max-w-[1320px] max-h-fit mt-5'>
          {service?.serviceImages?.map((image, index) => (
            <img
              className='w-[600px] max-md:max-w-[400px] '
              key={index}
              src={image}
              alt={`Service Image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className='max-w-[1320px] flex-between flex-col'>
        <h2 className='font-bold text-2xl'>Explore other services</h2>
        <div>{}</div>
      </div>
    </main>
  );
};

export default Service;
