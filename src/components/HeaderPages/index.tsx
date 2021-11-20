import { NextSeo } from "next-seo";
import Head from "next/head";
import React, { ReactNode } from "react";

interface HeaderSeo {
  canonical: string;
  og_locale: string;
  og_site_name: string;
  og_title: string;
  og_type: string;
  og_url: string;
  title: string;
  twitter_card: string;
}

interface Props {
  children: ReactNode;
  name: string;
  description: string;
  title: string;
  canonical: string;
  og_locale: string;
  og_site_name: string;
  og_title: string;
  og_type: string;
  og_url: string;
  twitter_card: string;
}

const HeaderPages = ({
  children,
  name,
  description,
  title,
  canonical,
  og_locale,
}: Props) => {
  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          site_name: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      {children}
    </div>
  );
};

export default HeaderPages;
