import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { IShop } from '../vite-env';
// import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

import { Send } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToMarketplace = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  // Loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/explore`);
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
      } finally {
        setLoading(false);
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
        Explore Marketplace
      </h1>
      <p className='px-4 md:px-0 line-clamp-2 max-md:line-clamp-3 text-accent max-w-[90%] md:max-w-[500px]'>
        Your one-stop hub for exploring the best marketplaces: Where ideas and
        opportunities collide!
      </p>

      <button
        onClick={scrollToMarketplace}
        className='bg-black z-10  text-white px-6 py-2 rounded-xl mt-5'
      >
        Scroll to Explore
      </button>

      {/* check for shops */}
      {shops.length === 0 ? (
        <div
          ref={sectionRef}
          className='flex w-full items-center flex-col text-center  text-accent mt-20 h-96 justify-center'
        >
          <h1>There are no shops currently.</h1>
          <Link to='/register-marketplace'>
            <p>
              Be the first one to
              <span className='text-primary hover:underline'>
                {' '}
                register{' '}
              </span>{' '}
              your shop on Conexus.
            </p>
          </Link>
        </div>
      ) : null}

      <div
        className='max-w-[1320px] mt-20 flex flex-col w-full my-10'
        ref={sectionRef}
      >
        <h2 className=' text-2xl text-left py-4 '></h2>
        <div className='grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] '>
          {shops.map((shop) => (
            <div key={shop._id} className='border-r-red-200 relative'>
              <img src={shop.shopImageURL} alt='' />
              <div className='absolute top-0 bg-black opacity-30 w-full h-full'></div>
              <div className='absolute  top-0 z-10 flex flex-col items-center justify-evenly w-full h-full  text-white p-5'>
                <div>
                  {' '}
                  <h2 className='text-4xl'>{shop.shopName}</h2>
                  <Link to={`/profile/${shop?.owner?._id}`}>
                    {' '}
                    <p>{shop.owner?.userName}</p>
                  </Link>{' '}
                </div>
                <Link to={`/marketplace/${shop._id}`}>
                  {' '}
                  <Send className='border-2 hover:bg-white hover:text-black cursor-pointer rounded-full font-thin p-3 w-10 h-10 transition-all ease-in-out ' />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

{
  /* <div
  ref={sectionRef}
  className='grid mt-96 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-4  '
>
  {shops.map((shop) => {
    return (
      <Link to={`/marketplace/${shop._id}`}>
        <div
          className='w-[300px] group/card text-text hover:text-text transition-all ease-in border-2 border-secondary hover:border-primary relative bg-cover bg-center rounded-xl '
          style={{
            backgroundImage: `url(${shop.shopImageURL})`,
          }}
        >
          <div className='absolute inset-0 bg-white bg-opacity-80 rounded-xl '></div>

          <div
            className={cn(
              ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in'
            )}
          >
            <div className='text content'>
              <h1 className='font-bold text-xl md:text-2xl  relative z-10'></h1>
              <p className=' text-sm  relative z-10 mb-4'></p>
            </div>

            <div className='flex flex-row items-center space-x-4 z-10'>
              <div className='flex flex-col'>
                <p className='font-bold text-lg   relative z-10'>
                  {' '}
                  {shop.shopName}
                </p>
                <p className='text-sm text-accent'>{shop.location}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  })}
</div>; */
}
