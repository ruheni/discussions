import type { User } from "@prisma/client";

import { prisma } from "~/db.server";
import workos from "~/lib/workos.server";

export type { User } from "@prisma/client";

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(username: string, email: string) {
  const user = await prisma.user.create({
    data: {
      username,
      email,
    },
  });

  if (!user) return { error: "User with the given email already exists" };

  const session = await workos.passwordless.createSession({
    email: user.email,
    type: "MagicLink",
  });

  if (!session) {
    return { error: "Oops, something went wrong" };
  }

  await workos.passwordless.sendSession(session.id);

  return { success: true };
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function login(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "User does not exist" };
  }

  const session = await workos.passwordless.createSession({
    email: user.email,
    type: "MagicLink",
  });

  if (!session) {
    return { error: "Oops, something went wrong" };
  }

  await workos.passwordless.sendSession(session.id);

  return { success: true };
}
