import { useSelector } from 'react-redux';
import { logo } from '../assets';
import { RootState } from '../redux/store';


const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <nav className='bg-white p-5 flex items-center justify-between '>
        <div className='flex gap-5 items-center '>
          <img src={logo} alt='logo' />
          <h2>Explore</h2>
          <h2>Register</h2>
          <h2>StarOnGitHub</h2>
        </div>
        <div className=''>
          {user ? (
            <div className='flex items-center gap-5'>
              <h2>{user.userName}</h2>
              <button>Sign out</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
