import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import AppProvider from "../components/Context";
import GlobalStyles from "../styles/globalStyles";
import Head from "next/head";

import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProvider>
      {getLayout(
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
          </Head>
          <Component {...pageProps} />
          <GlobalStyles />
        </>
      )}
    </AppProvider>
  );
}
export default MyApp;
