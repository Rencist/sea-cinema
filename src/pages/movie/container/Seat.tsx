import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { serialize } from 'object-to-formdata';
import React, { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import SelectInput from '@/components/form/SelectInput';
import Typography from '@/components/typography/Typography';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { Comment } from '@/types/entity/manga';
import { TransactionFormProps } from '@/types/entity/transaction';

export default function Seat({
  mangaId,
  mangaPrice,
}: {
  mangaId: number;
  mangaPrice: number;
}) {
  const { control } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'seat',
    shouldUnregister: false,
  });
  React.useMemo(() => {
    if (fields.length === 0) {
      append({
        seat: '',
      });
    }
  }, [append, fields.length]);
  const router = useRouter();
  const methods = useForm<{ isi: TransactionFormProps }>();
  const { handleSubmit } = methods;

  const { mutate: addComment } = useMutation<
    AxiosResponse<ApiReturn<null>> | void,
    AxiosError<ApiError>,
    FormData
  >((data: FormData) =>
    api.post('/movie/transaction', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );

  const url = `/movie/available_seat/${mangaId}`;

  const { data: commentData } = useQuery<ApiReturn<Comment[]>>([url], {
    keepPreviousData: true,
  });

  const [error, setError] = useState('');
  const onSubmit = (data: { isi: TransactionFormProps }) => {
    const formData = serialize(
      {
        ...data,
        total_price: fields.length * mangaPrice,
        movie_id: mangaId,
        total_seat: fields.length,
      },
      {
        indices: true,
      }
    );
    addComment(formData, {
      onSuccess: () => router.push('/library').then(() => router.reload()),
      onError: (err) => {
        err.response && setError(err.response?.data.errors);
      },
    });
  };

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Typography weight='semibold' className='text-teal-600'>
        Available Seat
      </Typography>

      <FormProvider {...methods}>
        <form
          className='flex flex-col w-full bg-base-surface gap-3 p-3 rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className='flex justify-between items-center'>
                <Typography
                  weight='semibold'
                  className='flex justify-between items-center'
                >
                  {`Bangku ${index + 1} `}
                  <Typography className='text-red-200'> *</Typography>
                </Typography>
                {index !== 0 && (
                  <button
                    type='button'
                    onClick={() => {
                      remove(index);
                    }}
                    className='text-danger-50'
                  >
                    Hapus Seat
                  </button>
                )}
              </div>
              <div className='mt-4'>
                <SelectInput
                  id={`seat[${index}].seat`}
                  placeholder='Pilih Bangku'
                  validation={{ required: 'Bangku harus diisi' }}
                >
                  {commentData?.data.map((data) => (
                    <option key={data.seat} value={data.seat}>
                      {data.seat}
                    </option>
                  ))}
                </SelectInput>
              </div>
              {index === fields.length - 1 && (
                <div className='flex gap-x-4 justify-end py-4'>
                  <>
                    {index < 5 ? (
                      <Button
                        type='button'
                        onClick={() => {
                          append({});
                        }}
                        variant='primary'
                        className='w-full'
                      >
                        Tambah Bangku
                      </Button>
                    ) : null}
                  </>
                  <Button type='submit' className='self-end'>
                    Beli
                  </Button>
                </div>
              )}
              {error && (
                <div className='flex space-x-1'>
                  <HiOutlineExclamationCircle className='shrink-0 text-red-200' />
                  <Typography
                    variant='c'
                    className='!leading-tight text-base-primary'
                  >
                    {error}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </form>
      </FormProvider>
      <div className='flex flex-col gap-6 items-end'></div>
    </div>
  );
}
