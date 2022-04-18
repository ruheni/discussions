import { Box, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { formatDistance, subDays } from 'date-fns'
import type { getDiscussion } from "~/services/discussion.server";

type Props = Exclude<Awaited<PromiseLike<ReturnType<typeof getDiscussion>>>, null>

export default function Discussion(props: Props) {
  return (
    <Box w="90%" p={2}>
      <Box as="h3">
        <ChakraLink
          mt='1'
          fontWeight='semibold'
          as={Link}
          to={`/discussion/${props.id}`}
          lineHeight='tight'
          isTruncated
        >
          {props?.title}
        </ChakraLink>

      </Box>

      <Box color='gray.600' fontSize='sm'>
        {props.author.username} asked {formatDistance(subDays(new Date(props.createdAt), new Date().getDay()), new Date(), { addSuffix: true })}
      </Box>

      <Box fontSize="sm" >
        <ChakraLink as={Link} to={``}>
          #{props.community?.name}
        </ChakraLink>

      </Box>
    </Box>
  )
}