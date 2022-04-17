import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useSearchParams, useTransition } from "@remix-run/react";
import * as React from "react";
import {
  Box,
  Button,
  Center,
  Text,
  Heading,
  Stack,
  Link as ChakraLink,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Checkbox,
} from "@chakra-ui/react";
import { z } from "zod";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/services/user.server";
import { FormError, FormField, Form } from "~/components/Form";
import { validateFormData } from "~/lib/form";

const loginSchema = z.object({
  email: z.string().email().min(3).email("Email is invalid"),
  password: z.string().min(6, "Password is too short"),
});

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return null;
};

type ActionData = {
  errors?: {
    email?: string;
    password?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember") ?? true;

  const { data, fieldErrors } = await validateFormData(loginSchema, formData);

  if (fieldErrors) {
    return json<ActionData>({ errors: data }, { status: 400 });
  }

  const user = await verifyLogin(data.email, data.password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const { state } = useTransition();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const isSubmitting = state === "submitting";

  return (
    <Center flexDir="column" pt="10">
      <Box w={["90%", 450]}>
        <Stack marginBottom={10}>
          <Heading as="h1" fontSize="3xl">
            Login
          </Heading>
        </Stack>

        <Form method="post">
          <Stack spacing={3}>
            <FormField
              isRequired
              label="Email address"
              name="email"
              placeholder="joe@email.com"
            />
            <FormField
              isRequired
              label="Password"
              name="password"
              type="password"
              placeholder="**************"
            ></FormField>

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <Box>
              <Button
                type="submit"
                isFullWidth
                colorScheme="pink"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Login
              </Button>
              <FormError />
            </Box>
          </Stack>

          <Stack align="center" justify="space-between" my="7">
            {/* <FormControl>
  
              <Text>
                <Checkbox>Remember me?</Checkbox>
              </Text>
            </FormControl> */}

            <Text pt="3">
              Don't have an account?{" "}
              <ChakraLink as={Link} to="/join" color="pink.500">
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Form>
      </Box>
    </Center>
  );
}
