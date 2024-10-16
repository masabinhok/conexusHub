import { FocusCards } from '../ui/focus-cards';
import { shop01, shop02, service01, service02 } from '../../assets';
import Authorization from '../Authorization';
const cards = [
  {
    title: 'Explore Marketplace',
    src: shop01,
    link: '/marketplace',
  },
  {
    title: 'Register your own Marketplace',
    src: shop02,
    link: '/register-marketplace',
  },
  {
    title: 'Explore Services',
    src: service01,
    link: '/services',
  },
  {
    title: 'Register your own Service',
    src: service02,
    link: '/register-service',
  },
];

const Hub = () => {
  return (
    <div className='bg-black text-purple-500 min-h-screen flex flex-col items-center justify-center '>
      <Authorization />
      <FocusCards cards={cards} />
    </div>
  );
};

export default Hub;
