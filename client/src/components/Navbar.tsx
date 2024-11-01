import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
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

  const AuthButtons = () => (
    <div className='flex items-center gap-5'>
      {user ? (
        <>
          <Link to={`/profile/${user?._id}`}>
            <h2 className='hover:text-accent tranimate duration-[0.3s]'>
              {user.userName}
            </h2>
          </Link>
          {/* <button
            onClick={handleLogout}
            className='bg-red-500 px-5 py-1 text-white rounded-sm hover:opacity-[0.5] tranimate duration-[0.3s]'
          >
            Logout
          </button> */}
        </>
      ) : (
        <>
          <Link to='/signup'>
            <button className='hover:text-accent tranimate duration-[0.3s]'>
              Signup
            </button>
          </Link>
          <Link to='/login'>
            <button className='bg-black px-5 py-1 text-white rounded-sm hover:opacity-[0.5] tranimate duration-[0.3s]'>
              Login
            </button>
          </Link>
        </>
      )}
    </div>
  );

  return (
    <nav className='bg-white mb-10  p-5 h-[80px] flex items-center justify-between z-10'>
      <div className='flex max-lg:w-full max-lg:hidden gap-10 items-center'>
        <Link to='/'>
          <p className='font-bold text-2xl px-3'>CONEXUS</p>
        </Link>
        {/* Dropdowns for Explore, Register, and About */}
        {['explore', 'register', 'about'].map((label) => (
          <div
            key={label}
            onMouseEnter={() => setActiveNav(label)}
            onMouseLeave={() => setActiveNav(null)}
            className='flex-between flex-col hover:px-10 transition-all ease-in-out duration-[1s]'
          >
            <button>{label.charAt(0).toUpperCase() + label.slice(1)}</button>
            {activeNav === label && (
              <div className='nav-elem'>
                <div className='flex flex-col gap-3 text-sm'>
                  {label === 'explore' && (
                    <>
                      <Link to='/explore-marketplace'>
                        <h2 className='hover:text-accent'>
                          Explore Marketplace
                        </h2>
                      </Link>
                      <Link to='/explore-service'>
                        <h2 className='hover:text-accent'>Explore Services</h2>
                      </Link>
                    </>
                  )}
                  {label === 'register' && (
                    <>
                      <Link to='/register-marketplace'>
                        <h2 className='hover:text-accent'>
                          Register Marketplace
                        </h2>
                      </Link>
                      <Link to='/register-service'>
                        <h2 className='hover:text-accent'>Register Services</h2>
                      </Link>
                    </>
                  )}
                  {label === 'about' && (
                    <>
                      <Link to='/about'>
                        <h2 className='hover:text-accent'>About Conexus</h2>
                      </Link>
                      <Link to='/sabinshrestha' rel='noopener noreferrer'>
                        <h2 className='hover:text-accent'>About Creator</h2>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='max-lg:hidden flex gap-10 items-center'>
        <a
          href='https://www.github.com/masabinhok/conexusHub'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='hover:text-yellow-500 tranimate duration-[0.3s] font-bold hover:scale-105 transition-all'>
            StarUsOnGitHub
          </button>
        </a>
        <AuthButtons />
      </div>

      <div
        onMouseEnter={() => setActiveNav('menu')}
        onMouseLeave={() => setActiveNav(null)}
        className='flex flex-col gap-2 relative'
      >
        <Menu className='cursor-pointer max-lg:hidden top-8 left-8' />
        {activeNav === 'menu' && user ? (
          <button
            onClick={handleLogout}
            className='hover:text-accent absolute pt-5'
          >
            Logout
          </button>
        ) : null}
      </div>

      <div className='hidden max-lg:block cursor-pointer w-full'>
        <div className='flex justify-between w-full'>
          <div className='flex items-center'>
            <Menu
              onMouseEnter={() => setActiveNav('menu')}
              onMouseLeave={() => setActiveNav(null)}
              className='cursor-pointer relative'
            />
            <Link to='/'>
              <p className='font-bold text-2xl px-3'>CONEXUS</p>
            </Link>
          </div>
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
