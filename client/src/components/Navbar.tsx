import { useSelector } from 'react-redux';
import { logo } from '../assets';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { resetState } from '../redux/authSlice';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [activeNav, setActiveNav] = useState<string | null>(null);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   dispatch(resetState());
  //   navigate('/login');
  // };

  const AuthButtons = () => (
    <div className='flex items-center gap-5'>
      {user ? (
        <>
          <Link to='/profile'>
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
    <nav className='bg-white mb-10 p-5 h-[100px] flex items-center justify-between z-10'>
      <div className='flex max-lg:w-full max-lg:hidden gap-10 items-center'>
        <Link to='/'>
          <img className='max-md:w-24' src={logo} alt='logo' />
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
                      <a
                        href='https://www.sabinshrestha69.com.np'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <h2 className='hover:text-accent'>About Creator</h2>
                      </a>
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

      <Menu className='cursor-pointer max-lg:hidden top-8 left-8' />
      <div className='hidden max-lg:block cursor-pointer w-full'>
        <div className='flex justify-between w-full'>
          <div className='flex items-center'>
            <Menu className='cursor-pointer' />
            <Link to='/'>
              <img className='max-md:w-40' src={logo} alt='logo' />
            </Link>
          </div>
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
