import type { LoaderArgs } from "@remix-run/server-runtime";
import workos, { workosClientId } from "~/lib/workos.server";
import { getUserByEmail } from "~/services/user.server";
import { createUserSession } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  if (!code) return new Response("Code missing from Request", { status: 400 });

  const { profile } = await workos.sso.getProfileAndToken({
    code,
    clientID:
      typeof workosClientId !== "string"
        ? "Client Id is missing"
        : workosClientId,
  });

  const user = await getUserByEmail(profile.email);

  if (!user)
    return new Response("Something went wrong", {
      status: 400,
    });

  return createUserSession({
    request,
    userId: user?.id,
    remember: true,
    redirectTo: "/",
  });
};
