import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useDraggable } from 'react-use-draggable-scroll';

import Typography from '@/components/typography/Typography';

type MangaCardProps = {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: string;
  ticket_price: number;
};

export default function MangaCard({
  id,
  title,
  description,
  release_date,
  poster_url,
  age_rating,
  ticket_price,
}: MangaCardProps) {
  const [src, setSrc] = useState(poster_url);
  const router = useRouter();

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const handleClick = () => {
    const url = `/manga/${id}`;
    router.push(url);
  };

  return (
    <div className='flex flex-row w-full h-60 bg-base-light rounded-xl overflow-hidden'>
      <div
        className='relative w-48 h-full cursor-pointer'
        onClick={handleClick}
      >
        <Image
          src={src}
          alt='manga-cover'
          width='200'
          height='300'
          onError={() => setSrc('/images/error.jpg')}
          className='w-full h-full object-cover'
        />
        <div className='absolute w-full space-y-1 px-3 py-1.5 bottom-0 bg-teal-900 opacity-90'>
          <div className='-space-y-1 text-base-surface hover:text-teal-200'>
            <Typography variant='p' weight='bold'>
              {title}
            </Typography>
          </div>
          <div className='flex flex-row gap-3 text-base-surface'>
            <div className='flex flex-row items-center gap-1'>
              <BsFillPersonFill className='text-sm' />
              <Typography variant='c'>{age_rating}</Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <AiFillStar className='text-sm' />
              <Typography variant='c'>{release_date}</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex flex-1 flex-col text-teal-600'>
        <div className='flex-1 space-y-1.5 p-3 overflow-y-hidden hover:overflow-y-auto'>
          <Typography variant='c' className='leading-5'>
            {description}
          </Typography>
        </div>
        <div className='h-12 w-full' />

        <div
          className='absolute bottom-0 w-full h-12 flex flex-row gap-2.5 p-3 bg-base-outline overflow-x-scroll scrollbar-hide'
          {...events}
          ref={ref}
        >
          <div className='bg-teal-600 px-3 rounded-3xl whitespace-nowrap'>
            <Typography variant='c' weight='bold' className='text-base-surface'>
              {ticket_price}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
