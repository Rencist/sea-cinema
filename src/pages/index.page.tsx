import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

import Filter, { FilterType } from '@/components/form/Filter';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import PageNavigation from '@/components/PageNavigation';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import { SORT } from '@/constant/manga';
import usePageNavigation from '@/hooks/usePageNavigation';
import Layout from '@/layouts/Layout';
import MangaCard from '@/pages/dashboard/components/MovieCard';
import { PaginatedApiResponse } from '@/types/api';
import { Seri } from '@/types/entity/manga';

type DashboardFilter = {
  search: string;
  genre: FilterType[];
  sort: FilterType[];
};

export default withAuth(DashboardPage, ['all']);

function DashboardPage() {
  const methods = useForm<DashboardFilter>();
  const { handleSubmit } = methods;
  const { pageState, setPageState } = usePageNavigation({ pageSize: 9 });
  const [filters, setFilters] = useState<DashboardFilter | undefined>(
    undefined
  );

  const url = `movie?page=${pageState.pageIndex + 1}&per_page=${
    pageState.pageSize
  }${filters?.search ? `&search=${filters?.search}` : ''}${
    filters?.sort[0] ? `&sort=${filters?.sort[0].value}` : ''
  }`;

  const { data: queryData } = useQuery<PaginatedApiResponse<Seri[]>>([url], {
    keepPreviousData: true,
  });

  const onChange = (filter: DashboardFilter) => {
    setFilters(filter);
  };

  return (
    <Layout withNavbar={true}>
      <SEO title='Movie Collection' />
      <main className='space-y-8 min-h-screen bg-base-surface pt-[92px]'>
        <div className='p-12 space-y-8'>
          <section className='w-full'>
            <FormProvider {...methods}>
              <form
                onChange={handleSubmit(onChange)}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              >
                <Input id='search' placeholder='Search' leftIcon={BiSearch} />
                <div className='flex flex-row gap-3 lg:col-start-3'>
                  <Filter
                    id='sort'
                    placeholder='Sort By'
                    defaultValue={[SORT[0]]}
                    filters={SORT}
                    onChange={handleSubmit(onChange)}
                  />
                </div>
              </form>
            </FormProvider>
          </section>
          <section className='flex flex-col gap-8 items-end'>
            {queryData?.data.data_per_page ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {queryData?.data.data_per_page?.map((seri) => (
                  <MangaCard
                    key={seri.id}
                    id={seri.id}
                    title={seri.title}
                    description={seri.description}
                    release_date={seri.release_date}
                    poster_url={seri.poster_url}
                    age_rating={seri.age_rating}
                    ticket_price={seri.ticket_price}
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
                  No Movie Found
                </Typography>
              </div>
            )}
            {queryData && (
              <PageNavigation
                meta={queryData?.data.meta}
                pageState={pageState}
                pageCount={5}
                setPageState={setPageState}
              />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
