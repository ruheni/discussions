import React, { useContext, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { withEmotionCache } from "@emotion/react";
import {
  ChakraProvider,
  Text,
  Heading,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import { getUser } from "./session.server";
import { ServerStyleContext, ClientStyleContext } from "./lib/chakra-context";
import { theme } from "./lib/theme";

import NavBar from "./components/NavBar";
import { CloseIcon } from "@chakra-ui/icons";

type DocumentProps = {
  children: React.ReactNode;
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Discussions",
  viewport: "width=device-width,initial-scale=1",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // run only on the client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;

      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });

      // reset cache to reapply global styles
      clientStyleData?.reset();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
          <Meta />
          <Links />
        </head>
        <body>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);

const App = () => {
  const { user } = useLoaderData();
  return (
    <Document>
      <NavBar user={user} />
      <Box
        minHeight="calc(100vh - 60px)"
        py={{ base: 2 }}
        px={{ base: 8 }}
        maxWidth="100%"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Outlet />
      </Box>
    </Document>
  );
};

export function ErrorBoundary({ error }: { error: Error }) {
  console.error({ error });
  return (
    <Document>
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={"red.500"}
            rounded={"50px"}
            w={"40px"}
            h={"40px"}
            textAlign="center"
          >
            <CloseIcon boxSize={"20px"} color={"white"} />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          {error.name}: {error.message}
        </Heading>
        <Text color={"gray.500"}>{error.stack}</Text>
      </Box>
    </Document>
  );
}

export function CatchBoundary() {
  let error = useCatch();

  switch (error.status) {
    case 401:
      break;
    case 404:
      break;

    default:
      break;
  }
}

export default App;
