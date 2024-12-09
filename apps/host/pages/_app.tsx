import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigurationProvider } from '../contexts/configuration-context';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigurationProvider>
        <Head>
          <title>Welcome to host!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ConfigurationProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
