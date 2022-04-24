import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { getDiscussions } from "~/services/discussion.server";
import { json } from "@remix-run/node";
import { Container, useColorModeValue } from "@chakra-ui/react";
import Discussion from "~/components/Discussion";

type LoaderData = {
  discussions: Awaited<ReturnType<typeof getDiscussions>>;
};

export const loader: LoaderFunction = async () => {
  const discussions = await getDiscussions();
  return json({
    discussions,
  });
};

export default function Index() {
  const { discussions } = useLoaderData<LoaderData>();

  return (
    <Container
      mt="4"
      mb="4"
      maxW="5xl"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      py="6"
    >
      {discussions.length === 0 ? (
        <p>No discussions here</p>
      ) : (
        discussions.map((discussion) => (
          <Discussion key={discussion.id} {...discussion} />
        ))
      )}
    </Container>
  );
}
