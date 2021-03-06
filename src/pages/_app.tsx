import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import NextNprogress from 'nextjs-progressbar';

import 'nprogress/nprogress.css';
import Head from 'next/head';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        boards: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        // projects: {
        //   merge(existing, incoming) {
        //     return incoming;
        //   },
        // },
      },
    },
  },
});

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV !== 'development'
      ? 'https://trello-clone-smoky-mu.vercel.app/api/graphql'
      : 'http://localhost:3000/api/graphql',
  cache: cache,
  credentials: 'include',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trello clone</title>
        <link rel='shortcut icon' href='/trello-icon.svg'></link>
      </Head>
      <NextNprogress
        color='#0079bf'
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <ChakraProvider resetCSS theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
