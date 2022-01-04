import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
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
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  /* useEffect(() => {
    Notiflix.Notify.init({
      position: "center-top",
      width: "60%",
      success: { background: "var(--Green)" },
      failure: { background: "var(--Red)" },
      warning: { background: "var(--Orange)" },
      info: { background: "var(--Blue)" },
      clickToClose: true,
    });

    Notiflix.Loading.init({
      svgColor: "var(--Blue)",
      svgSize: "100px",
      messageColor: "var(--Red)",
      messageFontSize: "17px",
      backgroundColor: "rgba(234, 234, 234, 0.856)",
    });

    const handleStart = (url: URL) => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]); */

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
