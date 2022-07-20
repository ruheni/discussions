import * as React from "react";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { z } from "zod";

import { getUserId } from "~/session.server";
import { login } from "~/services/user.server";
import { validateFormData } from "~/lib/form";

const loginSchema = z.object({
  email: z.string().email().min(3),
});

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return null;
};

interface ActionData {
  errors: {
    email?: string;
  };
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const { data, fieldErrors } = await validateFormData(loginSchema, formData);

  if (fieldErrors) {
    return json({ errors: fieldErrors, data }, { status: 400 });
  }

  const { success, error } = await login(data.email);

  if (!success || error) {
    return json({ errors: { email: error }, data }, { status: 400 });
  }

  /** redirect to confirmation page */
  return redirect("/confirm");
};

export const meta: MetaFunction = () => {
  return {
    title: "Login to DisQuss",
  };
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="auth-container">
      <div className="mx-auto w-full max-w-md py-12">
      <h1 className="pb-6 text-2xl font-bold text-slate-700">Jump back in right where you left</h1>
        <Form method="post" className="space-y-6" noValidate>
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
            className="w-full rounded bg-pink-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-300"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                className="text-pink-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
