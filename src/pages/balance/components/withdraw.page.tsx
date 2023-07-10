import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import Typography from '@/components/typography/Typography';
import api from '@/lib/api';
import { ApiError, ApiReturn } from '@/types/api';
import { CartPayment } from '@/types/entity/cart';

export default withAuth(Withdraw, ['all']);

function Withdraw() {
  const methods = useForm<CartPayment>({
    mode: 'onSubmit',
  });
  const router = useRouter();
  const { handleSubmit } = methods;

  const [error, setError] = useState('');

  const { mutateAsync: payCart, isLoading: payCartIsLoading } = useMutation<
    AxiosResponse<ApiReturn<null>> | void,
    AxiosError<ApiError>,
    CartPayment
  >((data: CartPayment) => api.post('user/withdraw', data));

  const onSubmit = (data: CartPayment) => {
    payCart(data, {
      onSuccess: () => router.reload(),
      onError: (err) => {
        err.response && setError(err.response?.data.errors);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full space-y-6'>
          <div className='p-4 space-y-6 rounded-lg bg-base-surface'>
            <Input
              id='balance'
              label='Withdraw Balance'
              placeholder='Masukkan Total Balance'
              validation={{
                required: 'Total Balance tidak boleh kosong',
              }}
              className='w-full'
            />
          </div>
          <Button type='submit' className='w-full' isLoading={payCartIsLoading}>
            Bayar
          </Button>
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
      </form>
    </FormProvider>
  );
}
