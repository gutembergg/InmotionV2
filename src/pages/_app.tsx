import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import AppProvider from "../components/Context";
import GlobalStyles from "../styles/globalStyles";
import Head from "next/head";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    scriptProps={{
      async: false,
      defer: false,
      appendTo: 'head',
      nonce: undefined
    }}
  >
    <AppProvider>
      {getLayout(
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
          </Head>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="exitAnimate"
            transition={{ delay: 0.1 }}
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
              exitAnimate: {
                opacity: 0,
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
          <GlobalStyles />
        </>
      )}
    </AppProvider>
    </GoogleReCaptchaProvider>
  );
}
export default MyApp;
