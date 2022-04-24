import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { formatDistance, subDays } from "date-fns";
import { getDiscussion } from "~/services/discussion.server";

type LoaderData = {
  discussion: Awaited<ReturnType<typeof getDiscussion>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (typeof params.discussionId !== "undefined") {
    const discussion = await getDiscussion({ id: params.discussionId });

    if (!discussion)
      throw new Response("Discussion Not Found", { status: 404 });

    return json({ discussion });
  }
};

export default function DiscussionPage() {
  const { discussion } = useLoaderData<LoaderData>();
  return (
    <Container
      mt="4"
      mb="4"
      maxW="5xl"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="lg"
      py="6"
    >
      {discussion && (
        <Box w="90%" p={2}>
          <Box>
            <Heading as="h1" size="xl" mb="3">
              {discussion.title}
            </Heading>
          </Box>

          <Box color="gray.600" fontSize="md">
            <Text as="strong">
              <ChakraLink as={Link} to={``}>
                {discussion.author.username}
              </ChakraLink>
            </Text>{" "}
            asked in{" "}
            <Text as="strong">
              <ChakraLink as={Link} to={``}>
                #{discussion.community?.name}
              </ChakraLink>
            </Text>
          </Box>

          <Box
            mt="4"
            // border="1px"
            // borderColor="gray.200"
            // padding="6"
            // borderRadius="lg"
          >
            <Flex alignItems="center">
              <Avatar
                name={discussion.author.username}
                size={"sm"}
                // @ts-ignore
                src={discussion.author.imageUrl}
              />
              <Text pl="3">
                <ChakraLink as={Link} to={``} fontWeight="bold">
                  {discussion.author.username}
                </ChakraLink>{" "}
                {formatDistance(
                  subDays(new Date(discussion.createdAt), new Date().getDay()),
                  new Date(),
                  { addSuffix: true }
                )}
              </Text>
            </Flex>

            <Text
              pt="4"
              as="p"
              dangerouslySetInnerHTML={{ __html: discussion.content }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
