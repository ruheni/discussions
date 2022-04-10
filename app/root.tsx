import React, { useContext, useEffect } from 'react'
import type {
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { withEmotionCache } from '@emotion/react';
import { ChakraProvider, Container } from '@chakra-ui/react';

import { getUser } from "./session.server";
import { ServerStyleContext, ClientStyleContext } from "./lib/chakra-context";
import { theme } from './lib/theme';

interface DocumentProps {
  children: React.ReactNode
}


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Discussions",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

const App = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext)
  const clientStyleData = useContext(ClientStyleContext)

  // run only on the client 
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;

    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush()
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag)
    })

    // reset cache to reapply global styles
    clientStyleData?.reset()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstaticom" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Container maxWidth="xl" padding="0">
            <Outlet />
            {children}
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
          </Container>
        </ChakraProvider>
      </body>
    </html>
  )
})

export function CatchBoundary() {
  let error = useCatch()

  switch (error.status) {
    case 401:

      break;
    case 404:

      break;

    default:
      break;
  }
}

export default App

