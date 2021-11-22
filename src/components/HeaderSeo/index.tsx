import { NextSeo } from "next-seo";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  description: string;
  title: string;
  canonical: string;
  og_locale: string;
  og_title: string;
  og_image?: [
    {
      width: number;
      height: number;
      url: string;
      type: string;
    }
  ];
}

const HeaderSeo = ({
  children,
  description,
  title,
  canonical,
  og_locale,
  og_title,
  og_image,
}: Props) => {
  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: og_title,
          description: description,
          locale: og_locale,
          images: og_image && og_image,
          site_name: "Inmotion-suisse",
          type: "article",
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

export default HeaderSeo;
