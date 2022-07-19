import * as React from "react";
import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { z } from "zod";

import { getUserId } from "~/session.server";

import { createUser, getUserByEmail } from "~/services/user.server";
import { validateFormData } from "~/lib/form";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

type ActionData = {
  errors: {
    email?: string;
    username?: string;
  };
};

const signupSchema = z.object({
  username: z.string().min(1, "Username is invalid"),
  email: z.string().min(3).email("Email is invalid"),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const { data, fieldErrors } = await validateFormData(signupSchema, formData);

  if (fieldErrors) {
    return json({ errors: fieldErrors, data }, { status: 400 });
  }

  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    return json(
      {
        errors: fieldErrors,
        data: "A user already exists with this email or username",
      },
      { status: 400 }
    );
  }

  const { success, error } = await createUser(data.username, data.email);

  if (!success || error) {
    return json({ errors: { email: error }, data }, { status: 400 });
  }

  /** redirect to confirmation page */
  return redirect("/confirm");
};

export const meta: MetaFunction = () => {
  return {
    title: "Join DisQuss",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData() as ActionData;
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-[50%] flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                ref={usernameRef}
                id="username"
                required
                autoFocus={true}
                name="username"
                type="text"
                aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
                className="w-full rounded border border-gray-300 px-2 py-1 text-lg"
              />
              {actionData?.errors?.username && (
                <div className="pt-1 text-red-700" id="username-error">
                  {actionData.errors.username}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-300 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-pink-500  py-2 px-4 text-white hover:bg-pink-600 focus:bg-pink-400"
          >
            Create Account
          </button>
          <div className="flex">
            <div className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                className="text-pink-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
