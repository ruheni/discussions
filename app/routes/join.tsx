import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useSearchParams, useTransition } from "@remix-run/react";
import { z } from "zod";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/services/user.server";
import {
  Center,
  Box,
  Stack,
  Heading,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FormField, FormError, Form } from "~/components/Form";
import { validateFormData } from "~/lib/form";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

type ActionData = {
  errors: {
    email?: string;
    password?: string;
    username?: string;
  };
};

const signupSchema = z.object({
  username: z.string().min(1, "Username is invalid"),
  email: z.string().min(3).email("Email is invalid"),
  password: z.string().min(6, "Password is too short"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const redirectTo = formData.get("redirectTo");

  const { data, fieldErrors } = await validateFormData(signupSchema, formData);

  if (fieldErrors) {
    return json<ActionData>({ errors: data }, { status: 400 });
  }

  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    return json<ActionData>(
      {
        errors: { email: "A user already exists with this email or username" },
      },
      { status: 400 }
    );
  }

  const user = await createUser(data.username, data.email, data.password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Join DisQuss",
  };
};

export default function Join() {
  const { state } = useTransition();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const isSubmitting = state === "submitting";

  return (
    <Center flexDir="column" pt="10">
      <Box w={["90%", 450]}>
        <Stack marginBottom={10}>
          <Heading as="h1" fontSize="3xl">
            Join DisQuss
          </Heading>
        </Stack>

        <Form method="post">
          <Stack spacing={4}>
            <FormField
              isRequired
              label="username"
              type="text"
              name="username"
              placeholder="doc_mcstuffin"
            />

            <FormField
              isRequired
              label="Email address"
              name="email"
              type="email"
              placeholder="joe@email.com"
            />

            <FormField
              isRequired
              label="Password"
              name="password"
              type="password"
              placeholder="**************"
            />

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <Box>
              <Button
                type="submit"
                isFullWidth
                colorScheme="pink"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Create Account
              </Button>
              <FormError />
            </Box>
          </Stack>
        </Form>

        <Stack align="center" justify="space-between" my="10">
          <Text>
            Already have an account?{" "}
            <ChakraLink as={Link} to="/login" color="pink.500">
              Login
            </ChakraLink>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
