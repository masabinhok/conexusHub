import { Link } from 'react-router-dom';

const options = [
  {
    _id: '1',
    type: 'Explore Marketplace',
    link: '/explore-marketplace',
  },
  {
    _id: '2',
    type: 'Register your own Marketplace',
    link: '/register-marketplace',
  },
  {
    _id: '3',
    type: 'Explore Services',
    link: '/explore-service',
  },
  {
    _id: '4',
    type: 'Register your own Service',
    link: '/register-service',
  },
];

const Hub = () => {
  return (
    <div className='w-screen h-fit   relative px-5  flex flex-col items-center text-center md:px-10'>
      <h1 className=' mt-10 text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-[60px] lg:leading-[72px] antialiased tracking-tight'>
        Ultimate Conexus Hub
      </h1>
      <p className='px-4 md:px-0 line-clamp-2 max-md:line-clamp-3 text-accent max-w-[90%] md:max-w-[500px]'>
        Explore and register: Your gateway to a world of services and
        marketplaces!
      </p>

      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4  my-20 '>
        {options.map((option) => {
          return (
            <Link to={`${option.link}`}>
              <div
                className='shadow-sm px-6 py-2 rounded-lg
              border-2 border-accent hover:border-black
              hover:translate-x-0.5 active:translate-y-0.5 tranimate'
              >
                {option.type}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Hub;
