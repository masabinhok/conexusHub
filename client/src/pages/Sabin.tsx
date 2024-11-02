import { sabin, twitter, linkedin, github, rdr2 } from '../assets';
import { Link } from 'react-router-dom';
import Bento from './Bento';
import { Download } from 'lucide-react';

const Sabin = () => {
  return (
    <main className='max-w-[1320px] mb-10 px-10 w-full'>
      <section className='flex flex-col w-full relative'>
        <section className='w-full flex gap-3 h-[240px]'>
          <div className='flex-1 shadow-sm shadow-shadow w-full h-full bg-zinc-900'>
            <h2 className='max-lg:text-2xl text-5xl p-10   font-semibold text-white font-kbstick'>
              What I code is ART ! @ # $ % ^ & * ( ) _ - + =: ; " ' ' " , . / {}{' '}
              [ ]
            </h2>
          </div>
          <div className='flex-1 flex flex-col  shadow-sm shadow-shadow w-full h-full'>
            <p className='text-sm text-accent p-2 '>
              {' '}
              <span className='text-black font-semibold'> Listening to: </span>
              <span>DIE FOR YOU </span>
              <span className='italic text-xs'>The Weekend</span>
            </p>
            <p className='text-sm text-accent p-2 '>
              <span className='text-black font-semibold'>Playing: </span>{' '}
              <img className='w-36 h-auto' src={rdr2} alt='' />
            </p>
            <p className='text-sm text-accent p-2 '>
              <span className='text-black font-semibold'>Watching: </span>{' '}
              <Link
                to='https://cineb.rs/tv/watch-from-free-77455'
                target='blank'
              >
                <span className='hover:underline '>FROM</span>
              </Link>
            </p>
            <div className='flex items-center gap-3 p-2'>
              <p className='text-sm font-semibold '> Socials: </p>
              <Link target='_blank' to='https://github.com/masabinhok'>
                {' '}
                <img
                  className='w-4 h-4 hover:filter hover:opacity-70 tranimate '
                  src={github}
                  alt=''
                />
              </Link>
              <Link target='_blank' to='https://x.com/masabinhok'>
                {' '}
                <img
                  className='w-4 h-4 hover:filter hover:opacity-70 tranimate '
                  src={twitter}
                  alt=''
                />
              </Link>
              <Link target='_blank' to='https://linkedin.com/in/sabinshresthaa'>
                {' '}
                <img
                  className='w-4 h-4 hover:filter hover:opacity-70 tranimate'
                  src={linkedin}
                  alt=''
                />
              </Link>
            </div>
          </div>
        </section>
        <img
          className='w-36 absolute left-10 top-[150px] border-4 border-gray-200 h-36 rounded-full '
          src={sabin}
          alt='user'
        />
      </section>
      <section className='flex max-md:flex-col justify-between w-full relative p-10 rounded-br-xl rounded-bl-xl   shadow-sm shadow-shadow'>
        <div className='mt-10 max-w-[300px]'>
          <h2 className='font-semibold'>Sabin Shrestha</h2>

          <p className='text-sm text-accent'>
            <span className='italic'>19</span>, Computer Engineering
            Undergraduate
          </p>
          <p className='text-sm underline cursor-pointer hover:text-primary tranimate'>
            <a href='mailto:shrestha.sabin.er@gmail.com?subject=Hello%20from%20your%20website&body=I%20wanted%20to%20reach%20out%20to%20you.'>
              sabin.shrestha.er@gmail.com
            </a>
          </p>
        </div>
        <div className='mt-10 text-accent text-sm max-w-[240px]'>
          <p>
            {' '}
            <span className='font-semibold '>Skills: </span>
            FullStack Web development | MERN | NEXTjs |
          </p>
          <p className='text-sm  flex items-center gap-2 cursor-pointer hover:underline group font-semibold'>
            Resume
            <span className='underline group-hover:text-primary flex items-center gap-1 '>
              <Download className='w-4 ' />
            </span>
          </p>
        </div>
      </section>
      <section className='flex flex-col w-full relative'></section>
      <main className=' flex w-full h-screen mt-3'>
        <Bento />
      </main>
    </main>
  );
};

export default Sabin;
