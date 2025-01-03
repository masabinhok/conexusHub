import { Home } from 'lucide-react';
import { banner } from '../assets';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IUser } from '../vite-env';

const BACKEND_URL = import.meta.env.VITE_SERVER_URL

const UserProfile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      const response = await axios.get(`${BACKEND_URL}/api/user/profile/${id}`);
      setProfileUser(response.data.user);
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <main className='max-w-[1320px] mb-10 px-10 w-full'>
      <section className='flex flex-col w-full relative'>
        <img className='h-[250px]  ' src={banner} alt='banner' />
        <img
          className='w-36 absolute left-10 top-[150px] border-4 border-white h-36 rounded-full '
          src={profileUser?.userImageURL}
          alt='user'
        />
      </section>
      <section className='flex justify-between w-full relative p-10 rounded-br-xl rounded-bl-xl   shadow-sm shadow-shadow'>
        <div className='mt-10'>
          <h2 className='font-semibold'>{profileUser?.userName}</h2>
          <p className='flex items-center gap-3 text-accent text-sm'>
            <Home className='w-4' /> {profileUser?.address}
          </p>
          <p className='text-sm'>CEO of Upstart, Co-founder of Conexus</p>
        </div>
        <div className='mt-10 text-accent text-sm max-w-[240px]'>
          <p>
            {' '}
            <span className='font-semibold '>Skills: </span>
            Data Analysis, Project Management, CRM systems
          </p>
        </div>
      </section>
      <div className='flex gap-10 w-full'>
        {' '}
        <section className='shadow-shadow w-full shadow-sm mt-10 rounded-xl p-5'>
          <h2 className='font-semibold text-xl'> Marketplaces I own</h2>
          <div className='flex gap-4'>
            {' '}
            <p className='shadow-shadow shadow-sm px-4 py-2 rounded-xl  mt-4'>
              AbigailDiaper
            </p>
            <p className='shadow-shadow shadow-sm px-4 py-2 rounded-xl  mt-4'>
              AbigailKirana
            </p>
          </div>
        </section>
        <section className='shadow-shadow w-full shadow-sm mt-10 rounded-xl p-5'>
          <h2 className='font-semibold text-xl'>Services I provide</h2>
          <div className='flex gap-4'>
            {' '}
            <p className='shadow-shadow shadow-sm px-4 py-2 rounded-xl  mt-4'>
              Upstart
            </p>
            <p className='shadow-shadow shadow-sm px-4 py-2 rounded-xl  mt-4'>
              Conexus
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UserProfile;
