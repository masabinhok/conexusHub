import { Link } from 'react-router-dom';

const Bento = () => {
  return (
    <section className='flex-[1] flex rounded-xl gap-3 '>
      <div className='flex-[2] flex flex-col w-full gap-3'>
        <Link
          className='shadow-shadow shadow-sm rounded-xl  flex-[1]'
          to='http://localhost:5173'
        >
          <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
            SABIN SHRESTHA
          </div>
        </Link>

        <div className='flex flex-[2] gap-3 '>
          <div className='flex-[1] flex flex-col  gap-3'>
            <Link
              to='http://localhost:5173'
              className='flex-[1] shadow-shadow shadow-sm rounded-xl '
            >
              <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
                EDUCATION
              </div>
            </Link>
            <Link
              className='flex-[1] shadow-shadow shadow-sm rounded-xl '
              to='http://localhost:5173'
            >
              <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
                SOCIALS
              </div>
            </Link>
          </div>

          <Link
            to='http://localhost:5173'
            className='flex-[1] shadow-shadow shadow-sm rounded-xl '
          >
            <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
              PROJECTS
            </div>
          </Link>
        </div>
      </div>
      <div className='flex-[1] gap-3 flex flex-col  w-full'>
        <Link
          className='flex-[2] shadow-shadow shadow-sm rounded-xl  '
          to='http://localhost:5173'
        >
          {' '}
          <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
            BLOG
          </div>
        </Link>
        <Link
          className='flex-[1] shadow-shadow shadow-sm rounded-xl '
          to='http://localhost:5173'
        >
          {' '}
          <div className='font-kbstick flex items-center justify-center h-full w-full text-4xl text-center max-lg:text-2xl max-md:text-xl max-sm:text-sm '>
            EXPERIENCE
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Bento;
