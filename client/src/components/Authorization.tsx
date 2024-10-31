import { Home, Component, User, ShoppingCart } from 'lucide-react';
import AnimatedDock from './ui/animated-dock';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Authorization() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className='w-full max- flex justify-center items-center '>
      <div className='relative h-40 flex  w-full items-center justify-center'>
        <AnimatedDock
          items={[
            {
              href: '/',
              icon: <Home />,
              title: 'Home',
            },
            {
              href: '/hub',
              icon: <Component />,
              title: 'Hub',
            },
            {
              href: `/cart/${user?._id}`,
              icon: <ShoppingCart />,
              title: 'Cart',
            },
            {
              href: '/profile',
              icon: <User />,
              title: 'Profile',
            },
          ]}
          largeClassName='max-w-lg'
        />
      </div>
    </div>
  );
}
