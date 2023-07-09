import Typography from '@/components/typography/Typography';

type InformationProps = {
  age_rating: string;
  ticket_price: number;
  release_date: string;
};

export default function Information({
  age_rating,
  ticket_price,
  release_date,
}: InformationProps) {
  return (
    <div className='space-y-3'>
      <div className='flex flex-col gap-3 bg-base-surface p-3 rounded-lg'>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Harga Tiket
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {ticket_price}
          </Typography>
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Tanggal Terbit
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {release_date}
          </Typography>
        </div>
        <div>
          <Typography variant='c' weight='semibold' className='text-teal-600'>
            Rating Umur
          </Typography>
          <Typography variant='c' className='text-base-icon'>
            {age_rating}
          </Typography>
        </div>
      </div>
    </div>
  );
}
