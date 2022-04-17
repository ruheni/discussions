// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Button,
  Flex,
  Stack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSubmit } from "@remix-run/react";
import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";

type Props = {
  user: User | null;
};

export function NavBar(props: Props) {
  const submit = useSubmit();

  return (
    <Box width="100%">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }}>
          <Link to="/">
            <Text
              fontWeight="bold"
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              DisQuss
            </Text>
          </Link>
        </Flex>

        {!props.user ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {/* <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button> */}
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant="link"
              as={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              // display={{ base: 'none', md: 'inline-flex' }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              as={Link}
              _hover={{
                bg: "pink.300",
              }}
              to={"/join"}
            >
              Join
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Flex alignItems={"center"}>
              <Menu closeOnSelect closeOnBlur>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    name={props.user.username}
                    size={"sm"}
                    // @ts-ignore
                    src={props.user.imageUrl}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/community/create">
                    <MenuItem>Create Community</MenuItem>
                  </Link>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() =>
                      submit(null, { method: "post", action: "/logout" })
                    }
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
