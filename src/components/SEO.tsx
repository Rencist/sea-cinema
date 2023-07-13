import { NextSeo, NextSeoProps } from 'next-seo';

type SEOProps = {
  title?: string;
  description?: string;
} & NextSeoProps;

export default function SEO({ title, description, ...rest }: SEOProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      {...rest}
      openGraph={{
        type: 'website',
        url: process.env.NEXT_PUBLIC_URL,
        title: 'SEA - Cinema',
        siteName: 'SEA - Cinema',
        description: 'SEA - Cinema: The Largest Cinema in Indonesia',
        // images: [
        //   {
        //     url: `${process.env.NEXT_PUBLIC_URL}/images/og-itsexpo.png`,
        //     width: 1200,
        //     height: 627,
        //     alt: 'ITS EXPO 2023',
        //   },
        // ],
      }}
    />
  );
}
