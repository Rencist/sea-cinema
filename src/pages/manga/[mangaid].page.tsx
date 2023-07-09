import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import withAuth from '@/components/hoc/withAuth';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import Comment from '@/pages/manga/container/Comment';
import Information from '@/pages/manga/container/Information';
import { ApiReturn } from '@/types/api';
import { Seri } from '@/types/entity/manga';

export default withAuth(DetailManga, ['all']);

function DetailManga() {
  const [src, setSrc] = useState('');

  const { mangaid } = useRouter().query;

  const url = `/movie/${mangaid}`;
  const { data: mangaData } = useQuery<ApiReturn<Seri>>([url], {
    onSuccess: (res) => setSrc(res.data.poster_url),
  });

  return (
    <Layout withNavbar={true}>
      {mangaData?.data.title && <SEO title={mangaData.data.title} />}
      <main className='min-h-screen'>
        <div className='relative h-[300px] w-full -z-50'>
          <Image
            src={src}
            alt='manga-cover'
            width='200'
            height='300'
            onError={() => setSrc('/images/error.jpg')}
            className='w-full h-full object-cover blur-sm'
          />
          <div className='absolute top-0 bg-teal-900 opacity-50 w-full h-full' />
        </div>

        <section className='flex flex-row gap-8 px-12 py-8 bg-base-surface border'>
          <div className='relative w-[208px] h-[300px] -mt-24'>
            <Image
              src={src}
              alt='manga-cover'
              width='200'
              height='300'
              onError={() => setSrc('/images/error.jpg')}
              className='w-full h-full object-cover rounded-xl'
            />
          </div>
          <div className='flex-1 flex flex-col gap-3'>
            <Typography
              variant='h5'
              as='h5'
              weight='bold'
              className='text-teal-600'
            >
              {mangaData?.data.title}
            </Typography>
            <Typography variant='p' className='text-teal-600'>
              {mangaData?.data.description}
            </Typography>
          </div>
        </section>

        {mangaData && (
          <section className='flex flex-row gap-8 px-12 py-8 bg-base-light'>
            <div className='w-1/4'>
              <Information
                age_rating={mangaData.data.age_rating}
                ticket_price={mangaData.data.ticket_price}
                release_date={mangaData.data.release_date}
              />
            </div>

            <div className='flex flex-col gap-8 w-full'>
              {mangaid && <Comment mangaId={+mangaid} />}
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
