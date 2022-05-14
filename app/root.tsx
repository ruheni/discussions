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

import { getUser } from "./session.server";

import styles from "./styles/tailwind.css";

import NavBar from "./components/NavBar";

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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  const { user } = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <NavBar user={user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   console.error({ error });
//   return (
//     <>
//       <Box textAlign="center" py={10} px={6}>
//         <Box display="inline-block">
//           <Flex
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             bg={"red.500"}
//             rounded={"50px"}
//             w={"40px"}
//             h={"40px"}
//             textAlign="center"
//           >
//             <CloseIcon boxSize={"20px"} color={"white"} />
//           </Flex>
//         </Box>
//         <Heading as="h2" size="xl" mt={6} mb={2}>
//           {error.name}: {error.message}
//         </Heading>
//         <Text color={"gray.500"}>{error.stack}</Text>
//       </Box>
//     </>
//   );
// }

// export function CatchBoundary() {
//   let error = useCatch();

//   switch (error.status) {
//     case 401:
//       break;
//     case 404:
//       break;

//     default:
//       break;
//   }
// }
