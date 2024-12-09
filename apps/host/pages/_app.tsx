import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigurationProvider } from '../contexts/configuration-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache is kept for 10 minutes
      refetchOnMount: false, // Don't refetch on component mount
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: false, // Don't refetch on reconnection
      retry: 1, // Only retry failed requests once
    },
  },
});

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
