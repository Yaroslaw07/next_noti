import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/lib/contexts/toastContext";
import useThemeStore from "@/lib/stores/themeStore";
import { CssBaseline, ThemeProvider, useThemeProps } from "@mui/material";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { getCurrentTheme } = useThemeStore();
  const theme = getCurrentTheme();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Providers>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          {getLayout ? (
            getLayout(<Component {...pageProps} />)
          ) : (
            <Component {...pageProps} />
          )}
        </ToastProvider>
      </ThemeProvider>
    </Providers>
  );
}
