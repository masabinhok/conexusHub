import { useDispatch, useSelector } from 'react-redux';
import { logo } from '../assets';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetState } from '../redux/authSlice';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/login');
  };

  return (
    <>
      <nav className='bg-white mb-10 p-5 h-[100px] flex items-center justify-between  z-10 '>
        <div className='flex max-lg:w-full max-lg:hidden gap-10 items-center '>
          <Link to='/'>
            {' '}
            <img className='max-md:w-24' src={logo} alt='logo' />
          </Link>

          <div
            onMouseEnter={() => setActiveNav('explore')}
            onMouseLeave={() => setActiveNav(null)}
            className='flex-between flex-col hover:px-10 transition-all ease-in-out duration-[1s]'
          >
            <button className=''>Explore</button>
            {activeNav === 'explore' ? (
              <div className='nav-elem'>
                <div className='flex flex-col gap-3 text-sm'>
                  <Link to='/explore-marketplace'>
                    <h2 className='hover:text-accent'>Explore Marketplace</h2>
                  </Link>
                  <Link to='/explore-service'>
                    <h2 className='hover:text-accent'>Explore Services</h2>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setActiveNav('register')}
            onMouseLeave={() => setActiveNav(null)}
            className='flex-between flex-col hover:px-10 transition-all ease-in-out duration-[1s]'
          >
            <button className=''>Register</button>
            {activeNav === 'register' ? (
              <div className='nav-elem'>
                <div className='flex flex-col gap-3 text-sm'>
                  <Link to='/register-marketplace'>
                    <h2 className='hover:text-accent'>Register Marketplace</h2>
                  </Link>
                  <Link to='/register-service'>
                    <h2 className='hover:text-accent'>Register Services</h2>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setActiveNav('about')}
            onMouseLeave={() => setActiveNav(null)}
            className='flex-between flex-col hover:px-10 transition-all ease-in-out duration-[1s]'
          >
            <button className=''>About</button>
            {activeNav === 'about' ? (
              <div className='nav-elem'>
                <div className='flex flex-col gap-3 text-sm'>
                  <Link to='/about'>
                    <h2 className='hover:text-accent'>About Conexus</h2>
                  </Link>
                  <a href='https://www.sabinshrestha69.com.np' target='_blank'>
                    <h2 className='hover:text-accent'>About Creator</h2>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className='max-lg:hidden flex gap-10 items-center'>
          <a
            target='_blank'
            href='https://www.github.com/masabinhok/conexusHub'
          >
            <button className='hover:text-yellow-500 tranimate duration-[0.3s] font-bold  hover:scale-105 transition-all '>
              StarUsOnGitHub
            </button>
          </a>

          {user ? (
            <div className='flex items-center gap-5'>
              <Link to='/profile'>
                {' '}
                <h2 className='hover:text-accent tranimate duration-[0.3s]'>
                  {user.userName}
                </h2>
              </Link>{' '}
              <button
                onClick={handleLogout}
                className='bg-red-500 px-5 py-1 text-white rounded-sm hover:opacity-[0.5] tranimate duration-[0.3s] '
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-5'>
              <Link to='/signup'>
                {' '}
                <button className='hover:text-accent tranimate duration-[0.3s] '>
                  Signup
                </button>
              </Link>{' '}
              <Link to='/login'>
                {' '}
                <button className='bg-black px-5 py-1 text-white rounded-sm hover:opacity-[0.5] tranimate duration-[0.3s] '>
                  Login
                </button>
              </Link>{' '}
            </div>
          )}
        </div>
        <Menu className='cursor-pointer' />
        <div className='hidden max-lg:block cursor-pointer w-full '>
          <div className='flex-between w-full'>
            <Link to='/'>
              {' '}
              <img className='max-md:w-40' src={logo} alt='logo' />
            </Link>
            <div> </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
