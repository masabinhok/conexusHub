import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const Hero = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className='w-screen h-fit   relative px-5  flex flex-col items-center text-center md:px-10'>
      <h1 className=' mt-10 text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[60px] lg:leading-[72px] antialiased tracking-tight'>
        Discover. Connect. Thrive
      </h1>
      <p className='px-4 md:px-0 line-clamp-2 max-md:line-clamp-3 text-accent max-w-[90%] md:max-w-[500px]'>
        Join a community where ideas meet opportunity. Let’s build connections
        that inspire growth and success.
      </p>

      <Link to={user ? '/hub' : '/login'}>
        <button className='bg-black z-10  text-white px-6 py-2 rounded-xl mt-5'>
          Get Started
        </button>
      </Link>

      <div className='mt-20 mb-16 flex max-md:flex-col   '>
        <div className='relative w-80 h-48 rounded-lg shadow-lg overflow-hidden transform skew-y-12 max-md:-skew-y-12 '></div>
        <div className=' relative w-80 h-48 rounded-lg shadow-lg overflow-hidden transform transition max-md:-skew-y-12 duration-500 translate-y-8 max-md:translate-y-0 '></div>
        <div className='relative w-80 h-48 rounded-lg shadow-lg overflow-hidden transform transition max-md:-skew-y-12 duration-500 translate-y-8 max-md:translate-y-0 '></div>
        <div className='relative w-80 h-48 rounded-lg shadow-lg overflow-hidden transform -skew-y-12 max-md:-skew-y-12 transition duration-500 '></div>
      </div>
    </div>
  );
};

export default Hero;
