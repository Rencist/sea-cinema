import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Image from 'next/image';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDraggable } from 'react-use-draggable-scroll';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { Comment, Seri } from '@/types/entity/manga';

type LibraryCardProps = {
  id: string;
  movieID: number;
  userName: string;
  movieName: string;
  totalPrice: number;
  seat: Comment[];
};

type FinePayment = {
  transaction_id: string;
};

export default function LibraryCard({
  id,
  movieID,
  userName,
  movieName,
  totalPrice,
  seat,
}: LibraryCardProps) {
  const methods = useForm<FinePayment>();
  const { handleSubmit } = methods;

  const { mutateAsync: payFine, isLoading } = useMutation<
    AxiosResponse<ApiReturn<null>> | void,
    AxiosError<ApiError>,
    FinePayment
  >((data: FinePayment) => api.post('/movie/transaction/delete', data));
  const [error, setError] = useState('');
  const onSubmit = (data: FinePayment) => {
    payFine(
      {
        transaction_id: data.transaction_id,
      },
      {
        onSuccess: () => router.reload(),
        onError: (err) => {
          err.response && setError(err.response?.data.errors);
        },
      }
    );
  };

  const [src, setSrc] = useState('');
  const url = `/movie/${movieID}`;
  const { data: mangaData } = useQuery<ApiReturn<Seri>>([url], {
    onSuccess: (res) => setSrc(res.data.poster_url),
  });

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  return (
    <div className='flex flex-row w-full h-[244px] bg-base-light rounded-xl overflow-hidden'>
      <div className='relative w-48 h-full'>
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
              {movieName}
            </Typography>
          </div>
          <div className='flex flex-row gap-3 text-base-surface'>
            <div className='flex flex-row items-center gap-1'>
              <BsFillPersonFill className='text-sm' />
              <Typography variant='c'>{mangaData?.data.age_rating}</Typography>
            </div>
            <div className='flex flex-row items-center gap-1'>
              <AiFillStar className='text-sm' />
              <Typography variant='c'>
                {mangaData?.data.release_date}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className='relative flex flex-1 flex-col text-teal-600'>
        <div className='flex-1 space-y-1.5 p-3 overflow-y-hidden hover:overflow-y-auto'>
          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            User Name : {userName}
          </Typography>

          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            Total Price : {'Rp. ' + totalPrice}
          </Typography>
          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            Total Seat : {seat.length}
          </Typography>
          <Typography
            variant='c'
            weight='bold'
            className='flex flex-row gap-1.5'
          >
            List Seat :{' '}
            {seat.map((seatMap, index) => (
              <Typography
                variant='c'
                weight='bold'
                className='flex flex-row gap-1.5'
                key={index}
              >
                {index == seat.length - 1 ? seatMap.seat : seatMap.seat + ', '}
              </Typography>
            ))}
          </Typography>
        </div>
        <div className='h-14 w-full' />
        <div
          className='absolute bottom-0 w-full h-12 flex flex-row gap-2.5 p-3 bg-base-outline overflow-x-scroll scrollbar-hide'
          {...events}
          ref={ref}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(
                onSubmit.bind(null, { transaction_id: id })
              )}
              className=' w-full flex flex-row gap-4'
            >
              <Button
                type='submit'
                variant='danger'
                className='w-1/2'
                isLoading={isLoading}
              >
                Delete
              </Button>
              {error && (
                <div className='flex space-x-1'>
                  <HiOutlineExclamationCircle className='shrink-0 text-red-200' />
                  <Typography
                    variant='c'
                    weight='semibold'
                    className='text-red-200'
                  >
                    {error}
                  </Typography>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
