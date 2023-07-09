import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import { REG_EMAIL } from '@/constant/regex';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import AuthIllustration from '@/pages/auth/container/AuthIllustration';
import { ApiError, ApiReturn } from '@/types/api';
import { SignUp } from '@/types/entity/auth';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const methods = useForm<SignUp>();
  const { handleSubmit } = methods;

  const { mutate: handleSignUp, isLoading } = useMutation<
    AxiosResponse<ApiReturn<SignUp>> | void,
    AxiosError<ApiError>,
    SignUp
  >(async (data: SignUp) => {
    const res = await api.post('/user', data);
    return res;
  });

  const onSubmit = (data: SignUp) => {
    handleSignUp(
      {
        name: data.name,
        email: data.email,
        username: data.username,
        age: data.age,
        password: data.password,
      },
      {
        onSuccess: () => router.push('/login'),
        onError: (err) => {
          err.response && setError(err.response?.data.message);
        },
      }
    );
  };

  return (
    <Layout>
      <SEO title='Sign Up' description='Sign Up Page' />

      <main className='flex min-h-screen w-full bg-base-surface'>
        <section className='hidden md:flex fixed w-full h-screen p-3 pointer-events-none'>
          <div className='w-1/3 min-w-[400px] h-full' />
          <div className='w-2/3 h-full'>
            <AuthIllustration />
          </div>
        </section>

        <section className='flex items-center justify-center w-full md:w-1/3 md:min-w-[400px] px-8 py-12'>
          <FormProvider {...methods}>
            <form
              className='w-full max-w-[400px] flex flex-col gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography
                font='montserrat'
                variant='h3'
                weight='bold'
                className='text-teal-600 text-center'
              >
                Sign Up
              </Typography>

              <div className='space-y-3'>
                <Input
                  id='name'
                  label='Nama Lengkap'
                  placeholder='Masukkan Nama Lengkap'
                  validation={{ required: 'Nama harus diisi' }}
                />
                <Input
                  id='username'
                  label='Username'
                  placeholder='Masukkan Username'
                  validation={{ required: 'Username harus diisi' }}
                />
                <Input
                  id='age'
                  label='Umur'
                  placeholder='Masukkan Umur'
                  validation={{ required: 'Umur harus diisi' }}
                />
                <Input
                  id='email'
                  label='Email'
                  placeholder='Masukkan Email'
                  validation={{
                    required: 'Email harus diisi',
                    pattern: {
                      value: REG_EMAIL,
                      message: 'Email tidak valid',
                    },
                  }}
                />

                <Input
                  id='password'
                  type='password'
                  label='Password'
                  placeholder='Masukkan Password'
                  validation={{ required: 'Password harus diisi' }}
                />
              </div>

              <div className='flex flex-col items-center gap-1.5'>
                {error && (
                  <Button
                    size='small'
                    variant='danger'
                    className='pointer-events-none w-full bg-opacity-80'
                  >
                    {error}
                  </Button>
                )}
                <Button
                  type='submit'
                  className='w-full'
                  textClassName='font-secondary'
                  isLoading={isLoading}
                >
                  Sign Up
                </Button>

                <div className='flex gap-1'>
                  <Typography
                    font='open-sans'
                    variant='c'
                    className='text-teal-600'
                  >
                    Sudah punya akun?
                  </Typography>
                  <UnstyledLink
                    href='/login'
                    className='self-end underline text-teal-400 hover:text-teal-600'
                  >
                    <Typography font='open-sans' variant='c' weight='semibold'>
                      Masuk
                    </Typography>
                  </UnstyledLink>
                </div>
              </div>
            </form>
          </FormProvider>
        </section>
      </main>
    </Layout>
  );
}
