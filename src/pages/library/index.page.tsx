import { useQuery } from '@tanstack/react-query';

import withAuth from '@/components/hoc/withAuth';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import LibraryCard from '@/pages/library/components/LibraryCard';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { Rent } from '@/types/entity/manga';

export default withAuth(LibraryPage, ['all']);

function LibraryPage() {
  const { data: queryData } = useQuery<ApiReturn<Rent[]>>([
    '/movie/transaction',
  ]);
  const user = useAuthStore.useUser();

  return (
    <Layout withNavbar={true}>
      <SEO title='Manga Terpinjam' />
      <main className='min-h-screen bg-base-surface pt-[92px]'>
        <div className='p-12'>
          <section className='flex flex-col gap-8'>
            {queryData?.data ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {queryData?.data.map((rent) => (
                  <LibraryCard
                    key={rent.id}
                    id={rent.id}
                    movieID={rent.movie_id}
                    userName={user?.name ? user.name : 'Anonymous'}
                    movieName={rent.movie_name}
                    totalPrice={rent.total_price}
                    seat={rent.seat}
                  />
                ))}
              </div>
            ) : (
              <div className='flex w-full justify-center'>
                <Typography
                  variant='h3'
                  weight='semibold'
                  className='text-teal-600'
                >
                  No Seat Purchased
                </Typography>
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
