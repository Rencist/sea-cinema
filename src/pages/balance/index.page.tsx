import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import Layout from '@/layouts/Layout';
import TopupPage from '@/pages/balance/components/topup.page';
import WithdrawPage from '@/pages/balance/components/withdraw.page';
import useAuthStore from '@/store/useAuthStore';

export default withAuth(BalancePage, ['all']);

function BalancePage() {
  const user = useAuthStore.useUser();
  return (
    <Layout withNavbar>
      <SEO title='Balance' />
      <main className='min-h-screen bg-base-surface pt-[92px]'>
        <div className='flex w-full py-12 justify-center'>
          {user && (
            <Typography
              variant='h3'
              weight='semibold'
              className='text-teal-600'
            >
              Total Balance : Rp. {user?.balance}
            </Typography>
          )}
        </div>
        <div className='px-12 py-8 flex lg:flex-row lg:gap-52 flex-col gap-20 items-center justify-center'>
          <section className='p-6 bg-base-light rounded-xl'>
            <TopupPage />
          </section>
          <section className='p-6 bg-base-light rounded-xl'>
            <WithdrawPage />
          </section>
        </div>
      </main>
    </Layout>
  );
}
